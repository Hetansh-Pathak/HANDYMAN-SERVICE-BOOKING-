import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/UserContext'
import NotificationBell from '../NotificationBell'

export default function CustomerLayout({ children, title = 'HandyFix - Book Home Services' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const { user, logout, notifications } = useUser()

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)
    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
    }
  }, [])

  const quickServices = [
    { name: 'Emergency Plumber', icon: '🚰', urgent: true },
    { name: 'AC Repair', icon: '❄️', popular: true },
    { name: 'Electrician', icon: '⚡', available: true },
    { name: 'Cleaner', icon: '🧽', available: true }
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Book trusted home services instantly" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <div style={headerGradientStyle}></div>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/" style={logoStyle}>
              <span style={logoIconStyle}>🏠</span>
              <span style={logoTextStyle}>HandyFix</span>
              <span style={customerBadgeStyle}>Customer</span>
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/services" style={navLinkStyle}>
                <span style={navIconStyle}>🔍</span>
                Find Services
              </Link>
              <Link href="/bookings" style={navLinkStyle}>
                <span style={navIconStyle}>📋</span>
                My Bookings
              </Link>
              <Link href="/favorites" style={navLinkStyle}>
                <span style={navIconStyle}>❤️</span>
                Favorites
              </Link>
              <Link href="/support" style={navLinkStyle}>
                <span style={navIconStyle}>💬</span>
                Support
              </Link>
            </div>

            <div style={userMenuStyle}>
              {!isOnline && (
                <div style={offlineIndicatorStyle}>
                  <span style={offlineIconStyle}>📶</span>
                  Offline
                </div>
              )}

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
                      <span style={avatarTextStyle}>{user?.name?.charAt(0) || 'U'}</span>
                    )}
                    <div style={statusDotStyle}></div>
                  </div>
                  <div style={userDetailsStyle}>
                    <span style={userNameStyle}>{user?.name || 'Customer'}</span>
                    <span style={userTypeStyle}>Premium Member</span>
                    <span style={userLocationStyle}>📍 {user?.location || 'Delhi, India'}</span>
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
                          <span style={profileTextStyle}>{user?.name?.charAt(0) || 'U'}</span>
                        )}
                      </div>
                      <div>
                        <div style={profileNameStyle}>{user?.name || 'Customer'}</div>
                        <div style={profileEmailStyle}>{user?.email}</div>
                      </div>
                    </div>
                    
                    <div style={dropdownDividerStyle}></div>
                    
                    <Link href="/dashboard/user" style={dropdownLinkStyle}>
                      <span>📊</span> Dashboard
                    </Link>
                    <Link href="/profile" style={dropdownLinkStyle}>
                      <span>⚙️</span> Profile Settings
                    </Link>
                    <Link href="/payment-methods" style={dropdownLinkStyle}>
                      <span>💳</span> Payment Methods
                    </Link>
                    <Link href="/addresses" style={dropdownLinkStyle}>
                      <span>📍</span> Saved Addresses
                    </Link>
                    <Link href="/rewards" style={dropdownLinkStyle}>
                      <span>🎁</span> Rewards & Offers
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
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={mobileUserNameStyle}>{user?.name}</div>
                  <div style={mobileUserEmailStyle}>{user?.email}</div>
                </div>
              </div>
              
              <div style={mobileDividerStyle}></div>
              
              <Link href="/services" style={mobileNavLinkStyle}>
                <span>🔍</span> Find Services
              </Link>
              <Link href="/bookings" style={mobileNavLinkStyle}>
                <span>📋</span> My Bookings
              </Link>
              <Link href="/favorites" style={mobileNavLinkStyle}>
                <span>❤️</span> Favorites
              </Link>
              <Link href="/support" style={mobileNavLinkStyle}>
                <span>💬</span> Support
              </Link>
              
              <div style={mobileDividerStyle}></div>
              
              <Link href="/dashboard/user" style={mobileNavLinkStyle}>
                <span>📊</span> Dashboard
              </Link>
              <Link href="/profile" style={mobileNavLinkStyle}>
                <span>⚙️</span> Profile
              </Link>
              <button onClick={logout} style={mobileLogoutBtnStyle}>
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      {/* Quick Service Access */}
      <div style={quickServicesStyle}>
        <div style={quickServicesHeaderStyle}>
          <span style={quickServicesIconStyle}>⚡</span>
          Quick Book
        </div>
        {quickServices.map((service, index) => (
          <Link 
            key={index} 
            href={`/services?type=${service.name.toLowerCase().replace(' ', '-')}`}
            style={{
              ...quickServiceBtnStyle,
              ...(service.urgent ? urgentServiceStyle : {}),
              ...(service.popular ? popularServiceStyle : {})
            }}
            title={service.name}
          >
            <span style={quickServiceIconStyle}>{service.icon}</span>
            {service.urgent && <span style={urgentBadgeStyle}>!</span>}
            {service.popular && <span style={popularBadgeStyle}>★</span>}
          </Link>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div style={floatingActionsStyle}>
        <Link href="/emergency" style={emergencyBtnStyle} title="Emergency Service">
          <span style={emergencyIconStyle}>🚨</span>
          <span style={emergencyTextStyle}>Emergency</span>
        </Link>
        <Link href="/services" style={findServiceBtnStyle} title="Find Services">
          <span style={findServiceIconStyle}>🔍</span>
        </Link>
      </div>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>
                <span style={footerLogoStyle}>🏠</span>
                HandyFix Customer
              </h4>
              <p style={footerTextStyle}>Your trusted partner for home services</p>
              <div style={socialLinksStyle}>
                <a href="#" style={socialLinkStyle}>📘</a>
                <a href="#" style={socialLinkStyle}>📷</a>
                <a href="#" style={socialLinkStyle}>🐦</a>
                <a href="#" style={socialLinkStyle}>💼</a>
              </div>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Quick Actions</h4>
              <ul style={footerListStyle}>
                <li><Link href="/services" style={footerLinkStyle}>🔍 Book Service</Link></li>
                <li><Link href="/bookings" style={footerLinkStyle}>📋 My Bookings</Link></li>
                <li><Link href="/emergency" style={footerLinkStyle}>🚨 Emergency</Link></li>
                <li><Link href="/rewards" style={footerLinkStyle}>🎁 Rewards</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Customer Support</h4>
              <ul style={footerListStyle}>
                <li><a href="tel:+911234567890" style={footerLinkStyle}>📞 +91 12345 67890</a></li>
                <li><a href="https://wa.me/911234567890" style={footerLinkStyle}>💬 WhatsApp Support</a></li>
                <li><a href="mailto:support@handyfix.com" style={footerLinkStyle}>✉️ Email Support</a></li>
                <li><Link href="/help" style={footerLinkStyle}>❓ Help Center</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Download App</h4>
              <div style={appLinksStyle}>
                <a href="#" style={appLinkStyle}>
                  <span style={appIconStyle}>📱</span>
                  <div>
                    <div style={appStoreTextStyle}>Download on the</div>
                    <div style={appStoreNameStyle}>App Store</div>
                  </div>
                </a>
                <a href="#" style={appLinkStyle}>
                  <span style={appIconStyle}>🤖</span>
                  <div>
                    <div style={appStoreTextStyle}>Get it on</div>
                    <div style={appStoreNameStyle}>Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved. | Customer Portal</p>
            <div style={footerLinksStyle}>
              <Link href="/privacy" style={footerBottomLinkStyle}>Privacy Policy</Link>
              <Link href="/terms" style={footerBottomLinkStyle}>Terms of Service</Link>
              <Link href="/cookies" style={footerBottomLinkStyle}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// Enhanced Styles for Customer Experience
const headerStyle = {
  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 50%, #004085 100%)',
  boxShadow: '0 8px 32px rgba(0, 123, 255, 0.3)',
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
  animation: 'shimmer 3s infinite'
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
  minHeight: '80px'
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'white',
  fontWeight: '700',
  fontSize: '24px',
  transition: 'all 0.3s ease'
}

const logoIconStyle = {
  fontSize: '32px',
  animation: 'bounce 2s infinite'
}

const logoTextStyle = {
  background: 'linear-gradient(135deg, white, #e3f2fd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const customerBadgeStyle = {
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
  '@media (max-width: 768px)': {
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
  fontSize: '16px',
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

const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
}

const offlineIndicatorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(255, 193, 7, 0.2)',
  color: '#ffc107',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600'
}

const offlineIconStyle = {
  fontSize: '12px'
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
  width: '44px',
  height: '44px',
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

const statusDotStyle = {
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  width: '12px',
  height: '12px',
  background: '#00ff00',
  borderRadius: '50%',
  border: '2px solid white',
  animation: 'pulse 2s infinite'
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

const userLocationStyle = {
  fontSize: '10px',
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
  width: '280px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginTop: '12px',
  padding: '20px',
  animation: 'fadeInUp 0.3s ease-out'
}

const dropdownHeaderStyle = {
  display: 'flex',
  gap: '12px',
  marginBottom: '16px'
}

const profileAvatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
}

const profileImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}

const profileTextStyle = {
  color: 'white',
  fontWeight: '600',
  fontSize: '18px'
}

const profileNameStyle = {
  fontWeight: '600',
  fontSize: '16px',
  color: '#333',
  marginBottom: '4px'
}

const profileEmailStyle = {
  fontSize: '12px',
  color: '#666'
}

const dropdownDividerStyle = {
  height: '1px',
  background: 'rgba(0, 0, 0, 0.1)',
  margin: '12px 0'
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
  '@media (max-width: 768px)': {
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
  padding: '20px',
  animation: 'slideIn 0.3s ease-out'
}

const mobileUserInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px'
}

const mobileAvatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: '600'
}

const mobileUserNameStyle = {
  fontWeight: '600',
  color: '#333'
}

const mobileUserEmailStyle = {
  fontSize: '12px',
  color: '#666'
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
  color: '#007bff',
  fontWeight: '500',
  fontSize: '16px'
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

const mainStyle = {
  minHeight: 'calc(100vh - 200px)',
  paddingBottom: '100px'
}

const quickServicesStyle = {
  position: 'fixed',
  bottom: '100px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: 999
}

const quickServicesHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(0, 123, 255, 0.9)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '600',
  textAlign: 'center',
  animation: 'fadeInRight 0.5s ease-out'
}

const quickServicesIconStyle = {
  fontSize: '12px'
}

const quickServiceBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50%',
  textDecoration: 'none',
  color: '#007bff',
  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  border: '2px solid rgba(0, 123, 255, 0.1)',
  animation: 'fadeInRight 0.5s ease-out'
}

const quickServiceIconStyle = {
  fontSize: '20px'
}

const urgentServiceStyle = {
  background: 'rgba(220, 53, 69, 0.95)',
  color: 'white',
  animation: 'pulse 2s infinite'
}

const popularServiceStyle = {
  background: 'rgba(255, 193, 7, 0.95)',
  color: '#333',
  boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)'
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
  fontWeight: '700'
}

const popularBadgeStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  width: '16px',
  height: '16px',
  background: '#ffc107',
  color: '#333',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '10px',
  fontWeight: '700'
}

const floatingActionsStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  zIndex: 1000
}

const emergencyBtnStyle = {
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
  animation: 'pulse 2s infinite'
}

const emergencyIconStyle = {
  fontSize: '16px',
  animation: 'bounce 1s infinite'
}

const emergencyTextStyle = {
  fontWeight: '600'
}

const findServiceBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  color: 'white',
  borderRadius: '50%',
  textDecoration: 'none',
  boxShadow: '0 8px 25px rgba(0, 123, 255, 0.4)',
  transition: 'all 0.3s ease'
}

const findServiceIconStyle = {
  fontSize: '24px'
}

const footerStyle = {
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
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
  background: 'linear-gradient(135deg, #007bff, #00d4ff)',
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
  background: 'rgba(0, 123, 255, 0.1)',
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

const appLinksStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const appLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '12px 16px',
  borderRadius: '12px',
  textDecoration: 'none',
  color: 'white',
  transition: 'all 0.3s ease'
}

const appIconStyle = {
  fontSize: '24px'
}

const appStoreTextStyle = {
  fontSize: '10px',
  color: '#bdc3c7'
}

const appStoreNameStyle = {
  fontSize: '14px',
  fontWeight: '600'
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
