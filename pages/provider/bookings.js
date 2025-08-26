import { useState, useEffect } from 'react'
import ProviderLayout from '../../components/layouts/ProviderLayout'
import { useUser } from '../../context/UserContext'
import { bookingAPI, emailService, formatConfirmationNotification } from '../../lib/auth'

export default function ProviderBookings() {
  const { user, addNotification } = useUser()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Mock bookings data - replace with actual API call
  useEffect(() => {
    const loadBookings = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockBookings = [
        {
          id: 'BK001',
          customerId: 1,
          customerName: 'Priya Sharma',
          customerEmail: 'priya.customer@gmail.com',
          customerPhone: '+91 98765 43210',
          service: 'Plumbing',
          serviceDescription: 'Kitchen sink is leaking badly, need urgent repair',
          address: 'Flat 302, Sunflower Apartments, Andheri West, Mumbai - 400058',
          preferredDate: '2024-01-28',
          preferredTime: '2:00 PM',
          urgency: 'urgent',
          paymentMethod: 'cod',
          status: 'pending',
          estimatedPrice: 500,
          createdAt: '2024-01-25T10:30:00Z',
          additionalNotes: 'Please bring necessary tools. Building has parking facility.'
        },
        {
          id: 'BK002',
          customerId: 2,
          customerName: 'Amit Patel',
          customerEmail: 'amit.customer@gmail.com',
          customerPhone: '+91 98765 43211',
          service: 'Plumbing',
          serviceDescription: 'Bathroom tap installation - new tap already purchased',
          address: 'House No. 45, Sector 12, Navi Mumbai - 400703',
          preferredDate: '2024-01-29',
          preferredTime: '10:00 AM',
          urgency: 'normal',
          paymentMethod: 'cod',
          status: 'confirmed',
          estimatedPrice: 300,
          createdAt: '2024-01-24T14:15:00Z',
          confirmedAt: '2024-01-24T16:20:00Z',
          additionalNotes: 'Customer will be available between 10 AM to 12 PM'
        },
        {
          id: 'BK003',
          customerId: 3,
          customerName: 'Sunita Singh',
          customerEmail: 'sunita.customer@gmail.com',
          customerPhone: '+91 98765 43212',
          service: 'Plumbing',
          serviceDescription: 'Water heater not working, may need replacement',
          address: '201, Crystal Heights, Juhu, Mumbai - 400049',
          preferredDate: '2024-01-26',
          preferredTime: '3:00 PM',
          urgency: 'normal',
          paymentMethod: 'cod',
          status: 'completed',
          estimatedPrice: 800,
          finalPrice: 1200,
          createdAt: '2024-01-22T09:00:00Z',
          confirmedAt: '2024-01-22T11:30:00Z',
          completedAt: '2024-01-26T17:45:00Z',
          rating: 5,
          review: 'Excellent work! Very professional and quick.'
        }
      ]
      
      setBookings(mockBookings)
      setLoading(false)
    }
    
    loadBookings()
  }, [])

  const handleBookingAction = async (bookingId, action, message = '') => {
    setActionLoading(true)
    
    try {
      const booking = bookings.find(b => b.id === bookingId)
      if (!booking) return

      let newStatus = action
      let emailSubject = ''
      let emailMessage = ''
      let customerNotification = ''

      if (action === 'confirmed') {
        emailSubject = 'Booking Confirmed - HandyFix'
        emailMessage = `Good news! ${user.name} has confirmed your booking request.`
        customerNotification = `Your ${booking.service} service with ${user.name} has been confirmed for ${booking.preferredDate} at ${booking.preferredTime}`
      } else if (action === 'rejected') {
        emailSubject = 'Booking Update - HandyFix'
        emailMessage = `We're sorry, but ${user.name} cannot take your booking at this time. ${message}`
        customerNotification = `Your booking request was declined. ${message}`
      } else if (action === 'completed') {
        newStatus = 'completed'
        emailSubject = 'Service Completed - HandyFix'
        emailMessage = `Your ${booking.service} service has been completed. Please rate your experience.`
        customerNotification = `Your ${booking.service} service has been completed. Please provide feedback.`
      }

      // Update booking status
      await bookingAPI.updateBookingStatus(bookingId, newStatus, message)
      
      // Send email to customer
      await emailService.sendBookingConfirmation(booking.customerEmail, {
        bookingId,
        providerName: user.name,
        providerPhone: user.phone,
        service: booking.service,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: newStatus,
        message: emailMessage,
        customerName: booking.customerName
      })

      // Add in-app notification for customer (this would be sent via websocket in real app)
      console.log('Customer notification sent:', {
        customerId: booking.customerId,
        notification: formatConfirmationNotification({
          ...booking,
          status: newStatus,
          confirmedDate: booking.preferredDate
        })
      })

      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId 
          ? { 
              ...b, 
              status: newStatus, 
              [action + 'At']: new Date().toISOString(),
              statusMessage: message 
            }
          : b
      ))

      // Add notification for provider
      addNotification({
        type: 'booking_action',
        title: `Booking ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        message: `Booking ${bookingId} has been ${action}. Customer has been notified.`
      })

      setSelectedBooking(null)

    } catch (error) {
      console.error('Error handling booking action:', error)
      alert('Failed to update booking. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    }
    
    switch(status) {
      case 'pending':
        return { ...baseStyle, background: '#fff3cd', color: '#856404' }
      case 'confirmed':
        return { ...baseStyle, background: '#d1ecf1', color: '#0c5460' }
      case 'completed':
        return { ...baseStyle, background: '#d4edda', color: '#155724' }
      case 'rejected':
        return { ...baseStyle, background: '#f8d7da', color: '#721c24' }
      default:
        return baseStyle
    }
  }

  const getUrgencyStyle = (urgency) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600'
    }
    
    switch(urgency) {
      case 'emergency':
        return { ...baseStyle, background: '#dc3545', color: 'white' }
      case 'urgent':
        return { ...baseStyle, background: '#ffc107', color: '#333' }
      case 'normal':
        return { ...baseStyle, background: '#28a745', color: 'white' }
      default:
        return baseStyle
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <ProviderLayout title="Manage Bookings - HandyFix">
        <div style={loadingStyle}>Loading your bookings...</div>
      </ProviderLayout>
    )
  }

  return (
    <ProviderLayout title="Manage Bookings - HandyFix">
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Booking Requests</h1>
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>{bookings.filter(b => b.status === 'pending').length}</span>
              <span style={statLabelStyle}>Pending</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>{bookings.filter(b => b.status === 'confirmed').length}</span>
              <span style={statLabelStyle}>Confirmed</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>{bookings.filter(b => b.status === 'completed').length}</span>
              <span style={statLabelStyle}>Completed</span>
            </div>
          </div>
        </div>

        <div style={bookingsListStyle}>
          {bookings.map(booking => (
            <div key={booking.id} className="card" style={bookingCardStyle}>
              <div style={cardHeaderStyle}>
                <div style={bookingInfoStyle}>
                  <h3 style={customerNameStyle}>{booking.customerName}</h3>
                  <p style={serviceDescStyle}>{booking.serviceDescription}</p>
                  <p style={bookingIdStyle}>ID: {booking.id}</p>
                </div>
                <div style={statusColumnStyle}>
                  <span style={getStatusStyle(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <span style={getUrgencyStyle(booking.urgency)}>
                    {booking.urgency.toUpperCase()}
                  </span>
                </div>
              </div>

              <div style={bookingDetailsStyle}>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📅 Preferred Date & Time:</span>
                  <span>{formatDate(booking.preferredDate)} at {booking.preferredTime}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📍 Location:</span>
                  <span>{booking.address}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📞 Contact:</span>
                  <a href={`tel:${booking.customerPhone}`} style={phoneStyle}>
                    {booking.customerPhone}
                  </a>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>💰 Estimated Price:</span>
                  <span style={priceStyle}>₹{booking.estimatedPrice}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>⏰ Requested:</span>
                  <span>{formatTime(booking.createdAt)}</span>
                </div>
                {booking.additionalNotes && (
                  <div style={notesStyle}>
                    <span style={labelStyle}>📝 Notes:</span>
                    <span>{booking.additionalNotes}</span>
                  </div>
                )}
                {booking.rating && (
                  <div style={reviewStyle}>
                    <span style={labelStyle}>⭐ Review:</span>
                    <span>{booking.rating}/5 - "{booking.review}"</span>
                  </div>
                )}
              </div>

              <div style={actionsStyle}>
                {booking.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-primary"
                      style={actionBtnStyle}
                      onClick={() => handleBookingAction(booking.id, 'confirmed')}
                      disabled={actionLoading}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={actionBtnStyle}
                      onClick={() => setSelectedBooking(booking)}
                      disabled={actionLoading}
                    >
                      ❌ Decline
                    </button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <>
                    <button
                      className="btn btn-primary"
                      style={actionBtnStyle}
                      onClick={() => handleBookingAction(booking.id, 'completed')}
                      disabled={actionLoading}
                    >
                      ✅ Mark Complete
                    </button>
                    <a
                      href={`tel:${booking.customerPhone}`}
                      className="btn btn-outline"
                      style={actionBtnStyle}
                    >
                      📞 Call Customer
                    </a>
                  </>
                )}
                <button
                  className="btn btn-outline"
                  style={actionBtnStyle}
                  onClick={() => setSelectedBooking(booking)}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>📋</div>
            <h3>No booking requests yet</h3>
            <p>Your booking requests will appear here when customers book your services.</p>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div style={modalOverlayStyle} onClick={() => setSelectedBooking(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <h2>Booking Details - {selectedBooking.id}</h2>
                <button
                  style={closeButtonStyle}
                  onClick={() => setSelectedBooking(null)}
                >
                  ✕
                </button>
              </div>

              <div style={modalBodyStyle}>
                <div style={customerInfoStyle}>
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Phone:</strong> {selectedBooking.customerPhone}</p>
                  <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                </div>

                <div style={serviceInfoStyle}>
                  <h3>Service Details</h3>
                  <p><strong>Service:</strong> {selectedBooking.service}</p>
                  <p><strong>Description:</strong> {selectedBooking.serviceDescription}</p>
                  <p><strong>Address:</strong> {selectedBooking.address}</p>
                  <p><strong>Preferred Date:</strong> {formatDate(selectedBooking.preferredDate)}</p>
                  <p><strong>Preferred Time:</strong> {selectedBooking.preferredTime}</p>
                  <p><strong>Urgency:</strong> {selectedBooking.urgency}</p>
                  <p><strong>Payment Method:</strong> {selectedBooking.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                  {selectedBooking.additionalNotes && (
                    <p><strong>Additional Notes:</strong> {selectedBooking.additionalNotes}</p>
                  )}
                </div>

                {selectedBooking.status === 'pending' && (
                  <div style={declineFormStyle}>
                    <h3>Decline Booking</h3>
                    <textarea
                      placeholder="Please provide a reason for declining (optional)"
                      style={declineTextareaStyle}
                      id="decline-reason"
                    />
                    <div style={declineActionsStyle}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          const reason = document.getElementById('decline-reason').value
                          handleBookingAction(selectedBooking.id, 'rejected', reason)
                        }}
                        disabled={actionLoading}
                      >
                        Confirm Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProviderLayout>
  )
}

// Styles
const containerStyle = {
  padding: '40px',
  background: '#f8f9fa',
  minHeight: '80vh'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#2c3e50',
  margin: 0
}

const statsStyle = {
  display: 'flex',
  gap: '24px'
}

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 24px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const statNumberStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#28a745'
}

const statLabelStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const bookingsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

const bookingCardStyle = {
  marginBottom: '0',
  border: '1px solid #dee2e6'
}

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px'
}

const bookingInfoStyle = {
  flex: '1'
}

const customerNameStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const serviceDescStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const bookingIdStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const statusColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-end'
}

const bookingDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px'
}

const detailRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const labelStyle = {
  fontWeight: '500',
  color: '#555',
  minWidth: '200px'
}

const phoneStyle = {
  color: '#007bff',
  textDecoration: 'none'
}

const priceStyle = {
  fontWeight: '600',
  color: '#28a745'
}

const notesStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start'
}

const reviewStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  background: '#f8f9fa',
  padding: '12px',
  borderRadius: '6px'
}

const actionsStyle = {
  display: 'flex',
  gap: '12px',
  paddingTop: '16px',
  borderTop: '1px solid #eee',
  flexWrap: 'wrap'
}

const actionBtnStyle = {
  padding: '8px 16px',
  fontSize: '14px'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#7f8c8d'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
  fontSize: '18px',
  color: '#7f8c8d'
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
}

const modalContentStyle = {
  background: 'white',
  borderRadius: '12px',
  maxWidth: '600px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto'
}

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  borderBottom: '1px solid #eee',
  marginBottom: '24px'
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#7f8c8d'
}

const modalBodyStyle = {
  padding: '0 24px 24px'
}

const customerInfoStyle = {
  marginBottom: '24px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const serviceInfoStyle = {
  marginBottom: '24px'
}

const declineFormStyle = {
  border: '1px solid #dc3545',
  borderRadius: '8px',
  padding: '16px'
}

const declineTextareaStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  minHeight: '80px',
  marginBottom: '12px',
  resize: 'vertical'
}

const declineActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}
