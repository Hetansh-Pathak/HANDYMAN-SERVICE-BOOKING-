import { useState } from 'react'
import { useRouter } from 'next/router'
import RoleBasedLayout from '../../components/RoleBasedLayout'
import { useUser } from '../../context/UserContext'

export default function ReviewPage() {
  const router = useRouter()
  const { bookingId } = router.query
  const { user, addNotification } = useUser()
  
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [categories, setCategories] = useState({
    punctuality: 0,
    quality: 0,
    professionalism: 0,
    cleanliness: 0,
    communication: 0
  })
  const [wouldRecommend, setWouldRecommend] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Mock booking data
  const booking = {
    id: bookingId,
    providerName: 'Rajesh Kumar',
    providerImage: '👨‍🔧',
    service: 'Plumbing',
    date: '2024-01-26',
    amount: 750,
    description: 'Kitchen sink leak repair'
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Please provide a rating')
      return
    }

    setLoading(true)

    try {
      // Simulate API call to submit review
      await new Promise(resolve => setTimeout(resolve, 1500))

      const reviewData = {
        bookingId,
        providerId: booking.providerId,
        customerId: user.id,
        rating,
        review,
        categories,
        wouldRecommend,
        createdAt: new Date().toISOString()
      }

      console.log('Review submitted:', reviewData)

      // Add notification for provider
      addNotification({
        type: 'review',
        title: 'New Review Received',
        message: `You received a ${rating}-star review from ${user.name}`
      })

      setSubmitted(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/dashboard/user?tab=bookings')
      }, 3000)

    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue)
  }

  const handleCategoryRating = (category, ratingValue) => {
    setCategories(prev => ({
      ...prev,
      [category]: ratingValue
    }))
  }

  const renderStars = (currentRating, onRate, onHover = null, onLeave = null, size = 'large') => {
    const starSize = size === 'large' ? '32px' : '20px'
    
    return (
      <div style={{display: 'flex', gap: '4px'}}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: starSize,
              color: star <= currentRating ? '#ffc107' : '#e9ecef',
              transition: 'color 0.2s ease'
            }}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onLeave && onLeave()}
          >
            ⭐
          </button>
        ))}
      </div>
    )
  }

  if (submitted) {
    return (
      <RoleBasedLayout title="Review Submitted - HandyFix">
        <div style={successContainerStyle}>
          <div style={successCardStyle}>
            <div style={successIconStyle}>✅</div>
            <h1 style={successTitleStyle}>Thank you for your review!</h1>
            <p style={successMessageStyle}>
              Your feedback helps us maintain quality service and helps other customers make informed decisions.
            </p>
            <div style={reviewSummaryStyle}>
              <h3>Your Review Summary:</h3>
              <p><strong>Rating:</strong> {rating}/5 stars</p>
              <p><strong>Provider:</strong> {booking.providerName}</p>
              <p><strong>Service:</strong> {booking.service}</p>
              {wouldRecommend && (
                <p><strong>Would recommend</strong> this provider to others</p>
              )}
            </div>
            <p style={redirectMessageStyle}>Redirecting to your dashboard...</p>
          </div>
        </div>
      </RoleBasedLayout>
    )
  }

  return (
    <RoleBasedLayout title={`Review ${booking.providerName} - HandyFix`}>
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <button onClick={() => router.back()} style={backBtnStyle}>
              ← Back
            </button>
            <h1 style={titleStyle}>Rate Your Experience</h1>
          </div>

          <div style={contentStyle}>
            {/* Booking Summary */}
            <div className="card" style={bookingSummaryStyle}>
              <div style={providerInfoStyle}>
                <div style={providerImageStyle}>{booking.providerImage}</div>
                <div>
                  <h2 style={providerNameStyle}>{booking.providerName}</h2>
                  <p style={serviceInfoStyle}>{booking.service} • {booking.date}</p>
                  <p style={amountInfoStyle}>₹{booking.amount}</p>
                </div>
              </div>
              <div style={serviceDescStyle}>
                <p><strong>Service:</strong> {booking.description}</p>
              </div>
            </div>

            {/* Review Form */}
            <div className="card" style={reviewFormStyle}>
              <form onSubmit={handleSubmitReview}>
                {/* Overall Rating */}
                <div style={ratingSectionStyle}>
                  <h3 style={sectionTitleStyle}>Overall Rating *</h3>
                  <div style={starsContainerStyle}>
                    {renderStars(
                      hoveredRating || rating,
                      handleRatingClick,
                      setHoveredRating,
                      () => setHoveredRating(0)
                    )}
                  </div>
                  <p style={ratingTextStyle}>
                    {rating === 0 ? 'Click to rate' : 
                     rating === 1 ? 'Poor' :
                     rating === 2 ? 'Fair' :
                     rating === 3 ? 'Good' :
                     rating === 4 ? 'Very Good' :
                     'Excellent'}
                  </p>
                </div>

                {/* Category Ratings */}
                <div style={categorySectionStyle}>
                  <h3 style={sectionTitleStyle}>Rate Different Aspects</h3>
                  <div style={categoriesGridStyle}>
                    {Object.entries({
                      punctuality: 'Punctuality',
                      quality: 'Work Quality',
                      professionalism: 'Professionalism',
                      cleanliness: 'Cleanliness',
                      communication: 'Communication'
                    }).map(([key, label]) => (
                      <div key={key} style={categoryItemStyle}>
                        <label style={categoryLabelStyle}>{label}</label>
                        {renderStars(
                          categories[key],
                          (rating) => handleCategoryRating(key, rating),
                          null,
                          null,
                          'small'
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Written Review */}
                <div style={reviewTextSectionStyle}>
                  <h3 style={sectionTitleStyle}>Write a Review</h3>
                  <textarea
                    style={reviewTextareaStyle}
                    placeholder="Share your experience with this service provider. What did you like? What could be improved?"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="6"
                  />
                  <p style={characterCountStyle}>
                    {review.length}/500 characters
                  </p>
                </div>

                {/* Recommendation */}
                <div style={recommendationSectionStyle}>
                  <h3 style={sectionTitleStyle}>Would you recommend this provider?</h3>
                  <div style={recommendationOptionsStyle}>
                    <label style={radioLabelStyle}>
                      <input
                        type="radio"
                        name="recommend"
                        checked={wouldRecommend === true}
                        onChange={() => setWouldRecommend(true)}
                      />
                      👍 Yes, I would recommend
                    </label>
                    <label style={radioLabelStyle}>
                      <input
                        type="radio"
                        name="recommend"
                        checked={wouldRecommend === false}
                        onChange={() => setWouldRecommend(false)}
                      />
                      👎 No, I would not recommend
                    </label>
                  </div>
                </div>

                {/* Tips for Good Reviews */}
                <div style={tipsStyle}>
                  <h4>Tips for writing a helpful review:</h4>
                  <ul style={tipsListStyle}>
                    <li>Be specific about what the provider did well or could improve</li>
                    <li>Mention timeliness, quality of work, and professionalism</li>
                    <li>Help other customers make informed decisions</li>
                    <li>Be fair and honest in your assessment</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={submitBtnStyle}
                  disabled={loading || rating === 0}
                >
                  {loading ? 'Submitting Review...' : 'Submit Review'}
                </button>

                <p style={disclaimerStyle}>
                  Your review will be visible to other customers and will help maintain service quality.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}

// Styles
const containerStyle = {
  padding: '40px 0',
  background: '#f8f9fa',
  minHeight: '80vh'
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '32px'
}

const backBtnStyle = {
  background: 'none',
  border: '1px solid #ddd',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#2c3e50',
  margin: 0
}

const contentStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}

const bookingSummaryStyle = {
  padding: '24px'
}

const providerInfoStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '16px'
}

const providerImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const providerNameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const serviceInfoStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const amountInfoStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#28a745'
}

const serviceDescStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const reviewFormStyle = {
  padding: '32px'
}

const ratingSectionStyle = {
  textAlign: 'center',
  marginBottom: '32px'
}

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '16px',
  color: '#2c3e50'
}

const starsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '12px'
}

const ratingTextStyle = {
  fontSize: '16px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const categorySectionStyle = {
  marginBottom: '32px'
}

const categoriesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px'
}

const categoryItemStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  textAlign: 'center'
}

const categoryLabelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '8px',
  color: '#555'
}

const reviewTextSectionStyle = {
  marginBottom: '32px'
}

const reviewTextareaStyle = {
  width: '100%',
  padding: '16px',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '16px',
  lineHeight: '1.5',
  resize: 'vertical',
  minHeight: '120px'
}

const characterCountStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  textAlign: 'right',
  marginTop: '4px'
}

const recommendationSectionStyle = {
  marginBottom: '32px'
}

const recommendationOptionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  padding: '12px 16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
}

const tipsStyle = {
  background: '#e8f4fd',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '32px',
  border: '1px solid #bee5eb'
}

const tipsListStyle = {
  margin: '8px 0 0 20px',
  color: '#0c5460'
}

const submitBtnStyle = {
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '16px'
}

const disclaimerStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  textAlign: 'center',
  lineHeight: '1.5'
}

const successContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '40px 0'
}

const successCardStyle = {
  background: 'white',
  padding: '60px',
  borderRadius: '16px',
  textAlign: 'center',
  maxWidth: '600px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
}

const successIconStyle = {
  fontSize: '64px',
  marginBottom: '24px'
}

const successTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#28a745',
  marginBottom: '16px'
}

const successMessageStyle = {
  fontSize: '18px',
  color: '#555',
  marginBottom: '32px',
  lineHeight: '1.6'
}

const reviewSummaryStyle = {
  textAlign: 'left',
  background: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '24px'
}

const redirectMessageStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontStyle: 'italic'
}
