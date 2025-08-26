import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '../context/UserContext'

export default function NotificationBell({ notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { markNotificationAsRead } = useUser()

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id)
    }
    setIsOpen(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📋'
      case 'booking_confirmed': return '✅'
      case 'booking_cancelled': return '❌'
      case 'payment': return '💰'
      case 'review': return '⭐'
      case 'message': return '💬'
      default: return '🔔'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div style={containerStyle} ref={dropdownRef}>
      <button 
        style={bellButtonStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {unreadCount > 0 && (
          <span style={badgeStyle}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={dropdownStyle}>
          <div style={headerStyle}>
            <h3 style={titleStyle}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={unreadBadgeStyle}>{unreadCount} new</span>
            )}
          </div>

          <div style={listStyle}>
            {notifications.length === 0 ? (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>🔔</div>
                <p style={emptyTextStyle}>No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 5).map(notification => (
                <div
                  key={notification.id}
                  style={{
                    ...notificationItemStyle,
                    ...(notification.read ? {} : unreadItemStyle)
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div style={iconStyle}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={contentStyle}>
                    <div style={notificationTitleStyle}>
                      {notification.title}
                    </div>
                    <div style={notificationMessageStyle}>
                      {notification.message}
                    </div>
                    <div style={timeStyle}>
                      {formatTime(notification.timestamp)}
                    </div>
                  </div>
                  {!notification.read && <div style={unreadDotStyle}></div>}
                </div>
              ))
            )}
          </div>

          {notifications.length > 5 && (
            <div style={footerStyle}>
              <Link href="/notifications" style={seeAllLinkStyle}>
                See all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const containerStyle = {
  position: 'relative'
}

const bellButtonStyle = {
  position: 'relative',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  transition: 'background 0.3s ease',
  color: 'white'
}

const badgeStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  background: '#dc3545',
  color: 'white',
  borderRadius: '10px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: '600',
  minWidth: '18px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  width: '350px',
  maxHeight: '400px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  border: '1px solid #eee',
  zIndex: 1000,
  marginTop: '8px'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #eee'
}

const titleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '600',
  color: '#333'
}

const unreadBadgeStyle = {
  background: '#007bff',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600'
}

const listStyle = {
  maxHeight: '300px',
  overflowY: 'auto'
}

const emptyStateStyle = {
  padding: '40px 20px',
  textAlign: 'center'
}

const emptyIconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  opacity: '0.5'
}

const emptyTextStyle = {
  color: '#7f8c8d',
  margin: 0
}

const notificationItemStyle = {
  display: 'flex',
  gap: '12px',
  padding: '16px 20px',
  borderBottom: '1px solid #f8f9fa',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  position: 'relative'
}

const unreadItemStyle = {
  background: '#f8f9ff'
}

const iconStyle = {
  fontSize: '16px',
  marginTop: '2px'
}

const contentStyle = {
  flex: 1,
  minWidth: 0
}

const notificationTitleStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#333',
  marginBottom: '4px'
}

const notificationMessageStyle = {
  fontSize: '13px',
  color: '#555',
  lineHeight: '1.4',
  marginBottom: '4px'
}

const timeStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#007bff',
  marginTop: '6px'
}

const footerStyle = {
  padding: '12px 20px',
  borderTop: '1px solid #eee',
  textAlign: 'center'
}

const seeAllLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500'
}
