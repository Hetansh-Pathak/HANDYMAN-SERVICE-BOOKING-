import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Services() {
  const [selectedCity, setSelectedCity] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedService, setSelectedService] = useState('')
  const [favorites, setFavorites] = useState([])
  const [viewMode, setViewMode] = useState('grid') // grid or list

  // Mock data - replace with API calls
  const providers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'Plumbing',
      city: 'Mumbai',
      rating: 4.8,
      reviews: 152,
      experience: 8,
      basePrice: 500,
      available: true,
      image: '👨‍🔧',
      specialties: ['Pipe Repair', 'Installation', 'Emergency Fixes'],
      responseTime: '15 min',
      completedJobs: 245,
      verified: true,
      emergencyAvailable: true
    },
    {
      id: 2,
      name: 'Amit Sharma',
      service: 'Electrical',
      city: 'Delhi',
      rating: 4.9,
      reviews: 203,
      experience: 12,
      basePrice: 400,
      available: true,
      image: '👨‍💼',
      specialties: ['Wiring', 'Appliance Setup', 'Circuit Repair'],
      responseTime: '20 min',
      completedJobs: 312,
      verified: true,
      emergencyAvailable: true
    },
    {
      id: 3,
      name: 'Priya Singh',
      service: 'Cleaning',
      city: 'Bangalore',
      rating: 4.7,
      reviews: 89,
      experience: 5,
      basePrice: 300,
      available: false,
      image: '👩‍💼',
      specialties: ['Deep Cleaning', 'Regular Maintenance', 'Carpet Cleaning'],
      responseTime: '30 min',
      completedJobs: 189,
      verified: true,
      emergencyAvailable: false
    },
    {
      id: 4,
      name: 'Mohammed Ali',
      service: 'Carpentry',
      city: 'Mumbai',
      rating: 4.6,
      reviews: 134,
      experience: 10,
      basePrice: 600,
      available: true,
      image: '👨‍🔧',
      specialties: ['Furniture Repair', 'Custom Work', 'Installation'],
      responseTime: '25 min',
      completedJobs: 178,
      verified: true,
      emergencyAvailable: false
    },
    {
      id: 5,
      name: 'Sneha Patel',
      service: 'AC Repair',
      city: 'Ahmedabad',
      rating: 4.8,
      reviews: 76,
      experience: 6,
      basePrice: 450,
      available: true,
      image: '👩‍💼',
      specialties: ['AC Servicing', 'Installation', 'Gas Refill'],
      responseTime: '18 min',
      completedJobs: 156,
      verified: true,
      emergencyAvailable: true
    }
  ]

  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 'Kolkata']
  const services = ['All Services', 'Plumbing', 'Electrical', 'Carpentry', 'AC Repair', 'Cleaning', 'Painting']

  const filteredProviders = providers
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.service.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCity = !selectedCity || selectedCity === 'All Cities' || provider.city === selectedCity
      const matchesService = !selectedService || selectedService === 'All Services' || provider.service === selectedService
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'low' && provider.basePrice <= 400) ||
                          (priceRange === 'medium' && provider.basePrice > 400 && provider.basePrice <= 600) ||
                          (priceRange === 'high' && provider.basePrice > 600)
      
      return matchesSearch && matchesCity && matchesService && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return a.basePrice - b.basePrice
      if (sortBy === 'experience') return b.experience - a.experience
      if (sortBy === 'responseTime') return parseInt(a.responseTime) - parseInt(b.responseTime)
      return 0
    })

  const toggleFavorite = (providerId) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    )
  }

  const getServiceColor = (service) => {
    const colors = {
      'Plumbing': '#007bff',
      'Electrical': '#ffc107',
      'Carpentry': '#28a745',
      'AC Repair': '#17a2b8',
      'Cleaning': '#6f42c1',
      'Painting': '#e83e8c'
    }
    return colors[service] || '#6c757d'
  }

  return (
    <Layout title="Find Service Providers - HandyFix">
      {/* Enhanced Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Find Service Providers</h1>
            <p style={heroSubtitleStyle}>Connect with verified professionals in your area</p>
            
            <div style={searchBarStyle}>
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={selectStyle}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button className="btn btn-primary" style={searchBtnStyle}>
                🔍 Search
              </button>
            </div>

            <div style={quickFiltersStyle}>
              {services.slice(1, 5).map(service => (
                <button
                  key={service}
                  style={{
                    ...quickFilterBtnStyle,
                    ...(selectedService === service ? activeQuickFilterStyle : {})
                  }}
                  onClick={() => setSelectedService(selectedService === service ? '' : service)}
                >
                  {service === 'Plumbing' && '🔧'}
                  {service === 'Electrical' && '⚡'}
                  {service === 'Carpentry' && '🔨'}
                  {service === 'AC Repair' && '❄️'}
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters & Results */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={filtersStyle}>
            <div style={leftFiltersStyle}>
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Service:</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={filterSelectStyle}
                >
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={filterSelectStyle}
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                  <option value="experience">Most Experienced</option>
                  <option value="responseTime">Fastest Response</option>
                </select>
              </div>

              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Price Range:</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={filterSelectStyle}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under ₹400</option>
                  <option value="medium">₹400 - ₹600</option>
                  <option value="high">Above ₹600</option>
                </select>
              </div>
            </div>

            <div style={rightFiltersStyle}>
              <div style={viewToggleStyle}>
                <button
                  style={{
                    ...viewToggleBtnStyle,
                    ...(viewMode === 'grid' ? activeViewBtnStyle : {})
                  }}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  style={{
                    ...viewToggleBtnStyle,
                    ...(viewMode === 'list' ? activeViewBtnStyle : {})
                  }}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  ☰
                </button>
              </div>

              <div style={resultsCountStyle}>
                <strong>{filteredProviders.length}</strong> provider{filteredProviders.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>

          <div style={viewMode === 'grid' ? resultsGridStyle : resultsListStyle}>
            {filteredProviders.map(provider => (
              <div key={provider.id} className="card" style={viewMode === 'grid' ? providerCardStyle : listProviderCardStyle}>
                {/* Enhanced Card Header */}
                <div style={cardHeaderStyle}>
                  <div style={providerImageStyle}>
                    {provider.image}
                    {provider.verified && (
                      <div style={verifiedBadgeStyle}>✓</div>
                    )}
                  </div>
                  <div style={providerInfoStyle}>
                    <div style={nameRowStyle}>
                      <h3 style={providerNameStyle}>{provider.name}</h3>
                      <button
                        style={{
                          ...favoriteButtonStyle,
                          color: favorites.includes(provider.id) ? '#dc3545' : '#6c757d'
                        }}
                        onClick={() => toggleFavorite(provider.id)}
                        title={favorites.includes(provider.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {favorites.includes(provider.id) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div style={serviceRowStyle}>
                      <span style={{
                        ...serviceTypeStyle,
                        color: getServiceColor(provider.service)
                      }}>
                        {provider.service} Specialist
                      </span>
                      {provider.emergencyAvailable && (
                        <span style={emergencyBadgeStyle}>⚡ Emergency</span>
                      )}
                    </div>
                    <p style={locationStyle}>📍 {provider.city}</p>
                  </div>
                  <div style={availabilityStyle}>
                    <span style={{
                      ...statusBadgeStyle,
                      ...(provider.available ? availableBadgeStyle : unavailableBadgeStyle)
                    }}>
                      {provider.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>

                {/* Enhanced Stats Row */}
                <div style={statsRowStyle}>
                  <div style={statStyle}>
                    <div style={ratingContainerStyle}>
                      <span style={ratingStyle}>⭐ {provider.rating}</span>
                      <span style={reviewsStyle}>({provider.reviews} reviews)</span>
                    </div>
                    <div style={metricStyle}>
                      <span style={metricIconStyle}>🎯</span>
                      <span>{provider.completedJobs} jobs completed</span>
                    </div>
                  </div>
                  <div style={responseInfoStyle}>
                    <div style={experienceStyle}>
                      {provider.experience} years exp.
                    </div>
                    <div style={responseTimeStyle}>
                      ⏱️ Responds in {provider.responseTime}
                    </div>
                  </div>
                </div>

                {/* Enhanced Specialties */}
                <div style={specialtiesStyle}>
                  <strong style={specialtiesLabelStyle}>Specialties:</strong>
                  <div style={tagsStyle}>
                    {provider.specialties.map(specialty => (
                      <span key={specialty} style={{
                        ...tagStyle,
                        borderColor: getServiceColor(provider.service) + '40',
                        color: getServiceColor(provider.service)
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div style={cardFooterStyle}>
                  <div style={priceStyle}>
                    Starting from <strong style={priceValueStyle}>₹{provider.basePrice}</strong>
                    <span style={priceNoteStyle}>per visit</span>
                  </div>
                  <div style={actionsStyle}>
                    <Link href={`/provider/${provider.id}`} className="btn btn-outline" style={viewBtnStyle}>
                      👁️ Profile
                    </Link>
                    <Link href={`/book/${provider.id}`} className="btn btn-primary" style={bookBtnStyle}>
                      📅 Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div style={noResultsStyle}>
              <div style={noResultsIconStyle}>🔍</div>
              <h3 style={noResultsTitleStyle}>No providers found</h3>
              <p style={noResultsTextStyle}>Try adjusting your search criteria or check back later.</p>
              <button 
                style={clearFiltersStyle}
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCity('')
                  setSelectedService('')
                  setPriceRange('all')
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Service Categories */}
      <section style={{...sectionStyle, background: 'white'}}>
        <div className="container">
          <h2 style={sectionTitleStyle}>Browse by Service Category</h2>
          <p style={sectionSubtitleStyle}>Find the right professional for your needs</p>
          <div className="grid grid-4" style={{marginTop: '40px'}}>
            {services.slice(1).map(service => {
              const providerCount = providers.filter(p => p.service === service).length
              return (
                <Link key={service} href={`/services/${service.toLowerCase().replace(' ', '-')}`} style={{textDecoration: 'none'}}>
                  <div className="card" style={{
                    ...categoryCardStyle,
                    borderTop: `4px solid ${getServiceColor(service)}`
                  }}>
                    <div style={{
                      ...categoryIconStyle,
                      color: getServiceColor(service)
                    }}>
                      {service === 'Plumbing' && '🔧'}
                      {service === 'Electrical' && '⚡'}
                      {service === 'Carpentry' && '🔨'}
                      {service === 'AC Repair' && '❄️'}
                      {service === 'Cleaning' && '🧽'}
                      {service === 'Painting' && '🎨'}
                    </div>
                    <h3 style={categoryNameStyle}>{service}</h3>
                    <p style={categoryCountStyle}>
                      {providerCount} provider{providerCount !== 1 ? 's' : ''} available
                    </p>
                    <div style={categoryFooterStyle}>
                      <span style={viewCategoryStyle}>View All →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

// Enhanced Styles with Better Visibility
const heroStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '80px 0',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden'
}

const heroContentStyle = {
  position: 'relative',
  zIndex: 1
}

const heroTitleStyle = {
  fontSize: '48px',
  fontWeight: '800',
  marginBottom: '20px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const heroSubtitleStyle = {
  fontSize: '20px',
  marginBottom: '40px',
  opacity: '0.95',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
}

const searchBarStyle = {
  display: 'flex',
  gap: '0',
  maxWidth: '700px',
  margin: '0 auto 30px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  padding: '8px',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  border: '1px solid rgba(255, 255, 255, 0.2)'
}

const searchInputStyle = {
  flex: '2',
  padding: '16px 20px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  background: 'transparent',
  color: '#333'
}

const selectStyle = {
  flex: '1',
  padding: '16px 20px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  background: 'rgba(248, 249, 250, 0.8)',
  color: '#333'
}

const searchBtnStyle = {
  whiteSpace: 'nowrap',
  borderRadius: '12px',
  padding: '16px 24px'
}

const quickFiltersStyle = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const quickFilterBtnStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
}

const activeQuickFilterStyle = {
  background: 'rgba(255, 255, 255, 0.3)',
  borderColor: 'rgba(255, 255, 255, 0.5)'
}

const sectionStyle = {
  padding: '60px 0',
  background: '#f8f9fa'
}

const filtersStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px',
  padding: '24px',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  flexWrap: 'wrap',
  gap: '20px'
}

const leftFiltersStyle = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap'
}

const rightFiltersStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
}

const filterGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const filterLabelStyle = {
  fontWeight: '700',
  color: '#2c3e50',
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const filterSelectStyle = {
  padding: '10px 16px',
  border: '2px solid #e9ecef',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#2c3e50',
  background: 'white'
}

const viewToggleStyle = {
  display: 'flex',
  background: '#e9ecef',
  borderRadius: '8px',
  padding: '2px'
}

const viewToggleBtnStyle = {
  background: 'none',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#6c757d',
  transition: 'all 0.3s ease'
}

const activeViewBtnStyle = {
  background: 'white',
  color: '#007bff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const resultsCountStyle = {
  color: '#2c3e50',
  fontWeight: '600',
  fontSize: '16px'
}

const resultsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
  gap: '24px'
}

const resultsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const providerCardStyle = {
  height: 'fit-content',
  transition: 'all 0.3s ease',
  border: '2px solid transparent'
}

const listProviderCardStyle = {
  ...providerCardStyle,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '20px'
}

const providerImageStyle = {
  position: 'relative',
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #e9ecef, #dee2e6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  flexShrink: 0,
  border: '3px solid #fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}

const verifiedBadgeStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  width: '24px',
  height: '24px',
  background: '#28a745',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700',
  border: '2px solid white'
}

const providerInfoStyle = {
  flex: '1'
}

const nameRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '6px'
}

const providerNameStyle = {
  fontSize: '22px',
  fontWeight: '800',
  marginBottom: '0',
  color: '#1a1a1a',
  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
  letterSpacing: '-0.5px'
}

const favoriteButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '50%',
  transition: 'all 0.3s ease'
}

const serviceRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '6px'
}

const serviceTypeStyle = {
  fontWeight: '700',
  fontSize: '16px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
}

const emergencyBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  animation: 'pulse 2s infinite'
}

const locationStyle = {
  color: '#495057',
  fontSize: '14px',
  fontWeight: '600'
}

const availabilityStyle = {
  flexShrink: 0
}

const statusBadgeStyle = {
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const availableBadgeStyle = {
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  color: 'white',
  boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
}

const unavailableBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)'
}

const statsRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px',
  padding: '16px',
  background: 'rgba(248, 249, 250, 0.7)',
  borderRadius: '12px'
}

const statStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const ratingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const ratingStyle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#ffc107'
}

const reviewsStyle = {
  fontSize: '14px',
  color: '#6c757d',
  fontWeight: '500'
}

const metricStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  color: '#495057',
  fontWeight: '500'
}

const metricIconStyle = {
  fontSize: '14px'
}

const responseInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '4px'
}

const experienceStyle = {
  fontSize: '14px',
  color: '#007bff',
  fontWeight: '700'
}

const responseTimeStyle = {
  fontSize: '12px',
  color: '#28a745',
  fontWeight: '600'
}

const specialtiesStyle = {
  marginBottom: '20px'
}

const specialtiesLabelStyle = {
  color: '#2c3e50',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const tagsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px'
}

const tagStyle = {
  padding: '6px 12px',
  background: 'rgba(255, 255, 255, 0.8)',
  border: '2px solid',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.3px'
}

const cardFooterStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  borderTop: '2px solid #f1f3f4'
}

const priceStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
}

const priceValueStyle = {
  color: '#007bff',
  fontSize: '20px',
  fontWeight: '800'
}

const priceNoteStyle = {
  color: '#6c757d',
  fontSize: '12px',
  fontWeight: '500'
}

const actionsStyle = {
  display: 'flex',
  gap: '12px'
}

const viewBtnStyle = {
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: '600'
}

const bookBtnStyle = {
  padding: '10px 20px',
  fontSize: '14px',
  fontWeight: '700'
}

const noResultsStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#6c757d'
}

const noResultsIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

const noResultsTitleStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '12px'
}

const noResultsTextStyle = {
  fontSize: '16px',
  marginBottom: '24px'
}

const clearFiltersStyle = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const sectionTitleStyle = {
  fontSize: '36px',
  fontWeight: '800',
  textAlign: 'center',
  color: '#1a1a1a',
  marginBottom: '12px',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

const sectionSubtitleStyle = {
  fontSize: '18px',
  textAlign: 'center',
  color: '#6c757d',
  marginBottom: '32px'
}

const categoryCardStyle = {
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid transparent'
}

const categoryIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  display: 'block'
}

const categoryNameStyle = {
  fontSize: '20px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#1a1a1a',
  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
}

const categoryCountStyle = {
  color: '#6c757d',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '12px'
}

const categoryFooterStyle = {
  paddingTop: '12px',
  borderTop: '1px solid #f1f3f4'
}

const viewCategoryStyle = {
  color: '#007bff',
  fontSize: '14px',
  fontWeight: '600'
}
