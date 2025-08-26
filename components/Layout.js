import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children, title = 'Handyman Service Booking' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find trusted plumbers, carpenters & electricians in your city" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={headerStyle}>
        <nav style={navStyle}>
          <div className="container" style={navContainerStyle}>
            <Link href="/" style={logoStyle}>
              🔧 HandyFix
            </Link>
            
            <div style={desktopMenuStyle}>
              <Link href="/" style={navLinkStyle}>Home</Link>
              <Link href="/services" style={navLinkStyle}>Services</Link>
              <Link href="/providers" style={navLinkStyle}>Find Providers</Link>
              <Link href="/about" style={navLinkStyle}>About</Link>
              <Link href="/contact" style={navLinkStyle}>Contact</Link>
            </div>

            <div style={authLinksStyle}>
              <Link href="/auth/login" className="btn btn-outline" style={loginBtnStyle}>Login</Link>
              <Link href="/auth/register" className="btn btn-primary">Sign Up</Link>
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
              <Link href="/" style={mobileNavLinkStyle}>Home</Link>
              <Link href="/services" style={mobileNavLinkStyle}>Services</Link>
              <Link href="/providers" style={mobileNavLinkStyle}>Find Providers</Link>
              <Link href="/about" style={mobileNavLinkStyle}>About</Link>
              <Link href="/contact" style={mobileNavLinkStyle}>Contact</Link>
              <hr style={{margin: '16px 0', border: '1px solid #eee'}} />
              <Link href="/auth/login" style={mobileNavLinkStyle}>Login</Link>
              <Link href="/auth/register" style={mobileNavLinkStyle}>Sign Up</Link>
            </div>
          )}
        </nav>
      </header>

      <main style={mainStyle}>
        {children}
      </main>

      <footer style={footerStyle}>
        <div className="container">
          <div style={footerContentStyle}>
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>🔧 HandyFix</h4>
              <p style={footerTextStyle}>Connect with trusted local service providers for all your home and office needs.</p>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Services</h4>
              <ul style={footerListStyle}>
                <li><Link href="/services/plumbing" style={footerLinkStyle}>Plumbing</Link></li>
                <li><Link href="/services/electrical" style={footerLinkStyle}>Electrical</Link></li>
                <li><Link href="/services/carpentry" style={footerLinkStyle}>Carpentry</Link></li>
                <li><Link href="/services/ac-repair" style={footerLinkStyle}>AC Repair</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Company</h4>
              <ul style={footerListStyle}>
                <li><Link href="/about" style={footerLinkStyle}>About Us</Link></li>
                <li><Link href="/contact" style={footerLinkStyle}>Contact</Link></li>
                <li><Link href="/privacy" style={footerLinkStyle}>Privacy Policy</Link></li>
                <li><Link href="/terms" style={footerLinkStyle}>Terms of Service</Link></li>
              </ul>
            </div>
            
            <div style={footerSectionStyle}>
              <h4 style={footerHeadingStyle}>Support</h4>
              <ul style={footerListStyle}>
                <li><Link href="/help" style={footerLinkStyle}>Help Center</Link></li>
                <li><Link href="/contact" style={footerLinkStyle}>Customer Support</Link></li>
                <li><a href="tel:+911234567890" style={footerLinkStyle}>📞 +91 12345 67890</a></li>
                <li><a href="mailto:support@handyfix.com" style={footerLinkStyle}>✉️ support@handyfix.com</a></li>
              </ul>
            </div>
          </div>
          
          <div style={footerBottomStyle}>
            <p>&copy; 2024 HandyFix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

const headerStyle = {
  background: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
  fontSize: '24px',
  fontWeight: '700',
  textDecoration: 'none',
  color: '#007bff'
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
  color: '#555',
  fontWeight: '500',
  transition: 'color 0.3s ease'
}

const authLinksStyle = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center'
}

const loginBtnStyle = {
  marginRight: '8px'
}

const mobileMenuBtnStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
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
  color: '#555',
  fontWeight: '500'
}

const mainStyle = {
  minHeight: 'calc(100vh - 200px)'
}

const footerStyle = {
  background: '#2c3e50',
  color: 'white',
  marginTop: '80px'
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
  borderTop: '1px solid #34495e',
  paddingTop: '30px',
  paddingBottom: '30px',
  textAlign: 'center',
  color: '#bdc3c7'
}
