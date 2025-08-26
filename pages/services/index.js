import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Services() {
  const [selectedCity, setSelectedCity] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [priceRange, setPriceRange] = useState('all')

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
      specialties: ['Pipe Repair', 'Installation', 'Emergency Fixes']
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
      specialties: ['Wiring', 'Appliance Setup', 'Circuit Repair']
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
      specialties: ['Deep Cleaning', 'Regular Maintenance', 'Carpet Cleaning']
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
      specialties: ['Furniture Repair', 'Custom Work', 'Installation']
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
      specialties: ['AC Servicing', 'Installation', 'Gas Refill']
    }
  ]

  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 'Kolkata']
  const services = ['All Services', 'Plumbing', 'Electrical', 'Carpentry', 'AC Repair', 'Cleaning', 'Painting']

  const filteredProviders = providers
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           provider.service.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCity = !selectedCity || selectedCity === 'All Cities' || provider.city === selectedCity
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'low' && provider.basePrice <= 400) ||
                          (priceRange === 'medium' && provider.basePrice > 400 && provider.basePrice <= 600) ||
                          (priceRange === 'high' && provider.basePrice > 600)
      
      return matchesSearch && matchesCity && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return a.basePrice - b.basePrice
      if (sortBy === 'experience') return b.experience - a.experience
      return 0
    })

  return (
    <Layout title="Find Service Providers - HandyFix">
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
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
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={filtersStyle}>
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

            <div style={resultsCountStyle}>
              {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div style={resultsGridStyle}>
            {filteredProviders.map(provider => (
              <div key={provider.id} className="card" style={providerCardStyle}>
                <div style={cardHeaderStyle}>
                  <div style={providerImageStyle}>{provider.image}</div>
                  <div style={providerInfoStyle}>
                    <h3 style={providerNameStyle}>{provider.name}</h3>
                    <p style={serviceTypeStyle}>{provider.service} Specialist</p>
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

                <div style={statsRowStyle}>
                  <div style={statStyle}>
                    <span style={ratingStyle}>⭐ {provider.rating}</span>
                    <span style={reviewsStyle}>({provider.reviews} reviews)</span>
                  </div>
                  <div style={experienceStyle}>
                    {provider.experience} years exp.
                  </div>
                </div>

                <div style={specialtiesStyle}>
                  <strong>Specialties:</strong>
                  <div style={tagsStyle}>
                    {provider.specialties.map(specialty => (
                      <span key={specialty} style={tagStyle}>{specialty}</span>
                    ))}
                  </div>
                </div>

                <div style={cardFooterStyle}>
                  <div style={priceStyle}>
                    Starting from <strong>₹{provider.basePrice}</strong>
                  </div>
                  <div style={actionsStyle}>
                    <Link href={`/provider/${provider.id}`} className="btn btn-outline" style={viewBtnStyle}>
                      View Profile
                    </Link>
                    <Link href={`/book/${provider.id}`} className="btn btn-primary" style={bookBtnStyle}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div style={noResultsStyle}>
              <h3>No providers found</h3>
              <p>Try adjusting your search criteria or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Service Categories */}
      <section style={{...sectionStyle, background: 'white'}}>
        <div className="container">
          <h2 style={sectionTitleStyle}>Browse by Service Category</h2>
          <div className="grid grid-4" style={{marginTop: '32px'}}>
            {services.slice(1).map(service => (
              <Link key={service} href={`/services/${service.toLowerCase().replace(' ', '-')}`} style={{textDecoration: 'none'}}>
                <div className="card" style={categoryCardStyle}>
                  <div style={categoryIconStyle}>
                    {service === 'Plumbing' && '🔧'}
                    {service === 'Electrical' && '⚡'}
                    {service === 'Carpentry' && '🔨'}
                    {service === 'AC Repair' && '❄️'}
                    {service === 'Cleaning' && '🧽'}
                    {service === 'Painting' && '🎨'}
                  </div>
                  <h3 style={categoryNameStyle}>{service}</h3>
                  <p style={categoryCountStyle}>
                    {providers.filter(p => p.service === service).length} providers
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

// Styles
const heroStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '60px 0',
  textAlign: 'center'
}

const heroTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '16px'
}

const heroSubtitleStyle = {
  fontSize: '18px',
  marginBottom: '32px',
  opacity: '0.9'
}

const searchBarStyle = {
  display: 'flex',
  gap: '12px',
  maxWidth: '600px',
  margin: '0 auto',
  background: 'white',
  padding: '8px',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
}

const searchInputStyle = {
  flex: '2',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px'
}

const selectStyle = {
  flex: '1',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  background: '#f8f9fa'
}

const searchBtnStyle = {
  whiteSpace: 'nowrap'
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
  padding: '20px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  flexWrap: 'wrap',
  gap: '16px'
}

const filterGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const filterLabelStyle = {
  fontWeight: '600',
  color: '#555'
}

const filterSelectStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px'
}

const resultsCountStyle = {
  color: '#7f8c8d',
  fontWeight: '600'
}

const resultsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '24px'
}

const providerCardStyle = {
  height: 'fit-content'
}

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '16px'
}

const providerImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  flexShrink: 0
}

const providerInfoStyle = {
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
  fontSize: '14px',
  marginBottom: '4px'
}

const locationStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}

const availabilityStyle = {
  flexShrink: 0
}

const statusBadgeStyle = {
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600'
}

const availableBadgeStyle = {
  background: '#d4edda',
  color: '#155724'
}

const unavailableBadgeStyle = {
  background: '#f8d7da',
  color: '#721c24'
}

const statsRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px'
}

const statStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const ratingStyle = {
  fontSize: '16px',
  fontWeight: '600'
}

const reviewsStyle = {
  fontSize: '14px',
  color: '#7f8c8d'
}

const experienceStyle = {
  fontSize: '14px',
  color: '#28a745',
  fontWeight: '600'
}

const specialtiesStyle = {
  marginBottom: '16px'
}

const tagsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px'
}

const tagStyle = {
  padding: '4px 8px',
  background: '#e9ecef',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#495057'
}

const cardFooterStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '16px',
  borderTop: '1px solid #eee'
}

const priceStyle = {
  fontSize: '16px',
  color: '#007bff'
}

const actionsStyle = {
  display: 'flex',
  gap: '8px'
}

const viewBtnStyle = {
  padding: '8px 16px',
  fontSize: '14px'
}

const bookBtnStyle = {
  padding: '8px 16px',
  fontSize: '14px'
}

const noResultsStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#7f8c8d'
}

const sectionTitleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  textAlign: 'center',
  color: '#2c3e50'
}

const categoryCardStyle = {
  textAlign: 'center',
  cursor: 'pointer'
}

const categoryIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const categoryNameStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const categoryCountStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}
