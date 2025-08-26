import { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'customer'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Contact form submitted:', formData)
    alert('Thank you for your message! We will get back to you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      userType: 'customer'
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Simply browse our services, select a provider, and click "Book Now". Fill in your details and preferred time, and the provider will confirm your booking.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Cash on Delivery (COD) for all services. Online payment options including UPI, credit/debit cards are coming soon.'
    },
    {
      question: 'How are service providers verified?',
      answer: 'All providers go through a verification process including ID proof, experience certificates, and background checks before being approved on our platform.'
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'You can rate and review the service provider. If you\'re not satisfied, contact our support team within 24 hours for resolution.'
    },
    {
      question: 'How do I become a service provider?',
      answer: 'Click on "Become a Provider" and fill out the registration form with your details, experience, and documents. Our team will review and approve your application.'
    },
    {
      question: 'Are there any booking charges?',
      answer: 'There are no booking charges for customers. Service providers pay a small commission only after successful completion of services.'
    }
  ]

  return (
    <Layout title="Contact Us - HandyFix">
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <h1 style={heroTitleStyle}>Get in Touch</h1>
          <p style={heroSubtitleStyle}>
            We're here to help! Reach out to us for any questions or support.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section style={contactSectionStyle}>
        <div className="container">
          <div style={contactGridStyle}>
            <div style={contactInfoStyle}>
              <h2 style={sectionTitleStyle}>Contact Information</h2>
              
              <div style={contactItemStyle}>
                <div style={contactIconStyle}>📍</div>
                <div>
                  <h3 style={contactHeadingStyle}>Address</h3>
                  <p style={contactTextStyle}>
                    HandyFix Headquarters<br/>
                    123 Business Park, Andheri East<br/>
                    Mumbai, Maharashtra 400069
                  </p>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}>📞</div>
                <div>
                  <h3 style={contactHeadingStyle}>Phone</h3>
                  <p style={contactTextStyle}>
                    Customer Support: <a href="tel:+911234567890" style={linkStyle}>+91 12345 67890</a><br/>
                    Provider Support: <a href="tel:+911234567891" style={linkStyle}>+91 12345 67891</a>
                  </p>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}>✉️</div>
                <div>
                  <h3 style={contactHeadingStyle}>Email</h3>
                  <p style={contactTextStyle}>
                    General: <a href="mailto:support@handyfix.com" style={linkStyle}>support@handyfix.com</a><br/>
                    Business: <a href="mailto:business@handyfix.com" style={linkStyle}>business@handyfix.com</a>
                  </p>
                </div>
              </div>

              <div style={contactItemStyle}>
                <div style={contactIconStyle}>🕒</div>
                <div>
                  <h3 style={contactHeadingStyle}>Business Hours</h3>
                  <p style={contactTextStyle}>
                    Monday - Friday: 9:00 AM - 7:00 PM<br/>
                    Saturday: 9:00 AM - 5:00 PM<br/>
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>

              <div style={socialLinksStyle}>
                <h3 style={contactHeadingStyle}>Follow Us</h3>
                <div style={socialIconsStyle}>
                  <a href="#" style={socialIconStyle}>📘 Facebook</a>
                  <a href="#" style={socialIconStyle}>📷 Instagram</a>
                  <a href="#" style={socialIconStyle}>🐦 Twitter</a>
                  <a href="#" style={socialIconStyle}>💼 LinkedIn</a>
                </div>
              </div>
            </div>

            <div className="card" style={contactFormStyle}>
              <h2 style={formTitleStyle}>Send us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">I am a</label>
                  <div style={userTypeStyle}>
                    <label style={radioLabelStyle}>
                      <input
                        type="radio"
                        name="userType"
                        value="customer"
                        checked={formData.userType === 'customer'}
                        onChange={handleChange}
                      />
                      Customer
                    </label>
                    <label style={radioLabelStyle}>
                      <input
                        type="radio"
                        name="userType"
                        value="provider"
                        checked={formData.userType === 'provider'}
                        onChange={handleChange}
                      />
                      Service Provider
                    </label>
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+91 12345 67890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="provider">Provider Related</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={submitBtnStyle}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={faqSectionStyle}>
        <div className="container">
          <h2 style={faqTitleStyle}>Frequently Asked Questions</h2>
          <p style={faqSubtitleStyle}>
            Find quick answers to common questions
          </p>

          <div style={faqGridStyle}>
            {faqs.map((faq, index) => (
              <div key={index} className="card" style={faqItemStyle}>
                <h3 style={faqQuestionStyle}>{faq.question}</h3>
                <p style={faqAnswerStyle}>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div style={faqFooterStyle}>
            <p>Can't find what you're looking for?</p>
            <a href="#contact-form" style={faqLinkStyle}>Contact our support team</a>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section style={emergencyStyle}>
        <div className="container">
          <div className="card" style={emergencyCardStyle}>
            <h2 style={emergencyTitleStyle}>Need Immediate Help?</h2>
            <p style={emergencyTextStyle}>
              For urgent support or emergency services, reach out to us directly
            </p>
            <div style={emergencyButtonsStyle}>
              <a href="tel:+911234567890" className="btn btn-primary" style={emergencyBtnStyle}>
                📞 Call Support
              </a>
              <a href="https://wa.me/911234567890" className="btn btn-outline" style={emergencyBtnStyle}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// Styles
const heroStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '80px 0',
  textAlign: 'center'
}

const heroTitleStyle = {
  fontSize: '48px',
  fontWeight: '700',
  marginBottom: '16px'
}

const heroSubtitleStyle = {
  fontSize: '20px',
  opacity: '0.9',
  maxWidth: '600px',
  margin: '0 auto'
}

const contactSectionStyle = {
  padding: '80px 0',
  background: '#f8f9fa'
}

const contactGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'start'
}

const contactInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px'
}

const sectionTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '32px',
  color: '#2c3e50'
}

const contactItemStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start'
}

const contactIconStyle = {
  fontSize: '32px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e3f2fd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}

const contactHeadingStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const contactTextStyle = {
  color: '#555',
  lineHeight: '1.6'
}

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none'
}

const socialLinksStyle = {
  marginTop: '20px'
}

const socialIconsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginTop: '12px'
}

const socialIconStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500'
}

const contactFormStyle = {
  padding: '40px',
  height: 'fit-content'
}

const formTitleStyle = {
  fontSize: '28px',
  fontWeight: '600',
  marginBottom: '32px',
  color: '#2c3e50'
}

const userTypeStyle = {
  display: 'flex',
  gap: '24px',
  padding: '12px 0'
}

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500'
}

const submitBtnStyle = {
  width: '100%',
  padding: '16px',
  fontSize: '18px',
  fontWeight: '600'
}

const faqSectionStyle = {
  padding: '80px 0',
  background: 'white'
}

const faqTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '16px',
  color: '#2c3e50'
}

const faqSubtitleStyle = {
  fontSize: '18px',
  textAlign: 'center',
  color: '#7f8c8d',
  marginBottom: '60px'
}

const faqGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '24px',
  marginBottom: '60px'
}

const faqItemStyle = {
  padding: '32px'
}

const faqQuestionStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '16px',
  color: '#2c3e50'
}

const faqAnswerStyle = {
  color: '#555',
  lineHeight: '1.6'
}

const faqFooterStyle = {
  textAlign: 'center',
  padding: '40px',
  background: '#f8f9fa',
  borderRadius: '12px'
}

const faqLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600'
}

const emergencyStyle = {
  padding: '80px 0',
  background: '#2c3e50'
}

const emergencyCardStyle = {
  background: 'white',
  padding: '60px',
  textAlign: 'center',
  borderRadius: '16px'
}

const emergencyTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '16px',
  color: '#2c3e50'
}

const emergencyTextStyle = {
  fontSize: '18px',
  color: '#7f8c8d',
  marginBottom: '32px'
}

const emergencyButtonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap'
}

const emergencyBtnStyle = {
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: '600'
}
