import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import NotificationBell from '../NotificationBell'

export default function ProviderLayout({ children, title = 'HandyFix - Provider Dashboard' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, notifications } = useUser()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Manage your services and grow your business" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/dashboard/provider" style={logoStyle}>
              🔧 HandyFix Pro
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/dashboard/provider" style={navLinkStyle}>Dashboard</Link>
              <Link href="/provider/bookings" style={navLinkStyle}>Bookings</Link>
              <Link href="/provider/earnings" style={navLinkStyle}>Earnings</Link>
              <Link href="/provider/schedule" style={navLinkStyle}>Schedule</Link>
              <Link href="/provider/profile" style={navLinkStyle}>My Profile</Link>
            </div>

            <div style={userMenuStyle}>
              <div style={statusIndicatorStyle}>
                <div style={onlineStatusStyle}></div>
                <span style={statusTextStyle}>Online</span>
              </div>

              <NotificationBell notifications={notifications} />
              
              <div style={userInfoStyle}>
                <div style={avatarStyle}>
                  {user?.name?.charAt(0) || 'P'}
                </div>
                <div style={userDetailsStyle}>
                  <span style={userNameStyle}>{user?.name}</span>
                  <span style={userTypeStyle}>Service Provider</span>
                  <span style={ratingStyle}>⭐ 4.8 (152 reviews)</span>
                </div>
              </div>

              <div style={dropdownStyle}>
                <Link href="/provider/profile" style={dropdownLinkStyle}>Profile Settings</Link>
                <Link href="/provider/services" style={dropdownLinkStyle}>Manage Services</Link>
                <Link href="/provider/availability" style={dropdownLinkStyle}>Set Availability</Link>
                <Link href="/provider/analytics" style={dropdownLinkStyle}>Analytics</Link>
                <hr style={{margin: '8px 0', border: '1px solid #eee'}} />
                <button onClick={logout} style={logoutBtnStyle}>Logout</button>
              </div>
            </div>

            <button 
              style={mobileMenuBtnStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>

          {isMenuOpen && (
            <div style={mobileMenuStyle}>
              <Link href="/dashboard/provider" style={mobileNavLinkStyle}>Dashboard</Link>
              <Link href="/provider/bookings" style={mobileNavLinkStyle}>Bookings</Link>
              <Link href="/provider/earnings" style={mobileNavLinkStyle}>Earnings</Link>
              <Link href="/provider/schedule" style={mobileNavLinkStyle}>Schedule</Link>
              <Link href="/provider/profile" style={mobileNavLinkStyle}>My Profile</Link>
              <hr style={{margin: '16px 0', border: '1px solid #eee'}} />
              <Link href="/provider/profile" style={mobileNavLinkStyle}>Settings</Link>
              <button onClick={logout} style={mobileLogoutBtnStyle}>Logout</button>
            </div>
          )}
        </nav>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <div style={quickActionsStyle}>
        <Link href="/provider/bookings" style={quickActionBtnStyle}>
          📋 New Bookings
        </Link>
        <button style={toggleStatusBtnStyle}>
          🟢 Go Offline
        </button>
      </div>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>🔧 HandyFix Pro</h4>
              <p style={footerTextStyle}>Grow your business with HandyFix</p>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Provider Resources</h4>
              <ul style={footerListStyle}>
                <li><Link href="/provider/help" style={footerLinkStyle}>Help Center</Link></li>
                <li><Link href="/provider/training" style={footerLinkStyle}>Training Materials</Link></li>
                <li><Link href="/provider/community" style={footerLinkStyle}>Provider Community</Link></li>
                <li><Link href="/provider/marketing" style={footerLinkStyle}>Marketing Tools</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Support</h4>
              <ul style={footerListStyle}>
                <li><a href="tel:+911234567891" style={footerLinkStyle}>📞 Provider Support</a></li>
                <li><a href="mailto:providers@handyfix.com" style={footerLinkStyle}>✉️ Email Support</a></li>
                <li><Link href="/provider/emergency" style={footerLinkStyle}>🚨 Emergency Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved. | Provider Portal</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Styles optimized for service provider experience
const headerStyle = {
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  boxShadow: '0 4px 20px rgba(40,167,69,0.3)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
}

const navStyle = {
  padding: '0'
}

const navContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px'
}

const logoStyle = {
  fontSize: '28px',
  fontWeight: '700',
  textDecoration: 'none',
  color: 'white'
}

const desktopMenuStyle = {
  display: 'flex',
  gap: '32px',
  '@media (maxWidth: 768px)': {
    display: 'none'
  }
}

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: '500',
  fontSize: '16px',
  padding: '8px 16px',
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  ':hover': {
    background: 'rgba(255,255,255,0.1)'
  }
}

const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  color: 'white'
}

const statusIndicatorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  background: 'rgba(255,255,255,0.1)',
  borderRadius: '20px',
  fontSize: '14px'
}

const onlineStatusStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#00ff00',
  animation: 'pulse 2s infinite'
}

const statusTextStyle = {
  fontSize: '12px',
  fontWeight: '600'
}

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const avatarStyle = {
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '18px',
  border: '2px solid rgba(255,255,255,0.3)'
}

const userDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
}

const userNameStyle = {
  fontWeight: '600',
  fontSize: '14px'
}

const userTypeStyle = {
  fontSize: '11px',
  opacity: '0.8'
}

const ratingStyle = {
  fontSize: '11px',
  opacity: '0.9',
  fontWeight: '500'
}

const dropdownStyle = {
  position: 'relative',
  display: 'none' // Will be shown on hover/click
}

const dropdownLinkStyle = {
  display: 'block',
  color: '#333',
  textDecoration: 'none',
  padding: '8px 16px'
}

const logoutBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#dc3545',
  padding: '8px 16px',
  cursor: 'pointer',
  textAlign: 'left',
  width: '100%'
}

const mobileMenuBtnStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: 'white',
  '@media (maxWidth: 768px)': {
    display: 'block'
  }
}

const mobileMenuStyle = {
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  padding: '20px',
  borderTop: '1px solid #eee'
}

const mobileNavLinkStyle = {
  padding: '12px 0',
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: '500'
}

const mobileLogoutBtnStyle = {
  ...logoutBtnStyle,
  padding: '12px 0',
  textAlign: 'left'
}

const mainStyle = {
  minHeight: 'calc(100vh - 200px)',
  paddingBottom: '80px' // Space for quick actions
}

const quickActionsStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  zIndex: 1000
}

const quickActionBtnStyle = {
  background: '#28a745',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: '600',
  boxShadow: '0 4px 15px rgba(40,167,69,0.3)',
  transition: 'all 0.3s ease'
}

const toggleStatusBtnStyle = {
  background: '#ffc107',
  color: '#333',
  padding: '12px 20px',
  borderRadius: '25px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(255,193,7,0.3)',
  transition: 'all 0.3s ease'
}

const footerStyle = {
  background: '#1a1a1a',
  color: 'white',
  marginTop: '60px'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '40px',
  padding: '60px 0 40px'
}

const footerSectionStyle = {}

const footerHeadingStyle = {
  marginBottom: '20px',
  fontSize: '18px',
  fontWeight: '600'
}

const footerTextStyle = {
  color: '#bdc3c7',
  lineHeight: '1.6'
}

const footerListStyle = {
  listStyle: 'none'
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  lineHeight: '2',
  transition: 'color 0.3s ease'
}

const footerBottomStyle = {
  borderTop: '1px solid #333',
  paddingTop: '30px',
  paddingBottom: '30px',
  textAlign: 'center',
  color: '#bdc3c7'
}
