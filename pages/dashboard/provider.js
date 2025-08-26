import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isOnline, setIsOnline] = useState(true)

  // Mock provider data
  const provider = {
    name: 'Rajesh Kumar',
    service: 'Plumbing',
    city: 'Mumbai',
    rating: 4.8,
    totalReviews: 152,
    completedJobs: 89,
    totalEarnings: 125000,
    thisMonthEarnings: 15000,
    joinedDate: '2023-06-10',
    verified: true,
    profileCompletion: 90
  }

  // Mock bookings data
  const bookings = [
    {
      id: 'BK001',
      customerName: 'Priya Sharma',
      service: 'Kitchen pipe leak repair',
      date: '2024-01-25',
      time: '2:00 PM',
      status: 'Pending',
      amount: 750,
      address: 'Andheri West, Mumbai',
      phone: '+91 98765 43210'
    },
    {
      id: 'BK002',
      customerName: 'Amit Patel',
      service: 'Bathroom tap installation',
      date: '2024-01-24',
      time: '10:00 AM',
      status: 'Confirmed',
      amount: 500,
      address: 'Bandra East, Mumbai',
      phone: '+91 98765 43211'
    },
    {
      id: 'BK003',
      customerName: 'Sunita Singh',
      service: 'Water heater repair',
      date: '2024-01-23',
      time: '3:00 PM',
      status: 'Completed',
      amount: 800,
      address: 'Juhu, Mumbai',
      phone: '+91 98765 43212',
      rating: 5,
      review: 'Excellent work! Very professional and quick.'
    }
  ]

  const monthlyStats = [
    { month: 'Jan', earnings: 15000, jobs: 12 },
    { month: 'Dec', earnings: 12000, jobs: 10 },
    { month: 'Nov', earnings: 18000, jobs: 15 },
    { month: 'Oct', earnings: 14000, jobs: 11 }
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

  const renderOverview = () => (
    <div>
      <div style={overviewHeaderStyle}>
        <div style={statusCardStyle}>
          <div style={statusInfoStyle}>
            <h3>Account Status</h3>
            <div style={statusItemStyle}>
              <span>Online Status:</span>
              <label style={switchStyle}>
                <input 
                  type="checkbox" 
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                />
                <span style={sliderStyle}></span>
              </label>
              <span style={isOnline ? onlineTextStyle : offlineTextStyle}>
                {isOnline ? 'Available' : 'Offline'}
              </span>
            </div>
            <div style={statusItemStyle}>
              <span>Verification:</span>
              <span style={verifiedStyle}>✓ Verified</span>
            </div>
            <div style={statusItemStyle}>
              <span>Profile Completion:</span>
              <span style={completionStyle}>{provider.profileCompletion}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-3" style={statsGridStyle}>
          <div className="card" style={statCardStyle}>
            <div style={statIconStyle}>💰</div>
            <div style={statValueStyle}>₹{provider.thisMonthEarnings.toLocaleString()}</div>
            <div style={statLabelStyle}>This Month</div>
          </div>
          
          <div className="card" style={statCardStyle}>
            <div style={statIconStyle}>⭐</div>
            <div style={statValueStyle}>{provider.rating}</div>
            <div style={statLabelStyle}>Average Rating</div>
          </div>
          
          <div className="card" style={statCardStyle}>
            <div style={statIconStyle}>✅</div>
            <div style={statValueStyle}>{provider.completedJobs}</div>
            <div style={statLabelStyle}>Completed Jobs</div>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={chartsGridStyle}>
        <div className="card">
          <h3 style={chartTitleStyle}>Monthly Performance</h3>
          <div style={chartStyle}>
            {monthlyStats.map(stat => (
              <div key={stat.month} style={chartBarStyle}>
                <div style={barStyle} data-height={stat.earnings / 200}></div>
                <div style={barLabelStyle}>{stat.month}</div>
                <div style={barValueStyle}>₹{stat.earnings / 1000}k</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={chartTitleStyle}>Recent Activity</h3>
          <div style={activityListStyle}>
            <div style={activityItemStyle}>
              <div style={activityIconStyle}>✅</div>
              <div>
                <div style={activityTitleStyle}>Job Completed</div>
                <div style={activityDescStyle}>Water heater repair for Sunita Singh</div>
                <div style={activityTimeStyle}>2 hours ago</div>
              </div>
            </div>
            <div style={activityItemStyle}>
              <div style={activityIconStyle}>⭐</div>
              <div>
                <div style={activityTitleStyle}>New Review</div>
                <div style={activityDescStyle}>5-star rating from Amit Patel</div>
                <div style={activityTimeStyle}>1 day ago</div>
              </div>
            </div>
            <div style={activityItemStyle}>
              <div style={activityIconStyle}>💰</div>
              <div>
                <div style={activityTitleStyle}>Payment Received</div>
                <div style={activityDescStyle}>₹750 for plumbing service</div>
                <div style={activityTimeStyle}>2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div>
      <div style={sectionHeaderStyle}>
        <h2>Booking Requests</h2>
        <div style={bookingFiltersStyle}>
          <select style={filterSelectStyle}>
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      
      <div style={bookingsListStyle}>
        {bookings.map(booking => (
          <div key={booking.id} className="card" style={bookingCardStyle}>
            <div style={bookingHeaderStyle}>
              <div style={bookingInfoStyle}>
                <h3 style={customerNameStyle}>{booking.customerName}</h3>
                <p style={serviceDescStyle}>{booking.service}</p>
                <p style={bookingIdStyle}>ID: {booking.id}</p>
              </div>
              <div style={bookingStatusStyle}>
                <span style={getStatusStyle(booking.status)}>
                  {booking.status}
                </span>
                <div style={amountDisplayStyle}>₹{booking.amount}</div>
              </div>
            </div>

            <div style={bookingDetailsStyle}>
              <div style={detailRowStyle}>
                <span style={labelStyle}>📅 Date & Time:</span>
                <span>{booking.date} at {booking.time}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>📍 Address:</span>
                <span>{booking.address}</span>
              </div>
              <div style={detailRowStyle}>
                <span style={labelStyle}>📞 Contact:</span>
                <a href={`tel:${booking.phone}`} style={phoneStyle}>{booking.phone}</a>
              </div>
              {booking.rating && (
                <div style={detailRowStyle}>
                  <span style={labelStyle}>⭐ Rating:</span>
                  <span>{renderStars(booking.rating)}</span>
                </div>
              )}
              {booking.review && (
                <div style={reviewStyle}>
                  <span style={labelStyle}>💬 Review:</span>
                  <span>"{booking.review}"</span>
                </div>
              )}
            </div>

            <div style={bookingActionsStyle}>
              {booking.status === 'Pending' && (
                <>
                  <button className="btn btn-primary" style={actionBtnStyle}>
                    Accept
                  </button>
                  <button className="btn btn-secondary" style={actionBtnStyle}>
                    Decline
                  </button>
                </>
              )}
              {booking.status === 'Confirmed' && (
                <>
                  <button className="btn btn-primary" style={actionBtnStyle}>
                    Mark Complete
                  </button>
                  <button className="btn btn-outline" style={actionBtnStyle}>
                    Contact Customer
                  </button>
                </>
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

  const renderEarnings = () => (
    <div>
      <h2 style={sectionTitleStyle}>Earnings Overview</h2>
      
      <div className="grid grid-3" style={earningsStatsStyle}>
        <div className="card text-center">
          <div style={earningsIconStyle}>💰</div>
          <div style={earningsValueStyle}>₹{provider.totalEarnings.toLocaleString()}</div>
          <div style={earningsLabelStyle}>Total Earnings</div>
        </div>
        
        <div className="card text-center">
          <div style={earningsIconStyle}>📅</div>
          <div style={earningsValueStyle}>₹{provider.thisMonthEarnings.toLocaleString()}</div>
          <div style={earningsLabelStyle}>This Month</div>
        </div>
        
        <div className="card text-center">
          <div style={earningsIconStyle}>📊</div>
          <div style={earningsValueStyle}>₹{Math.round(provider.totalEarnings / provider.completedJobs).toLocaleString()}</div>
          <div style={earningsLabelStyle}>Average per Job</div>
        </div>
      </div>

      <div className="card" style={earningsHistoryStyle}>
        <h3 style={historyTitleStyle}>Payment History</h3>
        <div style={historyTableStyle}>
          <div style={tableHeaderStyle}>
            <span>Date</span>
            <span>Customer</span>
            <span>Service</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {bookings.filter(b => b.status === 'Completed').map(booking => (
            <div key={booking.id} style={tableRowStyle}>
              <span>{booking.date}</span>
              <span>{booking.customerName}</span>
              <span>{booking.service}</span>
              <span style={amountCellStyle}>₹{booking.amount}</span>
              <span style={paidStatusStyle}>✅ Paid</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div>
      <h2 style={sectionTitleStyle}>Profile Management</h2>
      
      <div className="card" style={profileCardStyle}>
        <div style={profileHeaderStyle}>
          <div style={avatarStyle}>
            {provider.name.charAt(0)}
          </div>
          <div style={profileInfoStyle}>
            <h3 style={profileNameStyle}>{provider.name}</h3>
            <p style={profileServiceStyle}>{provider.service} Specialist</p>
            <p style={profileLocationStyle}>📍 {provider.city}</p>
          </div>
          <button className="btn btn-primary">
            Edit Profile
          </button>
        </div>

        <div style={profileStatsStyle}>
          <div style={profileStatStyle}>
            <span style={statNumberStyle}>{provider.rating}</span>
            <span style={statTextStyle}>Rating</span>
          </div>
          <div style={profileStatStyle}>
            <span style={statNumberStyle}>{provider.totalReviews}</span>
            <span style={statTextStyle}>Reviews</span>
          </div>
          <div style={profileStatStyle}>
            <span style={statNumberStyle}>{provider.completedJobs}</span>
            <span style={statTextStyle}>Jobs Done</span>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Services & Pricing</h3>
          <div style={serviceListStyle}>
            <div style={serviceItemStyle}>
              <span>Basic Pipe Repair</span>
              <span>₹500</span>
            </div>
            <div style={serviceItemStyle}>
              <span>Tap Installation</span>
              <span>₹300</span>
            </div>
            <div style={serviceItemStyle}>
              <span>Emergency Call-out</span>
              <span>₹1000</span>
            </div>
          </div>
          <button className="btn btn-outline" style={{marginTop: '16px'}}>
            Update Pricing
          </button>
        </div>

        <div className="card">
          <h3>Availability</h3>
          <div style={availabilityStyle}>
            <div style={dayItemStyle}>
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div style={dayItemStyle}>
              <span>Saturday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div style={dayItemStyle}>
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
          <button className="btn btn-outline" style={{marginTop: '16px'}}>
            Update Schedule
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Layout title="Provider Dashboard - HandyFix">
      <div style={dashboardContainerStyle}>
        <div className="container">
          <div style={dashboardHeaderStyle}>
            <h1 style={dashboardTitleStyle}>Provider Dashboard</h1>
            <p style={dashboardSubtitleStyle}>Manage your services and bookings</p>
          </div>

          <div style={dashboardContentStyle}>
            <div style={sidebarStyle}>
              <nav style={navStyle}>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'overview' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('overview')}
                >
                  📊 Overview
                </button>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'bookings' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('bookings')}
                >
                  📋 Bookings
                </button>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'earnings' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('earnings')}
                >
                  💰 Earnings
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
              </nav>
            </div>

            <div style={mainContentStyle}>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'bookings' && renderBookings()}
              {activeTab === 'earnings' && renderEarnings()}
              {activeTab === 'profile' && renderProfile()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles (continuing with unique styles for provider dashboard)
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

const overviewHeaderStyle = {
  marginBottom: '32px'
}

const statusCardStyle = {
  background: 'white',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '24px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const statusInfoStyle = {}

const statusItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '12px'
}

const switchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '24px'
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
  borderRadius: '24px'
}

const onlineTextStyle = {
  color: '#28a745',
  fontWeight: '600'
}

const offlineTextStyle = {
  color: '#dc3545',
  fontWeight: '600'
}

const verifiedStyle = {
  color: '#28a745',
  fontWeight: '600'
}

const completionStyle = {
  color: '#007bff',
  fontWeight: '600'
}

const statsGridStyle = {
  gap: '20px'
}

const statCardStyle = {
  textAlign: 'center',
  padding: '24px'
}

const statIconStyle = {
  fontSize: '32px',
  marginBottom: '12px'
}

const statValueStyle = {
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

const chartsGridStyle = {
  gap: '24px'
}

const chartTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#2c3e50'
}

const chartStyle = {
  display: 'flex',
  gap: '16px',
  alignItems: 'end',
  height: '200px',
  padding: '20px 0'
}

const chartBarStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
}

const barStyle = {
  width: '40px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '4px 4px 0 0',
  minHeight: '20px'
}

const barLabelStyle = {
  fontSize: '12px',
  fontWeight: '600'
}

const barValueStyle = {
  fontSize: '10px',
  color: '#7f8c8d'
}

const activityListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const activityItemStyle = {
  display: 'flex',
  gap: '12px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const activityIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px'
}

const activityTitleStyle = {
  fontWeight: '600',
  marginBottom: '4px'
}

const activityDescStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  marginBottom: '4px'
}

const activityTimeStyle = {
  fontSize: '12px',
  color: '#adb5bd'
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

const bookingFiltersStyle = {
  display: 'flex',
  gap: '12px'
}

const filterSelectStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px'
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

const customerNameStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const serviceDescStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const bookingIdStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const bookingStatusStyle = {
  textAlign: 'right'
}

const amountDisplayStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#007bff',
  marginTop: '8px'
}

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

const phoneStyle = {
  color: '#007bff',
  textDecoration: 'none'
}

const reviewStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
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

const earningsStatsStyle = {
  marginBottom: '32px'
}

const earningsIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const earningsValueStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#007bff',
  marginBottom: '8px'
}

const earningsLabelStyle = {
  fontSize: '16px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const earningsHistoryStyle = {
  marginTop: '24px'
}

const historyTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#2c3e50'
}

const historyTableStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const tableHeaderStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
  gap: '16px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px 8px 0 0',
  fontWeight: '600',
  fontSize: '14px',
  color: '#555'
}

const tableRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
  gap: '16px',
  padding: '16px',
  borderBottom: '1px solid #eee',
  fontSize: '14px'
}

const amountCellStyle = {
  fontWeight: '600',
  color: '#007bff'
}

const paidStatusStyle = {
  color: '#28a745',
  fontWeight: '600'
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

const profileServiceStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const profileLocationStyle = {
  color: '#7f8c8d'
}

const profileStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const profileStatStyle = {
  textAlign: 'center'
}

const statNumberStyle = {
  display: 'block',
  fontSize: '24px',
  fontWeight: '700',
  color: '#007bff'
}

const statTextStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const serviceListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '16px'
}

const serviceItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 16px',
  background: '#f8f9fa',
  borderRadius: '6px'
}

const availabilityStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const dayItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0'
}
