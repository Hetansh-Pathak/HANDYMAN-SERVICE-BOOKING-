import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import NotificationBell from '../NotificationBell'

export default function AdminLayout({ children, title = 'HandyFix - Admin Portal' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { user, logout, notifications } = useUser()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Admin portal for HandyFix platform management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={layoutStyle}>
        <aside style={{
          ...sidebarStyle,
          ...(isSidebarCollapsed ? collapsedSidebarStyle : {})
        }}>
          <div style={sidebarHeaderStyle}>
            <h2 style={sidebarTitleStyle}>
              {isSidebarCollapsed ? '⚙️' : '⚙️ Admin Portal'}
            </h2>
            <button 
              style={toggleBtnStyle}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          <nav style={sidebarNavStyle}>
            <Link href="/admin/dashboard" style={sidebarLinkStyle}>
              📊 {!isSidebarCollapsed && 'Dashboard'}
            </Link>
            <Link href="/admin/users" style={sidebarLinkStyle}>
              👥 {!isSidebarCollapsed && 'Users'}
            </Link>
            <Link href="/admin/providers" style={sidebarLinkStyle}>
              🔧 {!isSidebarCollapsed && 'Providers'}
            </Link>
            <Link href="/admin/bookings" style={sidebarLinkStyle}>
              📋 {!isSidebarCollapsed && 'Bookings'}
            </Link>
            <Link href="/admin/payments" style={sidebarLinkStyle}>
              💰 {!isSidebarCollapsed && 'Payments'}
            </Link>
            <Link href="/admin/analytics" style={sidebarLinkStyle}>
              📈 {!isSidebarCollapsed && 'Analytics'}
            </Link>
            <Link href="/admin/settings" style={sidebarLinkStyle}>
              ⚙️ {!isSidebarCollapsed && 'Settings'}
            </Link>
          </nav>
        </aside>

        <div style={mainContentStyle}>
          <header style={headerStyle}>
            <div style={headerLeftStyle}>
              <button 
                style={mobileSidebarBtnStyle}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
              <h1 style={pageTitleStyle}>Admin Dashboard</h1>
            </div>

            <div style={headerRightStyle}>
              <div style={quickStatsStyle}>
                <div style={quickStatStyle}>
                  <span style={statLabelStyle}>Active Users</span>
                  <span style={statValueStyle}>1,247</span>
                </div>
                <div style={quickStatStyle}>
                  <span style={statLabelStyle}>Pending</span>
                  <span style={statValueStyle}>23</span>
                </div>
              </div>

              <NotificationBell notifications={notifications} />
              
              <div style={userMenuStyle}>
                <div style={avatarStyle}>
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div style={userDetailsStyle}>
                  <span style={userNameStyle}>{user?.name}</span>
                  <span style={userTypeStyle}>Administrator</span>
                </div>
                <button onClick={logout} style={logoutBtnStyle}>
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main style={mainStyle}>
            {children}
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        {isMenuOpen && (
          <div style={overlayStyle} onClick={() => setIsMenuOpen(false)}>
            <div style={mobileSidebarStyle} onClick={(e) => e.stopPropagation()}>
              <div style={mobileSidebarHeaderStyle}>
                <h2>Admin Portal</h2>
                <button onClick={() => setIsMenuOpen(false)}>✕</button>
              </div>
              <nav style={mobileSidebarNavStyle}>
                <Link href="/admin/dashboard" style={mobileSidebarLinkStyle}>📊 Dashboard</Link>
                <Link href="/admin/users" style={mobileSidebarLinkStyle}>👥 Users</Link>
                <Link href="/admin/providers" style={mobileSidebarLinkStyle}>🔧 Providers</Link>
                <Link href="/admin/bookings" style={mobileSidebarLinkStyle}>📋 Bookings</Link>
                <Link href="/admin/payments" style={mobileSidebarLinkStyle}>💰 Payments</Link>
                <Link href="/admin/analytics" style={mobileSidebarLinkStyle}>📈 Analytics</Link>
                <Link href="/admin/settings" style={mobileSidebarLinkStyle}>⚙️ Settings</Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// Admin-specific dark theme styles
const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
  background: '#f5f5f5'
}

const sidebarStyle = {
  width: '280px',
  background: '#2c3e50',
  color: 'white',
  transition: 'width 0.3s ease',
  position: 'fixed',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 1000,
  overflowY: 'auto'
}

const collapsedSidebarStyle = {
  width: '80px'
}

const sidebarHeaderStyle = {
  padding: '20px',
  borderBottom: '1px solid #34495e',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const sidebarTitleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '600'
}

const toggleBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '4px'
}

const sidebarNavStyle = {
  padding: '20px 0'
}

const sidebarLinkStyle = {
  display: 'block',
  color: 'white',
  textDecoration: 'none',
  padding: '16px 20px',
  fontSize: '16px',
  transition: 'background 0.3s ease',
  borderLeft: '4px solid transparent'
}

const mainContentStyle = {
  flex: 1,
  marginLeft: '280px',
  transition: 'margin-left 0.3s ease'
}

const headerStyle = {
  background: 'white',
  padding: '16px 32px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #eee'
}

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
}

const mobileSidebarBtnStyle = {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  '@media (maxWidth: 768px)': {
    display: 'block'
  }
}

const pageTitleStyle = {
  margin: 0,
  fontSize: '24px',
  fontWeight: '600',
  color: '#2c3e50'
}

const headerRightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px'
}

const quickStatsStyle = {
  display: 'flex',
  gap: '20px'
}

const quickStatStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px 16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  minWidth: '80px'
}

const statLabelStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  marginBottom: '4px'
}

const statValueStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#2c3e50'
}

const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: '#e74c3c',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: '16px'
}

const userDetailsStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const userNameStyle = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#2c3e50'
}

const userTypeStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const logoutBtnStyle = {
  background: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
}

const mainStyle = {
  padding: '32px',
  minHeight: 'calc(100vh - 80px)'
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 2000,
  display: 'none',
  '@media (maxWidth: 768px)': {
    display: 'block'
  }
}

const mobileSidebarStyle = {
  width: '280px',
  height: '100vh',
  background: '#2c3e50',
  color: 'white'
}

const mobileSidebarHeaderStyle = {
  padding: '20px',
  borderBottom: '1px solid #34495e',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const mobileSidebarNavStyle = {
  padding: '20px 0'
}

const mobileSidebarLinkStyle = {
  display: 'block',
  color: 'white',
  textDecoration: 'none',
  padding: '16px 20px',
  fontSize: '16px'
}
