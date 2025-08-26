import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Rajesh Kumar requested plumbing service for tomorrow at 10:00 AM. Kitchen sink repair needed.',
        time: '2 min ago',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        read: false,
        priority: 'high',
        avatar: '👨‍🔧',
        actionUrl: '/bookings/123',
        actionText: 'View Booking'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of ₹500 received from Priya Singh for electrical work completed yesterday.',
        time: '1 hour ago',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: false,
        priority: 'medium',
        avatar: '💰',
        actionUrl: '/payments/456',
        actionText: 'View Payment'
      },
      {
        id: 3,
        type: 'review',
        title: 'New 5-Star Review',
        message: 'Amit Sharma left you a 5-star review: "Excellent work! Very professional and on time. Highly recommended!"',
        time: '3 hours ago',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        avatar: '⭐',
        actionUrl: '/reviews/789',
        actionText: 'View Review'
      },
      {
        id: 4,
        type: 'message',
        title: 'New Message',
        message: 'Customer inquiry about electrical work: "Do you provide emergency electrical services for residential areas?"',
        time: '5 hours ago',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: true,
        priority: 'medium',
        avatar: '💬',
        actionUrl: '/messages/abc',
        actionText: 'Reply'
      },
      {
        id: 5,
        type: 'system',
        title: 'Profile Verification Complete',
        message: 'Your professional profile has been verified successfully. You can now receive booking requests.',
        time: '1 day ago',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        avatar: '✅',
        actionUrl: '/profile',
        actionText: 'View Profile'
      },
      {
        id: 6,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your booking with Mohammed Ali for carpentry work has been confirmed for December 15, 2024 at 2:00 PM.',
        time: '2 days ago',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        priority: 'medium',
        avatar: '✅',
        actionUrl: '/bookings/def',
        actionText: 'View Details'
      },
      {
        id: 7,
        type: 'promotion',
        title: 'Special Offer Available',
        message: 'Get 20% off on your next 3 bookings! Use code SAVE20. Valid until December 31, 2024.',
        time: '3 days ago',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        avatar: '🎁',
        actionUrl: '/offers',
        actionText: 'View Offers'
      }
    ]
    
    setNotifications(mockNotifications)
    setLoading(false)
  }, [])

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📋'
      case 'payment': return '💰'
      case 'review': return '⭐'
      case 'message': return '💬'
      case 'system': return '⚙️'
      case 'promotion': return '🎁'
      default: return '🔔'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Layout title="Notifications - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          {/* Header */}
          <div style={headerStyle}>
            <div>
              <h1 style={titleStyle}>
                🔔 Notifications
                {unreadCount > 0 && (
                  <span style={unreadBadgeStyle}>{unreadCount} new</span>
                )}
              </h1>
              <p style={subtitleStyle}>Stay updated with all your activities and messages</p>
            </div>
            
            {unreadCount > 0 && (
              <button
                style={markAllReadBtnStyle}
                onClick={markAllAsRead}
              >
                ✓ Mark All Read
              </button>
            )}
          </div>

          {/* Filters */}
          <div style={filtersStyle}>
            <div style={filterTabsStyle}>
              {[
                { key: 'all', label: 'All', icon: '🔔' },
                { key: 'unread', label: 'Unread', icon: '📌' },
                { key: 'booking', label: 'Bookings', icon: '📋' },
                { key: 'payment', label: 'Payments', icon: '💰' },
                { key: 'review', label: 'Reviews', icon: '⭐' },
                { key: 'message', label: 'Messages', icon: '💬' }
              ].map(tab => (
                <button
                  key={tab.key}
                  style={{
                    ...filterTabStyle,
                    ...(filter === tab.key ? activeFilterTabStyle : {})
                  }}
                  onClick={() => setFilter(tab.key)}
                >
                  <span style={tabIconStyle}>{tab.icon}</span>
                  {tab.label}
                  {tab.key === 'unread' && unreadCount > 0 && (
                    <span style={tabBadgeStyle}>{unreadCount}</span>
                  )}
                </button>
              ))}
            </div>

            <div style={statsStyle}>
              <div style={statStyle}>
                <span style={statValueStyle}>{notifications.length}</span>
                <span style={statLabelStyle}>Total</span>
              </div>
              <div style={statStyle}>
                <span style={statValueStyle}>{unreadCount}</span>
                <span style={statLabelStyle}>Unread</span>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div style={notificationsContainerStyle}>
            {loading ? (
              <div style={loadingStyle}>
                <div style={loadingSpinnerStyle}>⏳</div>
                <p>Loading notifications...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>
                  {filter === 'unread' ? '📭' : '🔔'}
                </div>
                <h3 style={emptyTitleStyle}>
                  {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                </h3>
                <p style={emptyTextStyle}>
                  {filter === 'unread' 
                    ? 'You have no unread notifications at the moment.'
                    : 'You haven\'t received any notifications yet.'
                  }
                </p>
                {filter !== 'all' && (
                  <button
                    style={showAllBtnStyle}
                    onClick={() => setFilter('all')}
                  >
                    Show All Notifications
                  </button>
                )}
              </div>
            ) : (
              <div style={notificationListStyle}>
                {filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    style={{
                      ...notificationItemStyle,
                      ...(notification.read ? readNotificationStyle : unreadNotificationStyle)
                    }}
                  >
                    {/* Priority Indicator */}
                    <div
                      style={{
                        ...priorityIndicatorStyle,
                        backgroundColor: getPriorityColor(notification.priority)
                      }}
                    />

                    {/* Avatar */}
                    <div style={avatarStyle}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div style={contentStyle}>
                      <div style={headerRowStyle}>
                        <h3 style={notificationTitleStyle}>
                          {notification.title}
                        </h3>
                        <div style={actionsStyle}>
                          <span style={timeStyle}>
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <button
                              style={markReadBtnStyle}
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              ✓
                            </button>
                          )}
                          <button
                            style={deleteBtnStyle}
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete notification"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <p style={messageStyle}>{notification.message}</p>

                      {/* Action Button */}
                      {notification.actionUrl && (
                        <div style={actionRowStyle}>
                          <Link
                            href={notification.actionUrl}
                            style={actionBtnStyle}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                          >
                            {notification.actionText || 'View Details'} →
                          </Link>
                        </div>
                      )}

                      {/* Priority Badge */}
                      {notification.priority === 'high' && (
                        <div style={highPriorityBadgeStyle}>
                          ⚡ High Priority
                        </div>
                      )}
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div style={unreadDotStyle} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={quickActionsStyle}>
            <h3 style={quickActionsTitleStyle}>Quick Actions</h3>
            <div style={quickActionsGridStyle}>
              <Link href="/services" style={quickActionCardStyle}>
                <span style={quickActionIconStyle}>🔍</span>
                <span style={quickActionLabelStyle}>Find Services</span>
              </Link>
              <Link href="/bookings" style={quickActionCardStyle}>
                <span style={quickActionIconStyle}>📋</span>
                <span style={quickActionLabelStyle}>My Bookings</span>
              </Link>
              <Link href="/messages" style={quickActionCardStyle}>
                <span style={quickActionIconStyle}>💬</span>
                <span style={quickActionLabelStyle}>Messages</span>
              </Link>
              <Link href="/emergency" style={quickActionCardStyle}>
                <span style={quickActionIconStyle}>🚨</span>
                <span style={quickActionLabelStyle}>Emergency</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const containerStyle = {
  padding: '40px 0',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '40px',
  flexWrap: 'wrap',
  gap: '20px'
}

const titleStyle = {
  fontSize: '36px',
  fontWeight: '800',
  color: '#2c3e50',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const unreadBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '600'
}

const subtitleStyle = {
  fontSize: '18px',
  color: '#6c757d',
  margin: 0
}

const markAllReadBtnStyle = {
  background: '#28a745',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const filtersStyle = {
  background: 'white',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '32px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '20px'
}

const filterTabsStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap'
}

const filterTabStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: '2px solid #e9ecef',
  padding: '10px 16px',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: '#6c757d',
  transition: 'all 0.3s ease'
}

const activeFilterTabStyle = {
  background: '#007bff',
  color: 'white',
  borderColor: '#007bff'
}

const tabIconStyle = {
  fontSize: '16px'
}

const tabBadgeStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '2px 6px',
  borderRadius: '10px',
  fontSize: '10px',
  fontWeight: '700',
  minWidth: '16px',
  textAlign: 'center'
}

const statsStyle = {
  display: 'flex',
  gap: '24px'
}

const statStyle = {
  textAlign: 'center'
}

const statValueStyle = {
  display: 'block',
  fontSize: '24px',
  fontWeight: '700',
  color: '#007bff'
}

const statLabelStyle = {
  fontSize: '12px',
  color: '#6c757d',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const notificationsContainerStyle = {
  marginBottom: '40px'
}

const loadingStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#6c757d'
}

const loadingSpinnerStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  animation: 'spin 2s linear infinite'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#6c757d'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

const emptyTitleStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '12px'
}

const emptyTextStyle = {
  fontSize: '16px',
  marginBottom: '24px'
}

const showAllBtnStyle = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const notificationListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const notificationItemStyle = {
  display: 'flex',
  gap: '16px',
  padding: '24px',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '2px solid transparent',
  position: 'relative',
  transition: 'all 0.3s ease'
}

const readNotificationStyle = {
  opacity: '0.8'
}

const unreadNotificationStyle = {
  borderColor: 'rgba(0, 123, 255, 0.2)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)'
}

const priorityIndicatorStyle = {
  position: 'absolute',
  left: '0',
  top: '0',
  bottom: '0',
  width: '4px',
  borderRadius: '2px 0 0 2px'
}

const avatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  flexShrink: 0
}

const contentStyle = {
  flex: '1',
  minWidth: '0'
}

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px',
  gap: '16px'
}

const notificationTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#2c3e50',
  margin: '0',
  lineHeight: '1.3'
}

const actionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0
}

const timeStyle = {
  fontSize: '12px',
  color: '#6c757d',
  fontWeight: '500'
}

const markReadBtnStyle = {
  background: '#28a745',
  color: 'white',
  border: 'none',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
}

const deleteBtnStyle = {
  background: '#dc3545',
  color: 'white',
  border: 'none',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
}

const messageStyle = {
  fontSize: '15px',
  color: '#495057',
  lineHeight: '1.5',
  marginBottom: '12px'
}

const actionRowStyle = {
  marginTop: '16px'
}

const actionBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: '#007bff',
  color: 'white',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.3s ease'
}

const highPriorityBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: 'rgba(220, 53, 69, 0.1)',
  color: '#dc3545',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '700',
  marginTop: '8px'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#007bff',
  flexShrink: 0,
  marginTop: '6px'
}

const quickActionsStyle = {
  background: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
}

const quickActionsTitleStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '20px'
}

const quickActionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '16px'
}

const quickActionCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '20px',
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  borderRadius: '12px',
  textDecoration: 'none',
  color: '#2c3e50',
  transition: 'all 0.3s ease'
}

const quickActionIconStyle = {
  fontSize: '24px'
}

const quickActionLabelStyle = {
  fontSize: '14px',
  fontWeight: '600'
}

// Add CSS animations
const animations = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = animations
  document.head.appendChild(style)
}
