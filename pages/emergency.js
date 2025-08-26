import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Emergency() {
  const [selectedService, setSelectedService] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [urgencyLevel, setUrgencyLevel] = useState('high')
  const [nearbyProviders, setNearbyProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock emergency providers data
  const emergencyServices = [
    {
      id: 1,
      name: 'Plumbing Emergency',
      icon: '🔧',
      description: 'Burst pipes, major leaks, blocked drains',
      color: '#007bff',
      responseTime: '15-30 min',
      available: true,
      providers: 8
    },
    {
      id: 2,
      name: 'Electrical Emergency',
      icon: '⚡',
      description: 'Power outages, electrical faults, short circuits',
      color: '#ffc107',
      responseTime: '10-25 min',
      available: true,
      providers: 12
    },
    {
      id: 3,
      name: 'AC Emergency',
      icon: '❄️',
      description: 'AC breakdown, cooling system failure',
      color: '#17a2b8',
      responseTime: '20-40 min',
      available: true,
      providers: 6
    },
    {
      id: 4,
      name: 'Lockout Service',
      icon: '🔑',
      description: 'Locked out, lost keys, door issues',
      color: '#28a745',
      responseTime: '15-30 min',
      available: true,
      providers: 10
    },
    {
      id: 5,
      name: 'Appliance Emergency',
      icon: '🔌',
      description: 'Refrigerator, washing machine, microwave issues',
      color: '#6f42c1',
      responseTime: '30-60 min',
      available: true,
      providers: 5
    },
    {
      id: 6,
      name: 'Security Emergency',
      icon: '🛡️',
      description: 'Security system, CCTV, alarm issues',
      color: '#dc3545',
      responseTime: '10-20 min',
      available: false,
      providers: 3
    }
  ]

  const mockProviders = [
    {
      id: 1,
      name: 'Quick Fix Emergency Services',
      rating: 4.9,
      responseTime: '12 min',
      distance: '0.8 km',
      available: true,
      phone: '+91 98765 43210',
      specialization: 'Plumbing & Electrical',
      verified: true,
      completedEmergencies: 156,
      price: '₹150 service charge'
    },
    {
      id: 2,
      name: 'Rapid Response Team',
      rating: 4.8,
      responseTime: '18 min',
      distance: '1.2 km',
      available: true,
      phone: '+91 98765 43211',
      specialization: 'All Emergency Services',
      verified: true,
      completedEmergencies: 203,
      price: '₹200 service charge'
    },
    {
      id: 3,
      name: '24/7 Emergency Experts',
      rating: 4.7,
      responseTime: '25 min',
      distance: '2.1 km',
      available: true,
      phone: '+91 98765 43212',
      specialization: 'Electrical & AC',
      verified: true,
      completedEmergencies: 89,
      price: '₹180 service charge'
    }
  ]

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setNearbyProviders(mockProviders)
  }

  const handleEmergencyRequest = async (providerId) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const provider = mockProviders.find(p => p.id === providerId)
    alert(`Emergency request sent to ${provider.name}! They will contact you at ${contactNumber} within ${provider.responseTime}.`)
    
    setLoading(false)
  }

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'critical': return '#dc3545'
      case 'high': return '#fd7e14'
      case 'medium': return '#ffc107'
      default: return '#28a745'
    }
  }

  const getUrgencyText = (level) => {
    switch (level) {
      case 'critical': return 'Life-threatening emergency'
      case 'high': return 'Urgent repair needed'
      case 'medium': return 'Same-day service required'
      default: return 'Can wait a few hours'
    }
  }

  return (
    <Layout title="Emergency Services - HandyFix">
      <div style={containerStyle}>
        {/* Emergency Header */}
        <div style={emergencyHeaderStyle}>
          <div className="container">
            <div style={headerContentStyle}>
              <div style={emergencyInfoStyle}>
                <h1 style={emergencyTitleStyle}>
                  🚨 Emergency Services
                </h1>
                <p style={emergencySubtitleStyle}>
                  24/7 emergency support for urgent home service needs
                </p>
                <div style={currentTimeStyle}>
                  <span style={timeIconStyle}>🕐</span>
                  Current Time: {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div style={emergencyStatsStyle}>
                <div style={statCardStyle}>
                  <div style={statValueStyle}>{'< 20 min'}</div>
                  <div style={statLabelStyle}>Avg Response</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statValueStyle}>24/7</div>
                  <div style={statLabelStyle}>Available</div>
                </div>
                <div style={statCardStyle}>
                  <div style={statValueStyle}>500+</div>
                  <div style={statLabelStyle}>Emergencies/Week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Emergency Notice */}
          <div style={emergencyNoticeStyle}>
            <div style={noticeIconStyle}>⚠️</div>
            <div>
              <h3 style={noticeTitleStyle}>Life-threatening Emergency?</h3>
              <p style={noticeTextStyle}>
                For medical, fire, or police emergencies, call <strong>108, 100, or 101</strong> immediately.
                This service is for home maintenance emergencies only.
              </p>
            </div>
          </div>

          {/* Emergency Services Grid */}
          <div style={servicesGridStyle}>
            <h2 style={sectionTitleStyle}>Select Emergency Service Type</h2>
            <div style={servicesContainerStyle}>
              {emergencyServices.map(service => (
                <div
                  key={service.id}
                  style={{
                    ...serviceCardStyle,
                    borderColor: selectedService?.id === service.id ? service.color : 'transparent',
                    opacity: service.available ? 1 : 0.6
                  }}
                  onClick={() => service.available && handleServiceSelect(service)}
                >
                  <div style={{
                    ...serviceIconStyle,
                    color: service.color
                  }}>
                    {service.icon}
                  </div>
                  
                  <h3 style={serviceNameStyle}>{service.name}</h3>
                  <p style={serviceDescStyle}>{service.description}</p>
                  
                  <div style={serviceMetricsStyle}>
                    <div style={metricStyle}>
                      <span style={metricIconStyle}>⏱️</span>
                      <span>{service.responseTime}</span>
                    </div>
                    <div style={metricStyle}>
                      <span style={metricIconStyle}>👥</span>
                      <span>{service.providers} available</span>
                    </div>
                  </div>
                  
                  {service.available ? (
                    <div style={availableStyle}>✅ Available Now</div>
                  ) : (
                    <div style={unavailableStyle}>❌ Currently Unavailable</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Request Form */}
          {selectedService && (
            <div style={formSectionStyle}>
              <h2 style={sectionTitleStyle}>Emergency Request Details</h2>
              <div style={formContainerStyle}>
                <div style={formLeftStyle}>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Emergency Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your emergency in detail..."
                      style={textareaStyle}
                      rows="4"
                    />
                  </div>

                  <div style={formRowStyle}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Your Location *</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your complete address"
                        style={inputStyle}
                      />
                    </div>
                    
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>Contact Number *</label>
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={labelStyle}>Urgency Level</label>
                    <div style={urgencyOptionsStyle}>
                      {[
                        { value: 'critical', label: 'Critical', desc: 'Life/property at risk' },
                        { value: 'high', label: 'High', desc: 'Urgent repair needed' },
                        { value: 'medium', label: 'Medium', desc: 'Same-day service' },
                        { value: 'low', label: 'Low', desc: 'Can wait a few hours' }
                      ].map(option => (
                        <label key={option.value} style={urgencyOptionStyle}>
                          <input
                            type="radio"
                            name="urgency"
                            value={option.value}
                            checked={urgencyLevel === option.value}
                            onChange={(e) => setUrgencyLevel(e.target.value)}
                            style={radioStyle}
                          />
                          <div style={{
                            ...urgencyLabelStyle,
                            borderColor: urgencyLevel === option.value ? getUrgencyColor(option.value) : '#e9ecef',
                            backgroundColor: urgencyLevel === option.value ? getUrgencyColor(option.value) + '10' : 'white'
                          }}>
                            <strong style={{ color: getUrgencyColor(option.value) }}>{option.label}</strong>
                            <small>{option.desc}</small>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={formRightStyle}>
                  <div style={selectedServiceCardStyle}>
                    <div style={{
                      ...selectedServiceIconStyle,
                      color: selectedService.color
                    }}>
                      {selectedService.icon}
                    </div>
                    <h3 style={selectedServiceNameStyle}>{selectedService.name}</h3>
                    <p style={selectedServiceDescStyle}>{selectedService.description}</p>
                    <div style={selectedServiceMetricsStyle}>
                      <div style={selectedMetricStyle}>
                        <span>Response Time: <strong>{selectedService.responseTime}</strong></span>
                      </div>
                      <div style={selectedMetricStyle}>
                        <span>Available Providers: <strong>{selectedService.providers}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nearby Emergency Providers */}
          {nearbyProviders.length > 0 && (
            <div style={providersSectionStyle}>
              <h2 style={sectionTitleStyle}>Available Emergency Providers</h2>
              <div style={providersGridStyle}>
                {nearbyProviders.map(provider => (
                  <div key={provider.id} style={providerCardStyle}>
                    <div style={providerHeaderStyle}>
                      <div>
                        <h3 style={providerNameStyle}>
                          {provider.name}
                          {provider.verified && (
                            <span style={verifiedBadgeStyle}>✓</span>
                          )}
                        </h3>
                        <p style={providerSpecializationStyle}>{provider.specialization}</p>
                      </div>
                      <div style={providerRatingStyle}>
                        <span style={ratingStyle}>⭐ {provider.rating}</span>
                      </div>
                    </div>

                    <div style={providerMetricsStyle}>
                      <div style={providerMetricStyle}>
                        <span style={metricIconStyle}>⏱️</span>
                        <span>Arrives in {provider.responseTime}</span>
                      </div>
                      <div style={providerMetricStyle}>
                        <span style={metricIconStyle}>📍</span>
                        <span>{provider.distance} away</span>
                      </div>
                      <div style={providerMetricStyle}>
                        <span style={metricIconStyle}>🛠️</span>
                        <span>{provider.completedEmergencies} emergencies</span>
                      </div>
                    </div>

                    <div style={providerPriceStyle}>
                      <span style={priceStyle}>{provider.price}</span>
                      <span style={priceNoteStyle}>+ actual repair cost</span>
                    </div>

                    <div style={providerActionsStyle}>
                      <a href={`tel:${provider.phone}`} style={callBtnStyle}>
                        📞 Call Now
                      </a>
                      <button
                        style={requestBtnStyle}
                        onClick={() => handleEmergencyRequest(provider.id)}
                        disabled={loading || !description || !location || !contactNumber}
                      >
                        {loading ? '⏳ Sending...' : '🚨 Request Emergency Service'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Tips */}
          <div style={tipsSectionStyle}>
            <h2 style={sectionTitleStyle}>Emergency Preparedness Tips</h2>
            <div style={tipsGridStyle}>
              {[
                {
                  icon: '🔧',
                  title: 'Plumbing Emergency',
                  tips: ['Turn off main water supply', 'Move items away from leak', 'Document damage with photos']
                },
                {
                  icon: '⚡',
                  title: 'Electrical Emergency',
                  tips: ['Turn off main power switch', 'Stay away from water', 'Never touch exposed wires']
                },
                {
                  icon: '🔥',
                  title: 'Gas Emergency',
                  tips: ['Turn off gas supply', 'Open windows for ventilation', 'Evacuate if smell persists']
                },
                {
                  icon: '🏠',
                  title: 'General Safety',
                  tips: ['Keep emergency numbers handy', 'Have basic tools ready', 'Know location of main switches']
                }
              ].map((tip, index) => (
                <div key={index} style={tipCardStyle}>
                  <div style={tipIconStyle}>{tip.icon}</div>
                  <h3 style={tipTitleStyle}>{tip.title}</h3>
                  <ul style={tipListStyle}>
                    {tip.tips.map((item, idx) => (
                      <li key={idx} style={tipItemStyle}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const emergencyHeaderStyle = {
  background: 'linear-gradient(135deg, #dc3545 0%, #c82333 50%, #bd2130 100%)',
  color: 'white',
  padding: '60px 0',
  position: 'relative',
  overflow: 'hidden'
}

const headerContentStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '40px',
  alignItems: 'center'
}

const emergencyInfoStyle = {
  animation: 'fadeInLeft 1s ease-out'
}

const emergencyTitleStyle = {
  fontSize: '48px',
  fontWeight: '800',
  marginBottom: '16px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  animation: 'pulse 2s infinite'
}

const emergencySubtitleStyle = {
  fontSize: '20px',
  marginBottom: '20px',
  opacity: '0.95'
}

const currentTimeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  fontWeight: '600',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'inline-flex'
}

const timeIconStyle = {
  fontSize: '16px'
}

const emergencyStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  animation: 'fadeInRight 1s ease-out'
}

const statCardStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '12px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)'
}

const statValueStyle = {
  fontSize: '24px',
  fontWeight: '800',
  marginBottom: '4px'
}

const statLabelStyle = {
  fontSize: '12px',
  opacity: '0.8',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const emergencyNoticeStyle = {
  display: 'flex',
  gap: '16px',
  background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
  border: '2px solid #ffc107',
  borderRadius: '12px',
  padding: '20px',
  margin: '40px 0',
  alignItems: 'flex-start'
}

const noticeIconStyle = {
  fontSize: '32px',
  flexShrink: 0
}

const noticeTitleStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#856404',
  marginBottom: '8px'
}

const noticeTextStyle = {
  color: '#856404',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: 0
}

const servicesGridStyle = {
  marginBottom: '40px'
}

const sectionTitleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '24px',
  textAlign: 'center'
}

const servicesContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px'
}

const serviceCardStyle = {
  background: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '3px solid transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textAlign: 'center'
}

const serviceIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  display: 'block'
}

const serviceNameStyle = {
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const serviceDescStyle = {
  color: '#6c757d',
  fontSize: '14px',
  marginBottom: '16px',
  lineHeight: '1.4'
}

const serviceMetricsStyle = {
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  marginBottom: '16px'
}

const metricStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  color: '#6c757d'
}

const metricIconStyle = {
  fontSize: '14px'
}

const availableStyle = {
  color: '#28a745',
  fontWeight: '600',
  fontSize: '14px'
}

const unavailableStyle = {
  color: '#dc3545',
  fontWeight: '600',
  fontSize: '14px'
}

const formSectionStyle = {
  marginBottom: '40px'
}

const formContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '40px',
  background: 'white',
  borderRadius: '16px',
  padding: '32px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
}

const formLeftStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
}

const formRightStyle = {}

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const formRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px'
}

const labelStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#2c3e50',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const inputStyle = {
  padding: '12px 16px',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '14px',
  transition: 'border-color 0.3s ease'
}

const textareaStyle = {
  padding: '12px 16px',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '14px',
  resize: 'vertical',
  fontFamily: 'inherit',
  transition: 'border-color 0.3s ease'
}

const urgencyOptionsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px'
}

const urgencyOptionStyle = {
  cursor: 'pointer'
}

const radioStyle = {
  display: 'none'
}

const urgencyLabelStyle = {
  display: 'block',
  padding: '12px 16px',
  border: '2px solid',
  borderRadius: '8px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}

const selectedServiceCardStyle = {
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  borderRadius: '16px',
  padding: '24px',
  textAlign: 'center',
  border: '2px solid #e9ecef'
}

const selectedServiceIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  display: 'block'
}

const selectedServiceNameStyle = {
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const selectedServiceDescStyle = {
  color: '#6c757d',
  fontSize: '14px',
  marginBottom: '16px'
}

const selectedServiceMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const selectedMetricStyle = {
  fontSize: '14px',
  color: '#6c757d'
}

const providersSectionStyle = {
  marginBottom: '40px'
}

const providersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '24px'
}

const providerCardStyle = {
  background: 'white',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease'
}

const providerHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px'
}

const providerNameStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const verifiedBadgeStyle = {
  background: '#28a745',
  color: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px'
}

const providerSpecializationStyle = {
  color: '#007bff',
  fontSize: '14px',
  fontWeight: '600'
}

const providerRatingStyle = {
  textAlign: 'right'
}

const ratingStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#ffc107'
}

const providerMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px'
}

const providerMetricStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: '#6c757d'
}

const providerPriceStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginBottom: '20px'
}

const priceStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#007bff'
}

const priceNoteStyle = {
  fontSize: '12px',
  color: '#6c757d'
}

const providerActionsStyle = {
  display: 'flex',
  gap: '12px'
}

const callBtnStyle = {
  flex: '1',
  background: '#28a745',
  color: 'white',
  textDecoration: 'none',
  padding: '12px 16px',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '14px',
  transition: 'all 0.3s ease'
}

const requestBtnStyle = {
  flex: '2',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '12px 16px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  animation: 'pulse 2s infinite'
}

const tipsSectionStyle = {
  marginBottom: '40px'
}

const tipsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
}

const tipCardStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  textAlign: 'center'
}

const tipIconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  display: 'block'
}

const tipTitleStyle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '12px'
}

const tipListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const tipItemStyle = {
  fontSize: '13px',
  color: '#6c757d',
  marginBottom: '6px',
  paddingLeft: '16px',
  position: 'relative'
}

// Add CSS animations
const animations = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.02); opacity: 0.9; }
  }
  
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = animations
  document.head.appendChild(style)
}
