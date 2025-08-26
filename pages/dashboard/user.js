import { useState } from 'react'
import CustomerLayout from '../../components/layouts/CustomerLayout'
import Link from 'next/link'
import { useUser } from '../../context/UserContext'

export default function UserDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('bookings')

  // Mock user data
  const user = {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    address: 'Flat 302, Sunflower Apartments, Andheri West, Mumbai - 400058',
    joinedDate: '2023-08-15',
    totalBookings: 12,
    completedBookings: 10,
    totalSpent: 8500
  }

  // Mock bookings data
  const bookings = [
    {
      id: 'BK001',
      providerName: 'Rajesh Kumar',
      service: 'Plumbing',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'Completed',
      amount: 750,
      rating: 5,
      hasReview: true,
      description: 'Kitchen pipe leak repair'
    },
    {
      id: 'BK002',
      providerName: 'Amit Sharma',
      service: 'Electrical',
      date: '2024-01-25',
      time: '10:00 AM',
      status: 'Confirmed',
      amount: 500,
      rating: null,
      hasReview: false,
      description: 'Ceiling fan installation'
    },
    {
      id: 'BK003',
      providerName: 'Sneha Patel',
      service: 'Cleaning',
      date: '2024-01-28',
      time: '9:00 AM',
      status: 'Pending',
      amount: 400,
      rating: null,
      hasReview: false,
      description: 'Deep cleaning service'
    }
  ]

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    }
    
    switch(status) {
      case 'Completed':
        return { ...baseStyle, background: '#d4edda', color: '#155724' }
      case 'Confirmed':
        return { ...baseStyle, background: '#d1ecf1', color: '#0c5460' }
      case 'Pending':
        return { ...baseStyle, background: '#fff3cd', color: '#856404' }
      case 'Cancelled':
        return { ...baseStyle, background: '#f8d7da', color: '#721c24' }
      default:
        return baseStyle
    }
  }

  const renderStars = (rating) => {
    if (!rating) return null
    return '⭐'.repeat(rating)
  }

  const renderBookings = () => (
    <div>
      <div style={sectionHeaderStyle}>
        <h2>My Bookings</h2>
        <Link href="/services" className="btn btn-primary">
          Book New Service
        </Link>
      </div>
      
      <div style={bookingsListStyle}>
        {bookings.map(booking => (
          <div key={booking.id} className="card" style={bookingCardStyle}>
            <div style={bookingHeaderStyle}>
              <div style={bookingInfoStyle}>
                <h3 style={providerNameStyle}>{booking.providerName}</h3>
                <p style={serviceTypeStyle}>{booking.service}</p>
                <p style={bookingIdStyle}>Booking ID: {booking.id}</p>
              </div>
              <div style={bookingStatusStyle}>
                <span style={getStatusStyle(booking.status)}>
                  {booking.status}
                </span>
              </div>
            </div>

            <div style={bookingDetailsStyle}>
              <div style={detailRowStyle}>
                <span style={labelStyle}>Description:</span>
                <span>{booking.description}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>Date & Time:</span>
                <span>{booking.date} at {booking.time}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>Amount:</span>
                <span style={amountStyle}>₹{booking.amount}</span>
              </div>
              {booking.rating && (
                <div style={detailRowStyle}>
                  <span style={labelStyle}>Your Rating:</span>
                  <span>{renderStars(booking.rating)}</span>
                </div>
              )}
            </div>

            <div style={bookingActionsStyle}>
              {booking.status === 'Pending' && (
                <button className="btn btn-secondary" style={actionBtnStyle}>
                  Cancel Booking
                </button>
              )}
              {booking.status === 'Confirmed' && (
                <button className="btn btn-outline" style={actionBtnStyle}>
                  Contact Provider
                </button>
              )}
              {booking.status === 'Completed' && !booking.hasReview && (
                <button className="btn btn-primary" style={actionBtnStyle}>
                  Leave Review
                </button>
              )}
              <button className="btn btn-outline" style={actionBtnStyle}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div>
      <h2 style={sectionTitleStyle}>Profile Information</h2>
      
      <div className="card" style={profileCardStyle}>
        <div style={profileHeaderStyle}>
          <div style={avatarStyle}>
            {user.name.charAt(0)}
          </div>
          <div style={profileInfoStyle}>
            <h3 style={profileNameStyle}>{user.name}</h3>
            <p style={profileJoinedStyle}>Member since {new Date(user.joinedDate).toLocaleDateString()}</p>
          </div>
          <button className="btn btn-outline">
            Edit Profile
          </button>
        </div>

        <div style={profileDetailsStyle}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={user.name} 
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={user.email} 
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-input" 
                value={user.phone} 
                readOnly 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-input" 
                value={user.city} 
                readOnly 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea 
              className="form-input" 
              value={user.address} 
              readOnly 
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="card" style={statsCardStyle}>
        <h3 style={statsHeadingStyle}>Account Statistics</h3>
        <div className="grid grid-3">
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{user.totalBookings}</div>
            <div style={statLabelStyle}>Total Bookings</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>{user.completedBookings}</div>
            <div style={statLabelStyle}>Completed Services</div>
          </div>
          <div style={statItemStyle}>
            <div style={statNumberStyle}>₹{user.totalSpent.toLocaleString()}</div>
            <div style={statLabelStyle}>Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div>
      <h2 style={sectionTitleStyle}>Settings</h2>
      
      <div className="card" style={settingsCardStyle}>
        <h3 style={settingsHeadingStyle}>Notification Preferences</h3>
        <div style={settingsListStyle}>
          <div style={settingItemStyle}>
            <div>
              <div style={settingTitleStyle}>Email Notifications</div>
              <div style={settingDescStyle}>Receive booking confirmations and updates via email</div>
            </div>
            <label style={switchStyle}>
              <input type="checkbox" defaultChecked />
              <span style={sliderStyle}></span>
            </label>
          </div>
          
          <div style={settingItemStyle}>
            <div>
              <div style={settingTitleStyle}>SMS Notifications</div>
              <div style={settingDescStyle}>Get SMS alerts for important updates</div>
            </div>
            <label style={switchStyle}>
              <input type="checkbox" defaultChecked />
              <span style={sliderStyle}></span>
            </label>
          </div>
          
          <div style={settingItemStyle}>
            <div>
              <div style={settingTitleStyle}>Marketing Communications</div>
              <div style={settingDescStyle}>Receive promotional offers and service recommendations</div>
            </div>
            <label style={switchStyle}>
              <input type="checkbox" />
              <span style={sliderStyle}></span>
            </label>
          </div>
        </div>
      </div>

      <div className="card" style={settingsCardStyle}>
        <h3 style={settingsHeadingStyle}>Privacy & Security</h3>
        <div style={actionsListStyle}>
          <button className="btn btn-outline" style={settingActionStyle}>
            Change Password
          </button>
          <button className="btn btn-outline" style={settingActionStyle}>
            Download My Data
          </button>
          <button className="btn btn-outline" style={settingActionStyle}>
            Privacy Settings
          </button>
          <button className="btn btn-secondary" style={settingActionStyle}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Layout title="User Dashboard - HandyFix">
      <div style={dashboardContainerStyle}>
        <div className="container">
          <div style={dashboardHeaderStyle}>
            <h1 style={dashboardTitleStyle}>Welcome back, {user.name.split(' ')[0]}!</h1>
            <p style={dashboardSubtitleStyle}>Manage your bookings and profile</p>
          </div>

          <div style={dashboardContentStyle}>
            <div style={sidebarStyle}>
              <nav style={navStyle}>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'bookings' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('bookings')}
                >
                  📋 My Bookings
                </button>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'profile' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('profile')}
                >
                  👤 Profile
                </button>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'settings' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('settings')}
                >
                  ⚙️ Settings
                </button>
              </nav>
            </div>

            <div style={mainContentStyle}>
              {activeTab === 'bookings' && renderBookings()}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const dashboardContainerStyle = {
  minHeight: '80vh',
  background: '#f8f9fa',
  padding: '40px 0'
}

const dashboardHeaderStyle = {
  textAlign: 'center',
  marginBottom: '40px'
}

const dashboardTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const dashboardSubtitleStyle = {
  fontSize: '18px',
  color: '#7f8c8d'
}

const dashboardContentStyle = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '40px'
}

const sidebarStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  height: 'fit-content',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const navItemStyle = {
  padding: '16px 20px',
  background: 'transparent',
  border: 'none',
  borderRadius: '8px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  color: '#555',
  transition: 'all 0.3s ease'
}

const activeNavItemStyle = {
  background: '#007bff',
  color: 'white'
}

const mainContentStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const sectionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px'
}

const sectionTitleStyle = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '24px'
}

const bookingsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

const bookingCardStyle = {
  marginBottom: '0'
}

const bookingHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px'
}

const bookingInfoStyle = {
  flex: '1'
}

const providerNameStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const serviceTypeStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const bookingIdStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const bookingStatusStyle = {}

const bookingDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px'
}

const detailRowStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

const labelStyle = {
  fontWeight: '500',
  color: '#555'
}

const amountStyle = {
  fontWeight: '600',
  color: '#007bff'
}

const bookingActionsStyle = {
  display: 'flex',
  gap: '12px',
  paddingTop: '16px',
  borderTop: '1px solid #eee',
  flexWrap: 'wrap'
}

const actionBtnStyle = {
  padding: '8px 16px',
  fontSize: '14px'
}

const profileCardStyle = {
  marginBottom: '24px'
}

const profileHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '24px',
  paddingBottom: '20px',
  borderBottom: '1px solid #eee'
}

const avatarStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  fontWeight: '700'
}

const profileInfoStyle = {
  flex: '1'
}

const profileNameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const profileJoinedStyle = {
  color: '#7f8c8d'
}

const profileDetailsStyle = {}

const statsCardStyle = {
  marginBottom: '0'
}

const statsHeadingStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#2c3e50'
}

const statItemStyle = {
  textAlign: 'center',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const statNumberStyle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#007bff',
  marginBottom: '8px'
}

const statLabelStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const settingsCardStyle = {
  marginBottom: '24px'
}

const settingsHeadingStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#2c3e50'
}

const settingsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

const settingItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
  borderBottom: '1px solid #eee'
}

const settingTitleStyle = {
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '4px'
}

const settingDescStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const switchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '60px',
  height: '34px'
}

const sliderStyle = {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#ccc',
  transition: '0.4s',
  borderRadius: '34px'
}

const actionsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const settingActionStyle = {
  width: 'fit-content'
}
