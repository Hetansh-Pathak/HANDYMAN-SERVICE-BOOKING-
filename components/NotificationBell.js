import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '../context/UserContext'

export default function NotificationBell({ notifications = [], customStyle = {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [filter, setFilter] = useState('all')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const dropdownRef = useRef(null)
  const bellRef = useRef(null)
  const { markNotificationAsRead, user, isProvider } = useUser()

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  // Animate bell when new notifications arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [unreadCount])

  // Play notification sound
  useEffect(() => {
    if (soundEnabled && unreadCount > 0 && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('/notification-sound.mp3')
        audio.volume = 0.3
        audio.play().catch(() => {}) // Ignore autoplay restrictions
      } catch (error) {
        // Ignore audio errors
      }
    }
  }, [notifications.length, soundEnabled])

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
    
    // Navigate to action URL if provided
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id)
      }
    })
  }

  const getNotificationIcon = (type) => {
    const iconMap = {
      booking: '📋',
      booking_confirmed: '✅',
      booking_cancelled: '❌',
      booking_completed: '🎉',
      payment: '💰',
      payment_received: '💳',
      review: '⭐',
      review_received: '📝',
      message: '💬',
      emergency: '🚨',
      promotion: '🎁',
      system: '⚙️',
      reminder: '⏰',
      welcome: '👋',
      achievement: '🏆'
    }
    return iconMap[type] || '🔔'
  }

  const getNotificationColor = (type) => {
    const colorMap = {
      booking: '#007bff',
      booking_confirmed: '#28a745',
      booking_cancelled: '#dc3545',
      booking_completed: '#17a2b8',
      payment: '#ffc107',
      payment_received: '#28a745',
      review: '#fd7e14',
      review_received: '#6f42c1',
      message: '#20c997',
      emergency: '#dc3545',
      promotion: '#e83e8c',
      system: '#6c757d',
      reminder: '#17a2b8',
      welcome: '#28a745',
      achievement: '#ffc107'
    }
    return colorMap[type] || '#6c757d'
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

  const getFilterOptions = () => {
    const uniqueTypes = [...new Set(notifications.map(n => n.type))]
    return [
      { value: 'all', label: 'All Notifications', icon: '🔔' },
      ...uniqueTypes.map(type => ({
        value: type,
        label: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        icon: getNotificationIcon(type)
      }))
    ]
  }

  const getPriorityLevel = (type) => {
    const highPriority = ['emergency', 'booking_cancelled', 'payment']
    const mediumPriority = ['booking', 'booking_confirmed', 'message']
    
    if (highPriority.includes(type)) return 'high'
    if (mediumPriority.includes(type)) return 'medium'
    return 'low'
  }

  return (
    <div style={{ ...containerStyle, ...customStyle }} ref={dropdownRef}>
      <button 
        ref={bellRef}
        style={{
          ...bellButtonStyle,
          ...(isAnimating ? animatingBellStyle : {}),
          ...(isProvider ? providerBellStyle : customerBellStyle)
        }}
        onClick={() => setIsOpen(!isOpen)}
        title={`${unreadCount} new notifications`}
      >
        <span style={bellIconStyle}>🔔</span>
        
        {unreadCount > 0 && (
          <span style={{
            ...badgeStyle,
            ...(isProvider ? providerBadgeStyle : customerBadgeStyle)
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {unreadCount > 0 && (
          <div style={pulseRingStyle}></div>
        )}
      </button>

      {isOpen && (
        <div style={{
          ...dropdownStyle,
          ...(isProvider ? providerDropdownStyle : customerDropdownStyle)
        }}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={headerLeftStyle}>
              <h3 style={titleStyle}>
                <span style={titleIconStyle}>🔔</span>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span style={unreadBadgeStyle}>
                  {unreadCount} new
                </span>
              )}
            </div>
            
            <div style={headerActionsStyle}>
              <button
                style={soundToggleStyle}
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Disable sound' : 'Enable sound'}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
              
              {unreadCount > 0 && (
                <button
                  style={markAllReadStyle}
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  ✓
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          {notifications.length > 0 && (
            <div style={filterTabsStyle}>
              {getFilterOptions().slice(0, 4).map(option => (
                <button
                  key={option.value}
                  style={{
                    ...filterTabStyle,
                    ...(filter === option.value ? activeFilterTabStyle : {})
                  }}
                  onClick={() => setFilter(option.value)}
                >
                  <span style={filterIconStyle}>{option.icon}</span>
                  <span style={filterLabelStyle}>{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Notifications List */}
          <div style={listStyle}>
            {filteredNotifications.length === 0 ? (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>
                  {filter === 'all' ? '🔔' : getNotificationIcon(filter)}
                </div>
                <p style={emptyTitleStyle}>
                  {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
                </p>
                <p style={emptyTextStyle}>
                  {isProvider 
                    ? "You'll be notified about new bookings, messages, and important updates here."
                    : "You'll receive updates about your bookings, service confirmations, and more here."
                  }
                </p>
              </div>
            ) : (
              <div style={notificationListStyle}>
                {filteredNotifications.slice(0, 10).map(notification => {
                  const priority = getPriorityLevel(notification.type)
                  const notificationColor = getNotificationColor(notification.type)
                  
                  return (
                    <div
                      key={notification.id}
                      style={{
                        ...notificationItemStyle,
                        ...(notification.read ? readItemStyle : unreadItemStyle),
                        ...(priority === 'high' ? highPriorityStyle : {}),
                        borderLeftColor: notificationColor
                      }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div style={{
                        ...iconStyle,
                        backgroundColor: `${notificationColor}20`,
                        color: notificationColor
                      }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div style={contentStyle}>
                        <div style={notificationHeaderStyle}>
                          <div style={notificationTitleStyle}>
                            {notification.title}
                          </div>
                          <div style={timeStyle}>
                            {formatTime(notification.timestamp)}
                          </div>
                        </div>
                        
                        <div style={notificationMessageStyle}>
                          {notification.message}
                        </div>
                        
                        {notification.actionText && (
                          <div style={actionStyle}>
                            <span style={actionTextStyle}>
                              {notification.actionText} →
                            </span>
                          </div>
                        )}
                        
                        {priority === 'high' && (
                          <div style={priorityBadgeStyle}>
                            <span style={priorityIconStyle}>⚡</span>
                            High Priority
                          </div>
                        )}
                      </div>
                      
                      {!notification.read && (
                        <div style={unreadDotStyle}></div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 10 && (
            <div style={footerStyle}>
              <Link href="/notifications" style={seeAllLinkStyle}>
                <span style={seeAllIconStyle}>👁️</span>
                See all {notifications.length} notifications
              </Link>
            </div>
          )}

          {notifications.length > 0 && (
            <div style={footerActionsStyle}>
              <Link href="/notification-settings" style={settingsLinkStyle}>
                <span style={settingsIconStyle}>⚙️</span>
                Notification Settings
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Enhanced Styles
const containerStyle = {
  position: 'relative',
  display: 'inline-block'
}

const bellButtonStyle = {
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden'
}

const customerBellStyle = {
  background: 'rgba(0, 123, 255, 0.1)',
  borderColor: 'rgba(0, 123, 255, 0.3)'
}

const providerBellStyle = {
  background: 'rgba(40, 167, 69, 0.1)',
  borderColor: 'rgba(40, 167, 69, 0.3)'
}

const animatingBellStyle = {
  animation: 'bellRing 0.5s ease-in-out 2'
}

const bellIconStyle = {
  fontSize: '20px',
  transition: 'transform 0.3s ease',
  filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'
}

const badgeStyle = {
  position: 'absolute',
  top: '-6px',
  right: '-6px',
  borderRadius: '12px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: '700',
  minWidth: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  animation: 'badgePulse 2s infinite'
}

const customerBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white'
}

const providerBadgeStyle = {
  background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
  color: '#333'
}

const pulseRingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '2px solid rgba(220, 53, 69, 0.6)',
  animation: 'pulseRing 1.5s infinite'
}

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  width: '380px',
  maxHeight: '500px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  zIndex: 1000,
  marginTop: '12px',
  overflow: 'hidden',
  animation: 'fadeInUp 0.3s ease-out'
}

const customerDropdownStyle = {
  borderTop: '3px solid #007bff'
}

const providerDropdownStyle = {
  borderTop: '3px solid #28a745'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
}

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const titleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '700',
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const titleIconStyle = {
  fontSize: '16px'
}

const unreadBadgeStyle = {
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: 'white',
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600'
}

const headerActionsStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
}

const soundToggleStyle = {
  background: 'none',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '6px',
  transition: 'background 0.3s ease'
}

const markAllReadStyle = {
  background: 'rgba(40, 167, 69, 0.1)',
  border: '1px solid rgba(40, 167, 69, 0.3)',
  color: '#28a745',
  fontSize: '12px',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '6px 10px',
  borderRadius: '8px',
  transition: 'all 0.3s ease'
}

const filterTabsStyle = {
  display: 'flex',
  padding: '0 16px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  overflowX: 'auto'
}

const filterTabStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'none',
  border: 'none',
  padding: '12px 16px',
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
  transition: 'all 0.3s ease',
  whiteSpace: 'nowrap',
  fontSize: '13px',
  fontWeight: '500',
  color: '#666'
}

const activeFilterTabStyle = {
  color: '#007bff',
  borderBottomColor: '#007bff',
  background: 'rgba(0, 123, 255, 0.05)'
}

const filterIconStyle = {
  fontSize: '14px'
}

const filterLabelStyle = {
  fontSize: '12px'
}

const listStyle = {
  maxHeight: '350px',
  overflowY: 'auto'
}

const emptyStateStyle = {
  padding: '60px 24px',
  textAlign: 'center'
}

const emptyIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  opacity: '0.5'
}

const emptyTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '8px'
}

const emptyTextStyle = {
  color: '#7f8c8d',
  fontSize: '14px',
  lineHeight: '1.5',
  maxWidth: '280px',
  margin: '0 auto'
}

const notificationListStyle = {
  padding: '8px 0'
}

const notificationItemStyle = {
  display: 'flex',
  gap: '16px',
  padding: '16px 24px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  borderLeft: '4px solid transparent'
}

const readItemStyle = {
  background: 'transparent'
}

const unreadItemStyle = {
  background: 'rgba(0, 123, 255, 0.02)'
}

const highPriorityStyle = {
  background: 'rgba(220, 53, 69, 0.03)',
  borderLeftColor: '#dc3545 !important'
}

const iconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  flexShrink: 0
}

const contentStyle = {
  flex: 1,
  minWidth: 0
}

const notificationHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '6px',
  gap: '12px'
}

const notificationTitleStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#333',
  lineHeight: '1.3'
}

const timeStyle = {
  fontSize: '11px',
  color: '#999',
  fontWeight: '500',
  whiteSpace: 'nowrap'
}

const notificationMessageStyle = {
  fontSize: '13px',
  color: '#555',
  lineHeight: '1.4',
  marginBottom: '8px'
}

const actionStyle = {
  marginTop: '8px'
}

const actionTextStyle = {
  color: '#007bff',
  fontSize: '12px',
  fontWeight: '600',
  textDecoration: 'none'
}

const priorityBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: 'rgba(220, 53, 69, 0.1)',
  color: '#dc3545',
  padding: '2px 8px',
  borderRadius: '8px',
  fontSize: '10px',
  fontWeight: '600',
  marginTop: '6px'
}

const priorityIconStyle = {
  fontSize: '8px'
}

const unreadDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#007bff',
  flexShrink: 0,
  marginTop: '6px'
}

const footerStyle = {
  padding: '16px 24px',
  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  textAlign: 'center'
}

const seeAllLinkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px',
  borderRadius: '8px',
  transition: 'all 0.3s ease'
}

const seeAllIconStyle = {
  fontSize: '14px'
}

const footerActionsStyle = {
  padding: '12px 24px',
  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  background: 'rgba(0, 0, 0, 0.02)'
}

const settingsLinkStyle = {
  color: '#666',
  textDecoration: 'none',
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '6px',
  borderRadius: '6px',
  transition: 'all 0.3s ease'
}

const settingsIconStyle = {
  fontSize: '12px'
}

// Add CSS animations
const bellRingKeyframes = `
  @keyframes bellRing {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
`

const badgePulseKeyframes = `
  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`

const pulseRingKeyframes = `
  @keyframes pulseRing {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }
`

// Inject animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = bellRingKeyframes + badgePulseKeyframes + pulseRingKeyframes
  document.head.appendChild(style)
}
