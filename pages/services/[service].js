import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function ServicePage() {
  const router = useRouter()
  const { service } = router.query
  
  const [selectedCity, setSelectedCity] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [priceRange, setPriceRange] = useState('all')

  // Service metadata
  const serviceInfo = {
    plumbing: {
      title: 'Plumbing Services',
      icon: '🔧',
      description: 'Professional plumbing services for all your home and office needs',
      services: ['Pipe Repair', 'Leak Fixing', 'Tap Installation', 'Toilet Repair', 'Water Heater Service']
    },
    electrical: {
      title: 'Electrical Services', 
      icon: '⚡',
      description: 'Certified electricians for safe and reliable electrical work',
      services: ['Wiring', 'Appliance Installation', 'Circuit Repair', 'Fan Installation', 'Switch Repair']
    },
    carpentry: {
      title: 'Carpentry Services',
      icon: '🔨', 
      description: 'Skilled carpenters for furniture and woodwork projects',
      services: ['Furniture Repair', 'Custom Furniture', 'Door Installation', 'Cabinet Work', 'Wood Polishing']
    },
    'ac-repair': {
      title: 'AC Repair Services',
      icon: '❄️',
      description: 'Professional AC maintenance and repair services',
      services: ['AC Servicing', 'Gas Refill', 'Installation', 'Maintenance', 'Repair']
    },
    painting: {
      title: 'Painting Services',
      icon: '🎨',
      description: 'Interior and exterior painting by experienced professionals',
      services: ['Interior Painting', 'Exterior Painting', 'Wall Texture', 'Colour Consultation', 'Touch-ups']
    },
    cleaning: {
      title: 'Cleaning Services',
      icon: '🧽',
      description: 'Comprehensive cleaning services for homes and offices',
      services: ['Deep Cleaning', 'Regular Cleaning', 'Carpet Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning']
    }
  }

  // Mock providers data filtered by service
  const allProviders = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      service: 'plumbing',
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
      service: 'electrical',
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
      service: 'cleaning',
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
      service: 'carpentry',
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
      service: 'ac-repair',
      city: 'Ahmedabad',
      rating: 4.8,
      reviews: 76,
      experience: 6,
      basePrice: 450,
      available: true,
      image: '👩‍💼',
      specialties: ['AC Servicing', 'Installation', 'Gas Refill']
    },
    {
      id: 6,
      name: 'Vikram Gupta',
      service: 'painting',
      city: 'Pune',
      rating: 4.5,
      reviews: 98,
      experience: 7,
      basePrice: 350,
      available: true,
      image: '👨‍🎨',
      specialties: ['Interior Painting', 'Exterior Work', 'Wall Texture']
    },
    {
      id: 7,
      name: 'Ravi Nair',
      service: 'plumbing',
      city: 'Mumbai',
      rating: 4.7,
      reviews: 89,
      experience: 6,
      basePrice: 450,
      available: true,
      image: '👨‍🔧',
      specialties: ['Bathroom Fitting', 'Pipe Work', 'Emergency Service']
    },
    {
      id: 8,
      name: 'Meera Joshi',
      service: 'electrical',
      city: 'Mumbai',
      rating: 4.6,
      reviews: 112,
      experience: 9,
      basePrice: 425,
      available: true,
      image: '👩‍💼',
      specialties: ['Home Wiring', 'Appliance Repair', 'Safety Checks']
    }
  ]

  const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune']

  // Get current service info
  const currentService = serviceInfo[service] || {
    title: 'Service',
    icon: '🔧',
    description: 'Professional services for your needs',
    services: []
  }

  // Filter providers by current service
  const serviceProviders = allProviders.filter(provider => provider.service === service)
  
  const filteredProviders = serviceProviders
    .filter(provider => {
      const matchesCity = !selectedCity || selectedCity === 'All Cities' || provider.city === selectedCity
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'low' && provider.basePrice <= 400) ||
                          (priceRange === 'medium' && provider.basePrice > 400 && provider.basePrice <= 600) ||
                          (priceRange === 'high' && provider.basePrice > 600)
      
      return matchesCity && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price') return a.basePrice - b.basePrice
      if (sortBy === 'experience') return b.experience - a.experience
      return 0
    })

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '20px', 
      fontSize: '12px',
      fontWeight: '600'
    }
    
    return status ? 
      { ...baseStyle, background: '#d4edda', color: '#155724' } :
      { ...baseStyle, background: '#f8d7da', color: '#721c24' }
  }

  if (!service) {
    return (
      <Layout title="Service - HandyFix">
        <div style={{padding: '100px 0', textAlign: 'center'}}>
          <h1>Loading...</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${currentService.title} - HandyFix`}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <div style={breadcrumbStyle}>
            <Link href="/" style={breadcrumbLinkStyle}>Home</Link> / 
            <Link href="/services" style={breadcrumbLinkStyle}>Services</Link> / 
            <span style={breadcrumbCurrentStyle}>{currentService.title}</span>
          </div>
          
          <div style={heroContentStyle}>
            <div style={heroIconStyle}>{currentService.icon}</div>
            <h1 style={heroTitleStyle}>{currentService.title}</h1>
            <p style={heroSubtitleStyle}>{currentService.description}</p>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section style={serviceTypesStyle}>
        <div className="container">
          <h2 style={sectionTitleStyle}>What We Offer</h2>
          <div style={serviceTagsStyle}>
            {currentService.services.map(serviceType => (
              <span key={serviceType} style={serviceTagStyle}>{serviceType}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section style={sectionStyle}>
        <div className="container">
          <div style={filtersStyle}>
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={filterSelectStyle}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
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
                    <p style={serviceTypeStyle}>{currentService.title}</p>
                    <p style={locationStyle}>📍 {provider.city}</p>
                  </div>
                  <div style={availabilityStyle}>
                    <span style={getStatusStyle(provider.available)}>
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
                    <Link href={`/provider/${provider.id}?book=true`} className="btn btn-primary" style={bookBtnStyle}>
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
              <Link href="/services" className="btn btn-primary">
                View All Services
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Services */}
      <section style={{...sectionStyle, background: 'white'}}>
        <div className="container">
          <h2 style={sectionTitleStyle}>Other Services You Might Need</h2>
          <div className="grid grid-4" style={{marginTop: '32px'}}>
            {Object.entries(serviceInfo)
              .filter(([key]) => key !== service)
              .slice(0, 4)
              .map(([key, info]) => (
                <Link key={key} href={`/services/${key}`} style={{textDecoration: 'none'}}>
                  <div className="card" style={otherServiceCardStyle}>
                    <div style={otherServiceIconStyle}>{info.icon}</div>
                    <h3 style={otherServiceNameStyle}>{info.title}</h3>
                    <p style={otherServiceCountStyle}>
                      {allProviders.filter(p => p.service === key).length} providers
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

const breadcrumbStyle = {
  marginBottom: '32px',
  fontSize: '14px',
  opacity: '0.9'
}

const breadcrumbLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 8px'
}

const breadcrumbCurrentStyle = {
  marginLeft: '8px',
  fontWeight: '600'
}

const heroContentStyle = {}

const heroIconStyle = {
  fontSize: '64px',
  marginBottom: '20px'
}

const heroTitleStyle = {
  fontSize: '42px',
  fontWeight: '700',
  marginBottom: '16px'
}

const heroSubtitleStyle = {
  fontSize: '18px',
  opacity: '0.9',
  maxWidth: '600px',
  margin: '0 auto'
}

const serviceTypesStyle = {
  padding: '40px 0',
  background: '#f8f9fa',
  textAlign: 'center'
}

const sectionTitleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#000000',
  marginBottom: '24px'
}

const serviceTagsStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '12px'
}

const serviceTagStyle = {
  padding: '8px 16px',
  background: '#007bff',
  color: 'white',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '500'
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
  height: 'fit-content',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)'
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
  fontWeight: '700',
  marginBottom: '4px',
  color: '#000000',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 8px',
  borderRadius: '4px',
  display: 'inline-block'
}

const serviceTypeStyle = {
  color: '#007bff',
  fontWeight: '600',
  fontSize: '14px',
  marginBottom: '4px',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block'
}

const locationStyle = {
  color: '#000000',
  fontSize: '14px',
  fontWeight: '600',
  background: 'rgba(255, 255, 255, 0.8)',
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block'
}

const availabilityStyle = {
  flexShrink: 0
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

const otherServiceCardStyle = {
  textAlign: 'center',
  cursor: 'pointer'
}

const otherServiceIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const otherServiceNameStyle = {
  fontSize: '18px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#000000',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block'
}

const otherServiceCountStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}
