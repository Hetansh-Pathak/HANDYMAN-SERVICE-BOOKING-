import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock admin data
  const adminStats = {
    totalUsers: 1250,
    totalProviders: 89,
    pendingProviders: 12,
    totalBookings: 2840,
    completedBookings: 2456,
    totalRevenue: 284000,
    monthlyRevenue: 45000,
    commission: 28400
  }

  const recentBookings = [
    {
      id: 'BK001',
      customer: 'Priya Sharma',
      provider: 'Rajesh Kumar',
      service: 'Plumbing',
      amount: 750,
      status: 'Completed',
      date: '2024-01-25',
      commission: 75
    },
    {
      id: 'BK002',
      customer: 'Amit Patel',
      provider: 'Sneha Singh',
      service: 'Cleaning',
      amount: 500,
      status: 'Confirmed',
      date: '2024-01-25',
      commission: 50
    },
    {
      id: 'BK003',
      customer: 'Sunita Singh',
      provider: 'Mohammed Ali',
      service: 'Carpentry',
      amount: 800,
      status: 'Pending',
      date: '2024-01-26',
      commission: 80
    }
  ]

  const pendingProviders = [
    {
      id: 1,
      name: 'Vikram Gupta',
      service: 'Electrical',
      city: 'Delhi',
      experience: 5,
      appliedDate: '2024-01-20',
      documentsSubmitted: true
    },
    {
      id: 2,
      name: 'Meera Joshi',
      service: 'Painting',
      city: 'Pune',
      experience: 3,
      appliedDate: '2024-01-22',
      documentsSubmitted: true
    },
    {
      id: 3,
      name: 'Rahul Shah',
      service: 'AC Repair',
      city: 'Ahmedabad',
      experience: 7,
      appliedDate: '2024-01-23',
      documentsSubmitted: false
    }
  ]

  const monthlyData = [
    { month: 'Jan', users: 150, providers: 12, bookings: 340, revenue: 45000 },
    { month: 'Dec', users: 120, providers: 8, bookings: 290, revenue: 38000 },
    { month: 'Nov', users: 180, providers: 15, bookings: 410, revenue: 52000 },
    { month: 'Oct', users: 130, providers: 10, bookings: 310, revenue: 42000 }
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

  const renderOverview = () => (
    <div>
      <div className="grid grid-4" style={statsGridStyle}>
        <div className="card text-center" style={statCardStyle}>
          <div style={statIconStyle}>👥</div>
          <div style={statValueStyle}>{adminStats.totalUsers.toLocaleString()}</div>
          <div style={statLabelStyle}>Total Users</div>
        </div>
        
        <div className="card text-center" style={statCardStyle}>
          <div style={statIconStyle}>🔧</div>
          <div style={statValueStyle}>{adminStats.totalProviders}</div>
          <div style={statLabelStyle}>Active Providers</div>
        </div>
        
        <div className="card text-center" style={statCardStyle}>
          <div style={statIconStyle}>📋</div>
          <div style={statValueStyle}>{adminStats.totalBookings.toLocaleString()}</div>
          <div style={statLabelStyle}>Total Bookings</div>
        </div>
        
        <div className="card text-center" style={statCardStyle}>
          <div style={statIconStyle}>💰</div>
          <div style={statValueStyle}>₹{adminStats.totalRevenue.toLocaleString()}</div>
          <div style={statLabelStyle}>Total Revenue</div>
        </div>
      </div>

      <div className="grid grid-2" style={chartsGridStyle}>
        <div className="card">
          <h3 style={chartTitleStyle}>Monthly Growth</h3>
          <div style={chartStyle}>
            {monthlyData.map(data => (
              <div key={data.month} style={chartBarContainerStyle}>
                <div style={chartBarStyle} data-height={data.bookings / 5}></div>
                <div style={barLabelStyle}>{data.month}</div>
                <div style={barValueStyle}>{data.bookings}</div>
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
                <div style={activityTitleStyle}>New Provider Approved</div>
                <div style={activityDescStyle}>Rajesh Kumar - Plumbing Specialist</div>
                <div style={activityTimeStyle}>2 hours ago</div>
              </div>
            </div>
            <div style={activityItemStyle}>
              <div style={activityIconStyle}>💰</div>
              <div>
                <div style={activityTitleStyle}>Payment Processed</div>
                <div style={activityDescStyle}>₹750 commission received</div>
                <div style={activityTimeStyle}>4 hours ago</div>
              </div>
            </div>
            <div style={activityItemStyle}>
              <div style={activityIconStyle}>👤</div>
              <div>
                <div style={activityTitleStyle}>New User Registration</div>
                <div style={activityDescStyle}>25 new users joined today</div>
                <div style={activityTimeStyle}>6 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={chartTitleStyle}>Revenue Overview</h3>
        <div className="grid grid-3" style={revenueGridStyle}>
          <div style={revenueItemStyle}>
            <div style={revenueValueStyle}>₹{adminStats.monthlyRevenue.toLocaleString()}</div>
            <div style={revenueLabelStyle}>This Month's Revenue</div>
          </div>
          <div style={revenueItemStyle}>
            <div style={revenueValueStyle}>₹{adminStats.commission.toLocaleString()}</div>
            <div style={revenueLabelStyle}>Commission Earned</div>
          </div>
          <div style={revenueItemStyle}>
            <div style={revenueValueStyle}>{Math.round((adminStats.commission / adminStats.monthlyRevenue) * 100)}%</div>
            <div style={revenueLabelStyle}>Commission Rate</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBookings = () => (
    <div>
      <div style={sectionHeaderStyle}>
        <h2>Booking Management</h2>
        <div style={filtersStyle}>
          <select style={filterSelectStyle}>
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <select style={filterSelectStyle}>
            <option>All Services</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Cleaning</option>
          </select>
        </div>
      </div>

      <div style={bookingsTableStyle}>
        <div style={tableHeaderStyle}>
          <span>Booking ID</span>
          <span>Customer</span>
          <span>Provider</span>
          <span>Service</span>
          <span>Amount</span>
          <span>Commission</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        {recentBookings.map(booking => (
          <div key={booking.id} style={tableRowStyle}>
            <span style={bookingIdStyle}>{booking.id}</span>
            <span>{booking.customer}</span>
            <span>{booking.provider}</span>
            <span>{booking.service}</span>
            <span style={amountStyle}>₹{booking.amount}</span>
            <span style={commissionStyle}>₹{booking.commission}</span>
            <span>
              <span style={getStatusStyle(booking.status)}>{booking.status}</span>
            </span>
            <span>{booking.date}</span>
            <span>
              <button className="btn btn-outline" style={actionBtnStyle}>View</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProviders = () => (
    <div>
      <div style={sectionHeaderStyle}>
        <h2>Provider Management</h2>
        <div style={providerStatsStyle}>
          <span style={statBadgeStyle}>
            {adminStats.pendingProviders} Pending Approval
          </span>
        </div>
      </div>

      <div className="card" style={pendingProvidersStyle}>
        <h3>Pending Provider Applications</h3>
        <div style={providersListStyle}>
          {pendingProviders.map(provider => (
            <div key={provider.id} style={providerItemStyle}>
              <div style={providerInfoStyle}>
                <h4 style={providerNameStyle}>{provider.name}</h4>
                <p style={providerServiceStyle}>{provider.service} - {provider.city}</p>
                <p style={providerExperienceStyle}>{provider.experience} years experience</p>
                <p style={appliedDateStyle}>Applied: {provider.appliedDate}</p>
              </div>
              
              <div style={providerStatusStyle}>
                <div style={documentsStatusStyle}>
                  {provider.documentsSubmitted ? (
                    <span style={docsCompleteStyle}>✅ Documents Complete</span>
                  ) : (
                    <span style={docsIncompleteStyle}>❌ Documents Pending</span>
                  )}
                </div>
                
                <div style={providerActionsStyle}>
                  <button className="btn btn-outline" style={actionBtnStyle}>
                    View Profile
                  </button>
                  <button className="btn btn-primary" style={actionBtnStyle}>
                    Approve
                  </button>
                  <button className="btn btn-secondary" style={actionBtnStyle}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Provider Categories</h3>
        <div className="grid grid-3" style={categoriesGridStyle}>
          <div style={categoryItemStyle}>
            <div style={categoryIconStyle}>🔧</div>
            <div style={categoryNameStyle}>Plumbing</div>
            <div style={categoryCountStyle}>25 providers</div>
          </div>
          <div style={categoryItemStyle}>
            <div style={categoryIconStyle}>⚡</div>
            <div style={categoryNameStyle}>Electrical</div>
            <div style={categoryCountStyle}>18 providers</div>
          </div>
          <div style={categoryItemStyle}>
            <div style={categoryIconStyle}>🔨</div>
            <div style={categoryNameStyle}>Carpentry</div>
            <div style={categoryCountStyle}>15 providers</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div>
      <h2 style={sectionTitleStyle}>User Management</h2>
      
      <div className="grid grid-3" style={userStatsStyle}>
        <div className="card text-center">
          <div style={statIconStyle}>👥</div>
          <div style={statValueStyle}>{adminStats.totalUsers}</div>
          <div style={statLabelStyle}>Total Users</div>
        </div>
        
        <div className="card text-center">
          <div style={statIconStyle}>📈</div>
          <div style={statValueStyle}>+{monthlyData[0].users}</div>
          <div style={statLabelStyle}>New This Month</div>
        </div>
        
        <div className="card text-center">
          <div style={statIconStyle}>⭐</div>
          <div style={statValueStyle}>89%</div>
          <div style={statLabelStyle}>Active Users</div>
        </div>
      </div>

      <div className="card">
        <div style={userTableHeaderStyle}>
          <h3>Recent User Activity</h3>
          <div style={filtersStyle}>
            <input 
              type="text" 
              placeholder="Search users..." 
              style={searchInputStyle}
            />
            <select style={filterSelectStyle}>
              <option>All Cities</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>
        </div>
        
        <div style={userTableStyle}>
          <div style={tableHeaderStyle}>
            <span>Name</span>
            <span>Email</span>
            <span>City</span>
            <span>Bookings</span>
            <span>Total Spent</span>
            <span>Join Date</span>
            <span>Status</span>
          </div>
          {[
            { name: 'Priya Sharma', email: 'priya@email.com', city: 'Mumbai', bookings: 5, spent: 3500, joinDate: '2023-08-15', status: 'Active' },
            { name: 'Amit Patel', email: 'amit@email.com', city: 'Delhi', bookings: 3, spent: 2200, joinDate: '2023-09-20', status: 'Active' },
            { name: 'Sunita Singh', email: 'sunita@email.com', city: 'Bangalore', bookings: 8, spent: 5800, joinDate: '2023-07-10', status: 'Active' }
          ].map((user, index) => (
            <div key={index} style={tableRowStyle}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.city}</span>
              <span>{user.bookings}</span>
              <span style={amountStyle}>₹{user.spent.toLocaleString()}</span>
              <span>{user.joinDate}</span>
              <span>
                <span style={{
                  ...statusBadgeStyle,
                  background: '#d4edda',
                  color: '#155724'
                }}>
                  {user.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Layout title="Admin Dashboard - HandyFix">
      <div style={adminContainerStyle}>
        <div className="container">
          <div style={adminHeaderStyle}>
            <h1 style={adminTitleStyle}>Admin Dashboard</h1>
            <p style={adminSubtitleStyle}>Manage platform operations and monitor performance</p>
          </div>

          <div style={adminContentStyle}>
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
                    ...(activeTab === 'providers' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('providers')}
                >
                  🔧 Providers
                </button>
                <button 
                  style={{
                    ...navItemStyle,
                    ...(activeTab === 'users' ? activeNavItemStyle : {})
                  }}
                  onClick={() => setActiveTab('users')}
                >
                  👥 Users
                </button>
              </nav>
            </div>

            <div style={mainContentStyle}>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'bookings' && renderBookings()}
              {activeTab === 'providers' && renderProviders()}
              {activeTab === 'users' && renderUsers()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const adminContainerStyle = {
  minHeight: '80vh',
  background: '#f8f9fa',
  padding: '40px 0'
}

const adminHeaderStyle = {
  textAlign: 'center',
  marginBottom: '40px'
}

const adminTitleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const adminSubtitleStyle = {
  fontSize: '18px',
  color: '#7f8c8d'
}

const adminContentStyle = {
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

const statsGridStyle = {
  marginBottom: '32px'
}

const statCardStyle = {
  padding: '24px'
}

const statIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const statValueStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#007bff',
  marginBottom: '8px'
}

const statLabelStyle = {
  fontSize: '16px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const chartsGridStyle = {
  marginBottom: '32px'
}

const chartTitleStyle = {
  fontSize: '20px',
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

const chartBarContainerStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
}

const chartBarStyle = {
  width: '40px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '4px 4px 0 0',
  minHeight: '20px',
  height: '80px' // Fixed height for demo
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

const revenueGridStyle = {
  marginTop: '20px'
}

const revenueItemStyle = {
  textAlign: 'center',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const revenueValueStyle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#28a745',
  marginBottom: '8px'
}

const revenueLabelStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
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

const filtersStyle = {
  display: 'flex',
  gap: '12px'
}

const filterSelectStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px'
}

const bookingsTableStyle = {
  background: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const tableHeaderStyle = {
  display: 'grid',
  gridTemplateColumns: '100px 150px 150px 120px 100px 100px 120px 100px 100px',
  gap: '16px',
  padding: '16px',
  background: '#f8f9fa',
  fontWeight: '600',
  fontSize: '14px',
  color: '#555',
  borderBottom: '1px solid #eee'
}

const tableRowStyle = {
  display: 'grid',
  gridTemplateColumns: '100px 150px 150px 120px 100px 100px 120px 100px 100px',
  gap: '16px',
  padding: '16px',
  borderBottom: '1px solid #eee',
  fontSize: '14px',
  alignItems: 'center'
}

const bookingIdStyle = {
  fontWeight: '600',
  color: '#007bff'
}

const amountStyle = {
  fontWeight: '600',
  color: '#007bff'
}

const commissionStyle = {
  fontWeight: '600',
  color: '#28a745'
}

const actionBtnStyle = {
  padding: '4px 12px',
  fontSize: '12px'
}

const providerStatsStyle = {
  display: 'flex',
  gap: '16px'
}

const statBadgeStyle = {
  padding: '8px 16px',
  background: '#fff3cd',
  color: '#856404',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '600'
}

const pendingProvidersStyle = {
  marginBottom: '24px'
}

const providersListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '20px'
}

const providerItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
}

const providerInfoStyle = {
  flex: '1'
}

const providerNameStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const providerServiceStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const providerExperienceStyle = {
  color: '#28a745',
  fontSize: '14px',
  marginBottom: '4px'
}

const appliedDateStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const providerStatusStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-end'
}

const documentsStatusStyle = {}

const docsCompleteStyle = {
  color: '#28a745',
  fontSize: '12px',
  fontWeight: '600'
}

const docsIncompleteStyle = {
  color: '#dc3545',
  fontSize: '12px',
  fontWeight: '600'
}

const providerActionsStyle = {
  display: 'flex',
  gap: '8px'
}

const categoriesGridStyle = {
  marginTop: '20px'
}

const categoryItemStyle = {
  textAlign: 'center',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const categoryIconStyle = {
  fontSize: '32px',
  marginBottom: '12px'
}

const categoryNameStyle = {
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '4px'
}

const categoryCountStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const userStatsStyle = {
  marginBottom: '32px'
}

const userTableHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
}

const searchInputStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px',
  width: '200px'
}

const userTableStyle = {
  background: 'white',
  borderRadius: '8px',
  overflow: 'hidden'
}

const statusBadgeStyle = {
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600'
}
