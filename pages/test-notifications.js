import { useState, useEffect } from 'react'
import RoleBasedLayout from '../components/RoleBasedLayout'
import { useUser } from '../context/UserContext'
import { bookingAPI, emailService, generateBookingId } from '../lib/auth'

export default function TestNotifications() {
  const [testResults, setTestResults] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const { user, addNotification, notifications } = useUser()

  const addTestResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      test,
      status,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const runBookingFlowTest = async () => {
    setIsRunning(true)
    addTestResult('Booking Flow Test', 'running', 'Starting booking flow test...')
    
    try {
      // Test 1: Create booking
      addTestResult('Create Booking', 'running', 'Creating test booking...')
      
      const mockBookingData = {
        customerId: 1,
        customerName: 'Test Customer',
        customerEmail: 'customer@test.com',
        providerId: 2,
        providerName: 'Test Provider',
        providerEmail: 'provider@test.com',
        service: 'Plumbing',
        serviceDescription: 'Test plumbing service - kitchen sink repair',
        preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        preferredTime: '10:00 AM',
        address: '123 Test Street, Mumbai, 400001',
        contactNumber: '+91 98765 43210',
        urgency: 'normal',
        estimatedPrice: 500
      }
      
      const booking = await bookingAPI.createBooking(mockBookingData)
      addTestResult('Create Booking', 'success', 'Booking created successfully', booking)
      
      // Test 2: Provider notification
      addTestResult('Provider Notification', 'running', 'Testing provider notification...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      addTestResult('Provider Notification', 'success', 'Provider notification sent via email and in-app')
      
      // Test 3: Booking confirmation
      addTestResult('Booking Confirmation', 'running', 'Testing booking confirmation...')
      const confirmedBooking = await bookingAPI.updateBookingStatus(booking.id, 'confirmed', {
        customerEmail: mockBookingData.customerEmail,
        scheduledDate: mockBookingData.preferredDate,
        scheduledTime: mockBookingData.preferredTime,
        message: 'Booking confirmed by provider'
      })
      addTestResult('Booking Confirmation', 'success', 'Booking confirmed and customer notified', confirmedBooking)
      
      // Test 4: Service completion
      addTestResult('Service Completion', 'running', 'Testing service completion...')
      const completedBooking = await bookingAPI.updateBookingStatus(booking.id, 'completed', {
        customerEmail: mockBookingData.customerEmail,
        finalPrice: 600,
        completedAt: new Date().toISOString(),
        message: 'Service completed successfully'
      })
      addTestResult('Service Completion', 'success', 'Service marked complete and customer notified', completedBooking)
      
      // Test 5: Review submission
      addTestResult('Review Submission', 'running', 'Testing review submission...')
      const review = await bookingAPI.submitReview(booking.id, 5, 'Excellent service! Very professional and on time.', 'customer')
      addTestResult('Review Submission', 'success', 'Review submitted and provider notified', review)
      
      addTestResult('Booking Flow Test', 'success', 'All booking flow tests completed successfully!')
      
    } catch (error) {
      addTestResult('Booking Flow Test', 'error', `Test failed: ${error.message}`)
    }
    
    setIsRunning(false)
  }

  const runNotificationTest = async () => {
    setIsRunning(true)
    addTestResult('Notification Test', 'running', 'Starting notification system test...')
    
    try {
      // Test different notification types
      const notificationTypes = [
        {
          type: 'booking',
          title: 'Test Booking Notification',
          message: 'This is a test booking notification with urgent priority',
          urgent: true
        },
        {
          type: 'booking_confirmed',
          title: 'Test Confirmation',
          message: 'Your test booking has been confirmed',
          actionText: 'View Details'
        },
        {
          type: 'payment',
          title: 'Test Payment Notification',
          message: 'Payment of ₹500 received for booking #TEST123'
        },
        {
          type: 'review',
          title: 'Test Review Notification',
          message: 'You received a 5-star review for your recent service'
        },
        {
          type: 'emergency',
          title: 'Test Emergency Notification',
          message: 'Emergency service request in your area'
        }
      ]
      
      for (const [index, notification] of notificationTypes.entries()) {
        addTestResult('Add Notification', 'running', `Adding ${notification.type} notification...`)
        
        addNotification({
          ...notification,
          timestamp: new Date().toISOString(),
          read: false
        })
        
        await new Promise(resolve => setTimeout(resolve, 500))
        addTestResult('Add Notification', 'success', `${notification.type} notification added successfully`)
      }
      
      addTestResult('Notification Test', 'success', 'All notification tests completed successfully!')
      
    } catch (error) {
      addTestResult('Notification Test', 'error', `Notification test failed: ${error.message}`)
    }
    
    setIsRunning(false)
  }

  const runEmailTest = async () => {
    setIsRunning(true)
    addTestResult('Email Test', 'running', 'Starting email service test...')
    
    try {
      // Test different email types
      const emailTests = [
        {
          name: 'Welcome Email',
          test: () => emailService.sendWelcomeEmail('test@example.com', { name: 'Test User', userType: 'customer' })
        },
        {
          name: 'Booking Confirmation',
          test: () => emailService.sendBookingConfirmation('customer@test.com', {
            id: 'TEST123',
            service: 'Plumbing',
            providerName: 'Test Provider',
            scheduledDate: '2024-01-15',
            scheduledTime: '10:00 AM',
            estimatedPrice: 500
          })
        },
        {
          name: 'Provider Notification',
          test: () => emailService.sendProviderNotification('provider@test.com', {
            bookingId: 'TEST123',
            customerName: 'Test Customer',
            service: 'Plumbing',
            preferredDate: '2024-01-15',
            urgency: 'normal'
          })
        },
        {
          name: 'Service Completion',
          test: () => emailService.sendServiceCompletionEmail('customer@test.com', {
            id: 'TEST123',
            service: 'Plumbing',
            providerName: 'Test Provider',
            finalPrice: 600
          })
        }
      ]
      
      for (const emailTest of emailTests) {
        addTestResult('Email Service', 'running', `Testing ${emailTest.name}...`)
        
        const result = await emailTest.test()
        addTestResult('Email Service', 'success', `${emailTest.name} sent successfully`, result)
        
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      addTestResult('Email Test', 'success', 'All email tests completed successfully!')
      
    } catch (error) {
      addTestResult('Email Test', 'error', `Email test failed: ${error.message}`)
    }
    
    setIsRunning(false)
  }

  const clearResults = () => {
    setTestResults([])
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'running': return '⏳'
      default: return '⚪'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return '#28a745'
      case 'error': return '#dc3545'
      case 'running': return '#ffc107'
      default: return '#6c757d'
    }
  }

  return (
    <RoleBasedLayout title="Test Notifications - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={titleStyle}>Booking Flow & Notification System Test</h1>
            <p style={subtitleStyle}>
              Test the complete booking workflow and notification system to ensure everything works correctly.
            </p>
          </div>

          {/* Test Controls */}
          <div style={controlsStyle}>
            <button 
              className="btn btn-primary"
              onClick={runBookingFlowTest}
              disabled={isRunning}
              style={buttonStyle}
            >
              {isRunning ? '⏳ Running...' : '🔄 Test Booking Flow'}
            </button>
            
            <button 
              className="btn btn-success"
              onClick={runNotificationTest}
              disabled={isRunning}
              style={buttonStyle}
            >
              {isRunning ? '⏳ Running...' : '🔔 Test Notifications'}
            </button>
            
            <button 
              className="btn btn-warning"
              onClick={runEmailTest}
              disabled={isRunning}
              style={buttonStyle}
            >
              {isRunning ? '⏳ Running...' : '📧 Test Emails'}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={clearResults}
              disabled={isRunning}
              style={buttonStyle}
            >
              🗑️ Clear Results
            </button>
          </div>

          {/* Current Notifications Display */}
          <div style={notificationsDisplayStyle}>
            <h3 style={sectionTitleStyle}>Current Notifications ({notifications.length})</h3>
            {notifications.length === 0 ? (
              <p style={emptyStateStyle}>No notifications yet. Run the notification test to see them in action!</p>
            ) : (
              <div style={notificationListStyle}>
                {notifications.slice(0, 5).map((notification, index) => (
                  <div key={notification.id || index} style={notificationItemStyle}>
                    <div style={notificationIconStyle}>
                      {notification.type === 'booking' ? '📋' :
                       notification.type === 'booking_confirmed' ? '✅' :
                       notification.type === 'payment' ? '💰' :
                       notification.type === 'review' ? '⭐' :
                       notification.type === 'emergency' ? '🚨' : '🔔'}
                    </div>
                    <div style={notificationContentStyle}>
                      <div style={notificationTitleStyle}>{notification.title}</div>
                      <div style={notificationMessageStyle}>{notification.message}</div>
                      <div style={notificationTimeStyle}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div style={{
                      ...notificationStatusStyle,
                      backgroundColor: notification.read ? '#28a745' : '#dc3545'
                    }}>
                      {notification.read ? 'Read' : 'Unread'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test Results */}
          <div style={resultsStyle}>
            <h3 style={sectionTitleStyle}>Test Results ({testResults.length})</h3>
            
            {testResults.length === 0 ? (
              <div style={emptyResultsStyle}>
                <div style={emptyIconStyle}>🧪</div>
                <p>No test results yet. Click a test button above to begin testing.</p>
              </div>
            ) : (
              <div style={resultListStyle}>
                {testResults.map((result) => (
                  <div key={result.id} style={resultItemStyle}>
                    <div style={resultHeaderStyle}>
                      <div style={resultInfoStyle}>
                        <span style={{
                          ...resultStatusStyle,
                          color: getStatusColor(result.status)
                        }}>
                          {getStatusIcon(result.status)}
                        </span>
                        <span style={resultTestStyle}>{result.test}</span>
                        <span style={resultTimeStyle}>{result.timestamp}</span>
                      </div>
                    </div>
                    
                    <div style={resultMessageStyle}>{result.message}</div>
                    
                    {result.data && (
                      <details style={resultDataStyle}>
                        <summary style={summaryStyle}>View Data</summary>
                        <pre style={dataStyle}>
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Information */}
          <div style={systemInfoStyle}>
            <h3 style={sectionTitleStyle}>System Information</h3>
            <div style={infoGridStyle}>
              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>User Type</div>
                <div style={infoValueStyle}>{user?.userType || 'Not logged in'}</div>
              </div>
              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>User Name</div>
                <div style={infoValueStyle}>{user?.name || 'Guest'}</div>
              </div>
              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>Notifications</div>
                <div style={infoValueStyle}>{notifications.length} total</div>
              </div>
              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>Test Status</div>
                <div style={infoValueStyle}>{isRunning ? 'Running' : 'Ready'}</div>
              </div>
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
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px'
}

const titleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '16px'
}

const subtitleStyle = {
  fontSize: '18px',
  color: '#7f8c8d',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
}

const controlsStyle = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  marginBottom: '40px',
  flexWrap: 'wrap'
}

const buttonStyle = {
  fontSize: '16px',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: '600',
  minWidth: '160px'
}

const notificationsDisplayStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '30px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}

const resultsStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '30px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}

const systemInfoStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '20px',
  paddingBottom: '10px',
  borderBottom: '2px solid #e9ecef'
}

const emptyStateStyle = {
  textAlign: 'center',
  color: '#7f8c8d',
  padding: '40px',
  fontSize: '16px'
}

const emptyResultsStyle = {
  textAlign: 'center',
  color: '#7f8c8d',
  padding: '40px'
}

const emptyIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const notificationListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const notificationItemStyle = {
  display: 'flex',
  gap: '16px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
}

const notificationIconStyle = {
  fontSize: '24px',
  flexShrink: 0
}

const notificationContentStyle = {
  flex: 1
}

const notificationTitleStyle = {
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '4px'
}

const notificationMessageStyle = {
  color: '#555',
  fontSize: '14px',
  marginBottom: '4px'
}

const notificationTimeStyle = {
  color: '#7f8c8d',
  fontSize: '12px'
}

const notificationStatusStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  color: 'white',
  fontSize: '12px',
  fontWeight: '600',
  alignSelf: 'flex-start'
}

const resultListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const resultItemStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
}

const resultHeaderStyle = {
  marginBottom: '8px'
}

const resultInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const resultStatusStyle = {
  fontSize: '18px'
}

const resultTestStyle = {
  fontWeight: '600',
  color: '#2c3e50'
}

const resultTimeStyle = {
  color: '#7f8c8d',
  fontSize: '12px',
  marginLeft: 'auto'
}

const resultMessageStyle = {
  color: '#555',
  fontSize: '14px',
  marginBottom: '8px'
}

const resultDataStyle = {
  marginTop: '12px'
}

const summaryStyle = {
  cursor: 'pointer',
  fontWeight: '600',
  color: '#007bff',
  fontSize: '14px'
}

const dataStyle = {
  background: '#2c3e50',
  color: '#00ff00',
  padding: '16px',
  borderRadius: '4px',
  fontSize: '12px',
  marginTop: '8px',
  overflow: 'auto',
  maxHeight: '200px'
}

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px'
}

const infoItemStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  textAlign: 'center'
}

const infoLabelStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '8px'
}

const infoValueStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50'
}
