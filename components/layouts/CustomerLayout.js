import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import NotificationBell from '../NotificationBell'

export default function CustomerLayout({ children, title = 'HandyFix - Book Home Services' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, notifications } = useUser()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Book trusted home services instantly" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/" style={logoStyle}>
              🏠 HandyFix
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/services" style={navLinkStyle}>Find Services</Link>
              <Link href="/bookings" style={navLinkStyle}>My Bookings</Link>
              <Link href="/favorites" style={navLinkStyle}>Favorites</Link>
              <Link href="/support" style={navLinkStyle}>Support</Link>
            </div>

            <div style={userMenuStyle}>
              <NotificationBell notifications={notifications} />
              
              <div style={userInfoStyle}>
                <div style={avatarStyle}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div style={userDetailsStyle}>
                  <span style={userNameStyle}>{user?.name}</span>
                  <span style={userTypeStyle}>Customer</span>
                </div>
              </div>

              <div style={dropdownStyle}>
                <Link href="/dashboard/user" style={dropdownLinkStyle}>Dashboard</Link>
                <Link href="/profile" style={dropdownLinkStyle}>Profile Settings</Link>
                <Link href="/payment-methods" style={dropdownLinkStyle}>Payment Methods</Link>
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
              <Link href="/services" style={mobileNavLinkStyle}>Find Services</Link>
              <Link href="/bookings" style={mobileNavLinkStyle}>My Bookings</Link>
              <Link href="/favorites" style={mobileNavLinkStyle}>Favorites</Link>
              <Link href="/support" style={mobileNavLinkStyle}>Support</Link>
              <hr style={{margin: '16px 0', border: '1px solid #eee'}} />
              <Link href="/dashboard/user" style={mobileNavLinkStyle}>Dashboard</Link>
              <Link href="/profile" style={mobileNavLinkStyle}>Profile</Link>
              <button onClick={logout} style={mobileLogoutBtnStyle}>Logout</button>
            </div>
          )}
        </nav>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <div style={quickActionsStyle}>
        <Link href="/services" style={quickActionBtnStyle}>
          🔍 Find Services
        </Link>
        <Link href="/emergency" style={emergencyBtnStyle}>
          🚨 Emergency
        </Link>
      </div>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>🏠 HandyFix</h4>
              <p style={footerTextStyle}>Your trusted partner for home services</p>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Quick Links</h4>
              <ul style={footerListStyle}>
                <li><Link href="/services" style={footerLinkStyle}>Book Service</Link></li>
                <li><Link href="/bookings" style={footerLinkStyle}>My Bookings</Link></li>
                <li><Link href="/support" style={footerLinkStyle}>Customer Support</Link></li>
                <li><Link href="/app-download" style={footerLinkStyle}>Download App</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Emergency Support</h4>
              <ul style={footerListStyle}>
                <li><a href="tel:+911234567890" style={footerLinkStyle}>📞 +91 12345 67890</a></li>
                <li><a href="https://wa.me/911234567890" style={footerLinkStyle}>💬 WhatsApp Support</a></li>
                <li><Link href="/emergency" style={footerLinkStyle}>🚨 Emergency Services</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved. | Customer Portal</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Styles optimized for customer experience
const headerStyle = {
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  boxShadow: '0 4px 20px rgba(0,123,255,0.3)',
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
  gap: '16px',
  color: 'white'
}

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '16px'
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
  fontSize: '12px',
  opacity: '0.8'
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
  color: '#007bff',
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
  background: '#007bff',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: '600',
  boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
  transition: 'all 0.3s ease'
}

const emergencyBtnStyle = {
  background: '#dc3545',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: '600',
  boxShadow: '0 4px 15px rgba(220,53,69,0.3)',
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
