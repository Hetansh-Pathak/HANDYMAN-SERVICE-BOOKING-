import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import NotificationBell from '../NotificationBell'

export default function ProviderLayout({ children, title = 'HandyFix Pro - Provider Dashboard' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isOnlineStatus, setIsOnlineStatus] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { user, logout, notifications } = useUser()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleOnlineStatus = () => {
    setIsOnlineStatus(!isOnlineStatus)
    // Here you would typically make an API call to update the provider's status
  }

  const businessMetrics = [
    { label: 'New Bookings', value: '7', change: '+3', trend: 'up' },
    { label: "Today's Earnings", value: '₹2,450', change: '+12%', trend: 'up' },
    { label: 'Active Jobs', value: '4', change: '-1', trend: 'down' },
    { label: 'Rating', value: '4.8', change: '+0.1', trend: 'up' }
  ]

  const quickActions = [
    { name: 'View Bookings', icon: '📋', color: '#28a745', urgent: false },
    { name: 'Update Availability', icon: '📅', color: '#17a2b8', urgent: false },
    { name: 'Emergency Request', icon: '🚨', color: '#dc3545', urgent: true },
    { name: 'Chat Support', icon: '💬', color: '#6f42c1', urgent: false }
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Manage your services and grow your business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <div style={headerGradientStyle}></div>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/dashboard/provider" style={logoStyle}>
              <span style={logoIconStyle}>🔧</span>
              <span style={logoTextStyle}>HandyFix</span>
              <span style={proTextStyle}>PRO</span>
              <span style={providerBadgeStyle}>Provider</span>
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/dashboard/provider" style={navLinkStyle}>
                <span style={navIconStyle}>📊</span>
                Dashboard
              </Link>
              <Link href="/provider/bookings" style={navLinkStyle}>
                <span style={navIconStyle}>📋</span>
                Bookings
                <span style={bookingCountStyle}>7</span>
              </Link>
              <Link href="/provider/earnings" style={navLinkStyle}>
                <span style={navIconStyle}>💰</span>
                Earnings
              </Link>
              <Link href="/provider/schedule" style={navLinkStyle}>
                <span style={navIconStyle}>📅</span>
                Schedule
              </Link>
              <Link href="/provider/analytics" style={navLinkStyle}>
                <span style={navIconStyle}>📈</span>
                Analytics
              </Link>
            </div>

            <div style={userMenuStyle}>
              <div style={businessStatsStyle}>
                <div style={timeDisplayStyle}>
                  <span style={timeIconStyle}>🕐</span>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={earningsDisplayStyle}>
                  <span style={earningsIconStyle}>💰</span>
                  Today: ₹2,450
                </div>
              </div>

              <button 
                style={{
                  ...statusToggleStyle,
                  ...(isOnlineStatus ? onlineStatusStyle : offlineStatusStyle)
                }}
                onClick={toggleOnlineStatus}
              >
                <div style={statusDotStyle}></div>
                <span style={statusTextStyle}>
                  {isOnlineStatus ? 'Online' : 'Offline'}
                </span>
                <span style={statusToggleIconStyle}>
                  {isOnlineStatus ? '🟢' : '🔴'}
                </span>
              </button>

              <NotificationBell notifications={notifications} />
              
              <div style={userSectionStyle}>
                <button 
                  style={userInfoStyle}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div style={avatarStyle}>
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.name} style={avatarImageStyle} />
                    ) : (
                      <span style={avatarTextStyle}>{user?.name?.charAt(0) || 'P'}</span>
                    )}
                    <div style={providerBadgeIconStyle}>🔧</div>
                  </div>
                  <div style={userDetailsStyle}>
                    <span style={userNameStyle}>{user?.name || 'Provider'}</span>
                    <span style={userTypeStyle}>Pro Service Provider</span>
                    <div style={ratingDisplayStyle}>
                      <span style={starIconStyle}>⭐</span>
                      <span style={ratingValueStyle}>4.8</span>
                      <span style={reviewCountStyle}>(152 reviews)</span>
                    </div>
                  </div>
                  <span style={dropdownArrowStyle}>
                    {isProfileOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isProfileOpen && (
                  <div style={profileDropdownStyle}>
                    <div style={dropdownHeaderStyle}>
                      <div style={profileAvatarStyle}>
                        {user?.profileImage ? (
                          <img src={user.profileImage} alt={user.name} style={profileImageStyle} />
                        ) : (
                          <span style={profileTextStyle}>{user?.name?.charAt(0) || 'P'}</span>
                        )}
                      </div>
                      <div>
                        <div style={profileNameStyle}>{user?.name || 'Provider'}</div>
                        <div style={profileEmailStyle}>{user?.email}</div>
                        <div style={profileStatsStyle}>
                          <span>⭐ 4.8</span>
                          <span>|</span>
                          <span>152 reviews</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={dropdownDividerStyle}></div>
                    
                    <Link href="/provider/profile" style={dropdownLinkStyle}>
                      <span>👤</span> Profile Settings
                    </Link>
                    <Link href="/provider/services" style={dropdownLinkStyle}>
                      <span>🔧</span> Manage Services
                    </Link>
                    <Link href="/provider/availability" style={dropdownLinkStyle}>
                      <span>📅</span> Set Availability
                    </Link>
                    <Link href="/provider/portfolio" style={dropdownLinkStyle}>
                      <span>🎨</span> Portfolio
                    </Link>
                    <Link href="/provider/analytics" style={dropdownLinkStyle}>
                      <span>📈</span> Business Analytics
                    </Link>
                    <Link href="/provider/payments" style={dropdownLinkStyle}>
                      <span>💳</span> Payment Settings
                    </Link>
                    
                    <div style={dropdownDividerStyle}></div>
                    
                    <Link href="/provider/help" style={dropdownLinkStyle}>
                      <span>❓</span> Help & Support
                    </Link>
                    
                    <div style={dropdownDividerStyle}></div>
                    
                    <button onClick={logout} style={logoutBtnStyle}>
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button 
              style={mobileMenuBtnStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {isMenuOpen && (
            <div style={mobileMenuStyle}>
              <div style={mobileUserInfoStyle}>
                <div style={mobileAvatarStyle}>
                  {user?.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <div style={mobileUserNameStyle}>{user?.name}</div>
                  <div style={mobileUserEmailStyle}>{user?.email}</div>
                  <div style={mobileStatsStyle}>⭐ 4.8 | 152 reviews</div>
                </div>
              </div>

              <div style={mobileStatusStyle}>
                <button 
                  style={{
                    ...mobileStatusBtnStyle,
                    ...(isOnlineStatus ? mobileOnlineStyle : mobileOfflineStyle)
                  }}
                  onClick={toggleOnlineStatus}
                >
                  {isOnlineStatus ? '🟢 Online' : '🔴 Offline'}
                </button>
              </div>
              
              <div style={mobileDividerStyle}></div>
              
              <Link href="/dashboard/provider" style={mobileNavLinkStyle}>
                <span>📊</span> Dashboard
              </Link>
              <Link href="/provider/bookings" style={mobileNavLinkStyle}>
                <span>📋</span> Bookings <span style={mobileBadgeStyle}>7</span>
              </Link>
              <Link href="/provider/earnings" style={mobileNavLinkStyle}>
                <span>💰</span> Earnings
              </Link>
              <Link href="/provider/schedule" style={mobileNavLinkStyle}>
                <span>📅</span> Schedule
              </Link>
              <Link href="/provider/analytics" style={mobileNavLinkStyle}>
                <span>📈</span> Analytics
              </Link>
              
              <div style={mobileDividerStyle}></div>
              
              <Link href="/provider/profile" style={mobileNavLinkStyle}>
                <span>⚙️</span> Settings
              </Link>
              <button onClick={logout} style={mobileLogoutBtnStyle}>
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Business Metrics Bar */}
      <div style={metricsBarStyle}>
        <div className="container">
          <div style={metricsContainerStyle}>
            {businessMetrics.map((metric, index) => (
              <div key={index} style={metricItemStyle}>
                <div style={metricLabelStyle}>{metric.label}</div>
                <div style={metricValueStyle}>
                  <span style={metricMainValueStyle}>{metric.value}</span>
                  <span style={{
                    ...metricChangeStyle,
                    color: metric.trend === 'up' ? '#28a745' : '#dc3545'
                  }}>
                    {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main style={mainStyle}>
        {children}
      </main>

      {/* Quick Business Actions */}
      <div style={quickActionsStyle}>
        <div style={quickActionsHeaderStyle}>
          <span style={quickActionsIconStyle}>⚡</span>
          Quick Actions
        </div>
        {quickActions.map((action, index) => (
          <Link 
            key={index} 
            href={`/provider/${action.name.toLowerCase().replace(' ', '-')}`}
            style={{
              ...quickActionBtnStyle,
              borderLeft: `4px solid ${action.color}`,
              ...(action.urgent ? urgentActionStyle : {})
            }}
            title={action.name}
          >
            <span style={quickActionIconStyle}>{action.icon}</span>
            {action.urgent && <span style={urgentBadgeStyle}>!</span>}
          </Link>
        ))}
      </div>

      {/* Floating Business Tools */}
      <div style={floatingToolsStyle}>
        <Link href="/provider/emergency" style={emergencyToolStyle} title="Emergency Support">
          <span style={emergencyIconStyle}>🚨</span>
          <span style={emergencyTextStyle}>Emergency</span>
        </Link>
        <Link href="/provider/bookings" style={bookingsToolStyle} title="New Bookings">
          <span style={bookingsIconStyle}>📋</span>
          <span style={bookingsBadgeStyle}>7</span>
        </Link>
      </div>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>
                <span style={footerLogoStyle}>🔧</span>
                HandyFix Pro
              </h4>
              <p style={footerTextStyle}>Grow your business with HandyFix Pro</p>
              <div style={socialLinksStyle}>
                <a href="#" style={socialLinkStyle}>📘</a>
                <a href="#" style={socialLinkStyle}>📷</a>
                <a href="#" style={socialLinkStyle}>🐦</a>
                <a href="#" style={socialLinkStyle}>💼</a>
              </div>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Business Tools</h4>
              <ul style={footerListStyle}>
                <li><Link href="/provider/bookings" style={footerLinkStyle}>📋 Manage Bookings</Link></li>
                <li><Link href="/provider/analytics" style={footerLinkStyle}>📈 Business Analytics</Link></li>
                <li><Link href="/provider/marketing" style={footerLinkStyle}>📢 Marketing Tools</Link></li>
                <li><Link href="/provider/training" style={footerLinkStyle}>🎓 Training Center</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Provider Resources</h4>
              <ul style={footerListStyle}>
                <li><Link href="/provider/help" style={footerLinkStyle}>❓ Help Center</Link></li>
                <li><Link href="/provider/community" style={footerLinkStyle}>👥 Provider Community</Link></li>
                <li><Link href="/provider/best-practices" style={footerLinkStyle}>⭐ Best Practices</Link></li>
                <li><Link href="/provider/certification" style={footerLinkStyle}>🏆 Certification</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Support</h4>
              <ul style={footerListStyle}>
                <li><a href="tel:+911234567891" style={footerLinkStyle}>📞 Provider Support</a></li>
                <li><a href="mailto:providers@handyfix.com" style={footerLinkStyle}>✉️ Email Support</a></li>
                <li><Link href="/provider/emergency" style={footerLinkStyle}>🚨 Emergency Support</Link></li>
                <li><a href="https://wa.me/911234567891" style={footerLinkStyle}>💬 WhatsApp Business</a></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix Pro. All rights reserved. | Provider Portal</p>
            <div style={footerLinksStyle}>
              <Link href="/provider/terms" style={footerBottomLinkStyle}>Provider Terms</Link>
              <Link href="/provider/privacy" style={footerBottomLinkStyle}>Privacy Policy</Link>
              <Link href="/provider/commission" style={footerBottomLinkStyle}>Commission Structure</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// Enhanced Styles for Provider Experience
const headerStyle = {
  background: 'linear-gradient(135deg, #28a745 0%, #20c997 50%, #17a2b8 100%)',
  boxShadow: '0 8px 32px rgba(40, 167, 69, 0.3)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden'
}

const headerGradientStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
  animation: 'shimmer 4s infinite'
}

const navStyle = {
  position: 'relative',
  zIndex: 1
}

const navContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  minHeight: '85px'
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'white',
  fontWeight: '700',
  fontSize: '24px',
  transition: 'all 0.3s ease'
}

const logoIconStyle = {
  fontSize: '32px',
  animation: 'bounce 3s infinite'
}

const logoTextStyle = {
  background: 'linear-gradient(135deg, white, #e8f5e8)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const proTextStyle = {
  background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: '800',
  fontSize: '14px'
}

const providerBadgeStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const desktopMenuStyle = {
  display: 'flex',
  gap: '32px',
  '@media (max-width: 1024px)': {
    display: 'none'
  }
}

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: '500',
  fontSize: '15px',
  padding: '12px 16px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden'
}

const navIconStyle = {
  fontSize: '16px',
  transition: 'transform 0.3s ease'
}

const bookingCountStyle = {
  background: '#dc3545',
  color: 'white',
  borderRadius: '10px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: '700',
  minWidth: '18px',
  height: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'pulse 2s infinite'
}

const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px'
}

const businessStatsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '12px'
}

const timeDisplayStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: '600'
}

const timeIconStyle = {
  fontSize: '12px'
}

const earningsDisplayStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: '600',
  color: '#ffc107'
}

const earningsIconStyle = {
  fontSize: '12px'
}

const statusToggleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '12px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)'
}

const onlineStatusStyle = {
  background: 'rgba(76, 175, 80, 0.2)',
  color: '#4caf50',
  border: '1px solid rgba(76, 175, 80, 0.3)'
}

const offlineStatusStyle = {
  background: 'rgba(244, 67, 54, 0.2)',
  color: '#f44336',
  border: '1px solid rgba(244, 67, 54, 0.3)'
}

const statusDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'currentColor',
  animation: 'pulse 2s infinite'
}

const statusTextStyle = {
  fontWeight: '600'
}

const statusToggleIconStyle = {
  fontSize: '14px'
}

const userSectionStyle = {
  position: 'relative'
}

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '8px 16px',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: 'white'
}

const avatarStyle = {
  position: 'relative',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '18px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  overflow: 'hidden'
}

const avatarImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%'
}

const avatarTextStyle = {
  color: 'white',
  fontWeight: '600'
}

const providerBadgeIconStyle = {
  position: 'absolute',
  bottom: '-2px',
  right: '-2px',
  width: '16px',
  height: '16px',
  background: '#28a745',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '8px',
  border: '2px solid white'
}

const userDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2px'
}

const userNameStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: 'white'
}

const userTypeStyle = {
  fontSize: '11px',
  color: '#ffc107',
  fontWeight: '500'
}

const ratingDisplayStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '10px'
}

const starIconStyle = {
  color: '#ffc107'
}

const ratingValueStyle = {
  fontWeight: '600',
  color: 'white'
}

const reviewCountStyle = {
  color: 'rgba(255, 255, 255, 0.7)'
}

const dropdownArrowStyle = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'transform 0.3s ease'
}

const profileDropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: '0',
  width: '320px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginTop: '12px',
  padding: '24px',
  animation: 'fadeInUp 0.3s ease-out'
}

const dropdownHeaderStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '20px'
}

const profileAvatarStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  border: '2px solid rgba(40, 167, 69, 0.2)'
}

const profileImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}

const profileTextStyle = {
  color: 'white',
  fontWeight: '600',
  fontSize: '20px'
}

const profileNameStyle = {
  fontWeight: '600',
  fontSize: '18px',
  color: '#333',
  marginBottom: '4px'
}

const profileEmailStyle = {
  fontSize: '13px',
  color: '#666',
  marginBottom: '8px'
}

const profileStatsStyle = {
  display: 'flex',
  gap: '8px',
  fontSize: '12px',
  color: '#28a745',
  fontWeight: '600'
}

const dropdownDividerStyle = {
  height: '1px',
  background: 'rgba(0, 0, 0, 0.1)',
  margin: '16px 0'
}

const dropdownLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#333',
  textDecoration: 'none',
  padding: '12px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  fontWeight: '500'
}

const logoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'none',
  border: 'none',
  color: '#dc3545',
  padding: '12px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease'
}

const mobileMenuBtnStyle = {
  display: 'none',
  flexDirection: 'column',
  gap: '4px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  '@media (max-width: 1024px)': {
    display: 'flex'
  }
}

const mobileMenuStyle = {
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderTop: 'none',
  padding: '24px',
  animation: 'slideIn 0.3s ease-out'
}

const mobileUserInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '20px'
}

const mobileAvatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: '600',
  fontSize: '18px'
}

const mobileUserNameStyle = {
  fontWeight: '600',
  color: '#333',
  fontSize: '16px'
}

const mobileUserEmailStyle = {
  fontSize: '13px',
  color: '#666'
}

const mobileStatsStyle = {
  fontSize: '12px',
  color: '#28a745',
  fontWeight: '600'
}

const mobileStatusStyle = {
  marginBottom: '16px'
}

const mobileStatusBtnStyle = {
  padding: '8px 16px',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}

const mobileOnlineStyle = {
  background: 'rgba(76, 175, 80, 0.1)',
  color: '#4caf50'
}

const mobileOfflineStyle = {
  background: 'rgba(244, 67, 54, 0.1)',
  color: '#f44336'
}

const mobileDividerStyle = {
  height: '1px',
  background: 'rgba(0, 0, 0, 0.1)',
  margin: '16px 0'
}

const mobileNavLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 0',
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: '500',
  fontSize: '16px'
}

const mobileBadgeStyle = {
  background: '#dc3545',
  color: 'white',
  borderRadius: '10px',
  padding: '2px 6px',
  fontSize: '10px',
  fontWeight: '700',
  marginLeft: 'auto'
}

const mobileLogoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'none',
  border: 'none',
  color: '#dc3545',
  padding: '12px 0',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '16px',
  fontWeight: '500'
}

const metricsBarStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  padding: '16px 0'
}

const metricsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '24px'
}

const metricItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
}

const metricLabelStyle = {
  fontSize: '12px',
  color: '#666',
  fontWeight: '500',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const metricValueStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px'
}

const metricMainValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#28a745'
}

const metricChangeStyle = {
  fontSize: '12px',
  fontWeight: '600'
}

const mainStyle = {
  minHeight: 'calc(100vh - 300px)',
  paddingBottom: '100px'
}

const quickActionsStyle = {
  position: 'fixed',
  bottom: '100px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: 999
}

const quickActionsHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(40, 167, 69, 0.9)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '600',
  textAlign: 'center',
  animation: 'fadeInRight 0.5s ease-out'
}

const quickActionsIconStyle = {
  fontSize: '12px'
}

const quickActionBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  textDecoration: 'none',
  color: '#28a745',
  boxShadow: '0 4px 15px rgba(40, 167, 69, 0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  border: '2px solid rgba(40, 167, 69, 0.1)',
  animation: 'fadeInRight 0.5s ease-out'
}

const quickActionIconStyle = {
  fontSize: '20px'
}

const urgentActionStyle = {
  background: 'rgba(220, 53, 69, 0.95)',
  color: 'white',
  animation: 'pulse 2s infinite'
}

const urgentBadgeStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  width: '16px',
  height: '16px',
  background: '#dc3545',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  fontWeight: '700',
  animation: 'pulse 1s infinite'
}

const floatingToolsStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  zIndex: 1000
}

const emergencyToolStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  boxShadow: '0 6px 20px rgba(220, 53, 69, 0.4)',
  transition: 'all 0.3s ease',
  animation: 'pulse 3s infinite'
}

const emergencyIconStyle = {
  fontSize: '16px',
  animation: 'bounce 2s infinite'
}

const emergencyTextStyle = {
  fontWeight: '600'
}

const bookingsToolStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  color: 'white',
  borderRadius: '50%',
  textDecoration: 'none',
  boxShadow: '0 8px 25px rgba(40, 167, 69, 0.4)',
  transition: 'all 0.3s ease',
  position: 'relative'
}

const bookingsIconStyle = {
  fontSize: '24px'
}

const bookingsBadgeStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: '#dc3545',
  color: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700',
  animation: 'pulse 2s infinite'
}

const footerStyle = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)',
  color: 'white',
  marginTop: '80px',
  position: 'relative',
  overflow: 'hidden'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px',
  padding: '60px 0 40px',
  position: 'relative',
  zIndex: 1
}

const footerSectionStyle = {
  animation: 'fadeInUp 0.6s ease-out'
}

const footerHeadingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '20px',
  fontSize: '18px',
  fontWeight: '600',
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const footerLogoStyle = {
  fontSize: '24px'
}

const footerTextStyle = {
  color: '#bdc3c7',
  lineHeight: '1.6',
  marginBottom: '20px'
}

const socialLinksStyle = {
  display: 'flex',
  gap: '12px'
}

const socialLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(40, 167, 69, 0.1)',
  borderRadius: '50%',
  textDecoration: 'none',
  fontSize: '18px',
  transition: 'all 0.3s ease'
}

const footerListStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 0',
  transition: 'all 0.3s ease',
  borderRadius: '4px'
}

const footerBottomStyle = {
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  paddingTop: '30px',
  paddingBottom: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#bdc3c7',
  flexWrap: 'wrap',
  gap: '16px'
}

const footerLinksStyle = {
  display: 'flex',
  gap: '20px'
}

const footerBottomLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  fontSize: '14px',
  transition: 'color 0.3s ease'
}

// Mobile responsive adjustments
Object.assign(mobileMenuBtnStyle, {
  '& span': {
    width: '20px',
    height: '2px',
    background: 'white',
    borderRadius: '1px',
    transition: 'all 0.3s ease'
  }
})
