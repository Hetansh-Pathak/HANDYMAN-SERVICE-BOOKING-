import { useState, useEffect } from 'react'
import RoleBasedLayout from '../components/RoleBasedLayout'
import { useUser } from '../context/UserContext'

export default function NotificationsPage() {
  const { user, notifications, markNotificationAsRead } = useUser()
  const [filter, setFilter] = useState('all')
  const [selectedNotification, setSelectedNotification] = useState(null)

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return notification.type === filter
  })

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📋'
      case 'booking_confirmed': return '✅'
      case 'booking_cancelled': return '❌'
      case 'booking_submitted': return '📤'
      case 'booking_action': return '🔄'
      case 'payment': return '💰'
      case 'review': return '⭐'
      case 'message': return '💬'
      case 'system': return '🔔'
      default: return '📢'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
    return date.toLocaleDateString()
  }

  const formatFullDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <RoleBasedLayout title="Notifications - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={titleStyle}>Notifications</h1>
            <div style={statsStyle}>
              <div style={statItemStyle}>
                <span style={statNumberStyle}>
                  {notifications.filter(n => !n.read).length}
                </span>
                <span style={statLabelStyle}>Unread</span>
              </div>
              <div style={statItemStyle}>
                <span style={statNumberStyle}>{notifications.length}</span>
                <span style={statLabelStyle}>Total</span>
              </div>
            </div>
          </div>

          <div style={filtersStyle}>
            <button
              style={{
                ...filterBtnStyle,
                ...(filter === 'all' ? activeFilterStyle : {})
              }}
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </button>
            <button
              style={{
                ...filterBtnStyle,
                ...(filter === 'unread' ? activeFilterStyle : {})
              }}
              onClick={() => setFilter('unread')}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button
              style={{
                ...filterBtnStyle,
                ...(filter === 'booking' ? activeFilterStyle : {})
              }}
              onClick={() => setFilter('booking')}
            >
              Bookings ({notifications.filter(n => n.type.includes('booking')).length})
            </button>
            <button
              style={{
                ...filterBtnStyle,
                ...(filter === 'payment' ? activeFilterStyle : {})
              }}
              onClick={() => setFilter('payment')}
            >
              Payments ({notifications.filter(n => n.type === 'payment').length})
            </button>
          </div>

          <div style={notificationsListStyle}>
            {filteredNotifications.length === 0 ? (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>🔔</div>
                <h3>No notifications found</h3>
                <p>
                  {filter === 'all' 
                    ? "You don't have any notifications yet."
                    : `No ${filter} notifications found.`
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    ...notificationItemStyle,
                    ...(notification.read ? {} : unreadItemStyle)
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div style={notificationIconStyle}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={notificationContentStyle}>
                    <div style={notificationHeaderStyle}>
                      <h3 style={notificationTitleStyle}>
                        {notification.title}
                      </h3>
                      <div style={notificationMetaStyle}>
                        <span style={timeStyle}>
                          {formatTime(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <div style={unreadDotStyle}></div>
                        )}
                      </div>
                    </div>
                    <p style={notificationMessageStyle}>
                      {notification.message}
                    </p>
                    {notification.actionUrl && (
                      <a
                        href={notification.actionUrl}
                        style={actionLinkStyle}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Notification Detail Modal */}
        {selectedNotification && (
          <div style={modalOverlayStyle} onClick={() => setSelectedNotification(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <div style={modalTitleStyle}>
                  <span style={modalIconStyle}>
                    {getNotificationIcon(selectedNotification.type)}
                  </span>
                  {selectedNotification.title}
                </div>
                <button
                  style={closeButtonStyle}
                  onClick={() => setSelectedNotification(null)}
                >
                  ✕
                </button>
              </div>

              <div style={modalBodyStyle}>
                <div style={modalMetaStyle}>
                  <span>Received: {formatFullDate(selectedNotification.timestamp)}</span>
                  <span style={modalTypeStyle}>
                    Type: {selectedNotification.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div style={modalMessageStyle}>
                  {selectedNotification.message}
                </div>

                {selectedNotification.data && (
                  <div style={modalDataStyle}>
                    <h4>Additional Details:</h4>
                    <pre style={dataPreStyle}>
                      {JSON.stringify(selectedNotification.data, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedNotification.actionUrl && (
                  <div style={modalActionsStyle}>
                    <a
                      href={selectedNotification.actionUrl}
                      className="btn btn-primary"
                      style={modalActionBtnStyle}
                    >
                      Take Action
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
  color: '#007bff'
}

const statLabelStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const filtersStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '24px',
  flexWrap: 'wrap'
}

const filterBtnStyle = {
  padding: '8px 16px',
  border: '1px solid #dee2e6',
  borderRadius: '20px',
  background: 'white',
  color: '#6c757d',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease'
}

const activeFilterStyle = {
  background: '#007bff',
  color: 'white',
  borderColor: '#007bff'
}

const notificationsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const notificationItemStyle = {
  display: 'flex',
  gap: '16px',
  padding: '20px',
  background: 'white',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '1px solid #e9ecef',
  ':hover': {
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  }
}

const unreadItemStyle = {
  background: '#f8f9ff',
  borderColor: '#007bff'
}

const notificationIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  flexShrink: 0
}

const notificationContentStyle = {
  flex: 1,
  minWidth: 0
}

const notificationHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '8px'
}

const notificationTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50',
  margin: 0,
  lineHeight: '1.4'
}

const notificationMetaStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const timeStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#007bff'
}

const notificationMessageStyle = {
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.5',
  margin: '0 0 12px 0'
}

const actionLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  background: 'white',
  borderRadius: '12px'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
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

const modalTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '20px',
  fontWeight: '600',
  color: '#2c3e50'
}

const modalIconStyle = {
  fontSize: '24px'
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

const modalMetaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  fontSize: '14px',
  color: '#7f8c8d'
}

const modalTypeStyle = {
  background: '#e9ecef',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: '600'
}

const modalMessageStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '20px'
}

const modalDataStyle = {
  marginBottom: '20px'
}

const dataPreStyle = {
  background: '#f8f9fa',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '12px',
  overflow: 'auto',
  maxHeight: '200px'
}

const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const modalActionBtnStyle = {
  padding: '12px 24px'
}
