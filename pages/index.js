import RoleBasedLayout from '../components/RoleBasedLayout'
import Link from 'next/link'

export default function Home() {
  const services = [
    { id: 1, name: 'Plumbing', icon: '🔧', desc: 'Pipe repairs, leak fixes, installation' },
    { id: 2, name: 'Electrical', icon: '⚡', desc: 'Wiring, appliance installation, repairs' },
    { id: 3, name: 'Carpentry', icon: '🔨', desc: 'Furniture repair, custom woodwork' },
    { id: 4, name: 'AC Repair', icon: '❄️', desc: 'AC servicing, installation, maintenance' },
    { id: 5, name: 'Painting', icon: '🎨', desc: 'Interior and exterior painting' },
    { id: 6, name: 'Cleaning', icon: '🧽', desc: 'Deep cleaning, regular maintenance' }
  ]

  const featuredProviders = [
    { id: 1, name: 'Rajesh Kumar', service: 'Plumbing', rating: 4.8, experience: 8, image: '👨‍🔧' },
    { id: 2, name: 'Amit Sharma', service: 'Electrical', rating: 4.9, experience: 12, image: '👨‍💼' },
    { id: 3, name: 'Priya Singh', service: 'Cleaning', rating: 4.7, experience: 5, image: '👩‍💼' }
  ]

  return (
    <RoleBasedLayout title="HandyFix - Find Trusted Local Service Providers">
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>
              Find Trusted <span style={highlightStyle}>Plumbers, Carpenters & Electricians</span> in Your City
            </h1>
            <p style={heroSubtitleStyle}>
              Quick, reliable, and affordable home services at your doorstep. 
              Book verified professionals in minutes.
            </p>
            
            <div style={searchBarStyle}>
              <select style={selectStyle}>
                <option>Choose Service</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
                <option>AC Repair</option>
                <option>Painting</option>
                <option>Cleaning</option>
              </select>
              <input 
                type="text" 
                placeholder="Enter city or pincode" 
                style={inputStyle}
              />
              <button className="btn btn-primary" style={searchBtnStyle}>
                Search Services
              </button>
            </div>

            <div style={statsStyle}>
              <div style={statItemStyle}>
                <strong>500+</strong><br/>Service Providers
              </div>
              <div style={statItemStyle}>
                <strong>2000+</strong><br/>Happy Customers
              </div>
              <div style={statItemStyle}>
                <strong>24/7</strong><br/>Support Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={sectionStyle}>
        <div className="container">
          <h2 style={sectionTitleStyle}>Our Services</h2>
          <p style={sectionSubtitleStyle}>Professional help for all your home and office needs</p>
          
          <div className="grid grid-3" style={{marginTop: '40px'}}>
            {services.map(service => (
              <Link key={service.id} href={`/services/${service.name.toLowerCase().replace(' ', '-')}`} style={{textDecoration: 'none'}}>
                <div className="card" style={serviceCardStyle}>
                  <div style={serviceIconStyle}>{service.icon}</div>
                  <h3 style={serviceNameStyle}>{service.name}</h3>
                  <p style={serviceDescStyle}>{service.desc}</p>
                  <span style={viewMoreStyle}>View Providers →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section style={{...sectionStyle, background: 'white'}}>
        <div className="container">
          <h2 style={sectionTitleStyle}>Featured Service Providers</h2>
          <p style={sectionSubtitleStyle}>Top-rated professionals in your area</p>
          
          <div className="grid grid-3" style={{marginTop: '40px'}}>
            {featuredProviders.map(provider => (
              <div key={provider.id} className="card">
                <div style={providerHeaderStyle}>
                  <div style={providerImageStyle}>{provider.image}</div>
                  <div>
                    <h3 style={providerNameStyle}>{provider.name}</h3>
                    <p style={providerServiceStyle}>{provider.service} Specialist</p>
                  </div>
                </div>
                
                <div style={providerStatsStyle}>
                  <div style={ratingStyle}>
                    ⭐ {provider.rating} <span style={ratingCountStyle}>(150+ reviews)</span>
                  </div>
                  <div style={experienceStyle}>
                    {provider.experience} years experience
                  </div>
                </div>

                <Link href={`/provider/${provider.id}`} className="btn btn-primary" style={{width: '100%', marginTop: '16px'}}>
                  View Profile & Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={ctaStyle}>
        <div className="container text-center">
          <h2 style={ctaTitleStyle}>Ready to Get Started?</h2>
          <p style={ctaSubtitleStyle}>Join thousands of satisfied customers who trust HandyFix</p>
          <div style={ctaButtonsStyle}>
            <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
              Book a Service Now
            </Link>
            <Link href="/auth/provider-register" className="btn btn-outline" style={ctaBtnStyle}>
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </RoleBasedLayout>
  )
}

// Styles
const heroStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '80px 0',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center'
}

const heroContentStyle = {
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto'
}

const heroTitleStyle = {
  fontSize: '48px',
  fontWeight: '700',
  marginBottom: '20px',
  lineHeight: '1.2'
}

const highlightStyle = {
  color: '#ffd700'
}

const heroSubtitleStyle = {
  fontSize: '20px',
  marginBottom: '40px',
  opacity: '0.9'
}

const searchBarStyle = {
  display: 'flex',
  gap: '12px',
  maxWidth: '600px',
  margin: '0 auto 50px',
  background: 'white',
  padding: '8px',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
}

const selectStyle = {
  flex: '1',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  background: '#f8f9fa'
}

const inputStyle = {
  flex: '2',
  padding: '12px 16px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px'
}

const searchBtnStyle = {
  whiteSpace: 'nowrap'
}

const statsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '60px',
  marginTop: '40px'
}

const statItemStyle = {
  textAlign: 'center',
  fontSize: '18px'
}

const sectionStyle = {
  padding: '80px 0',
  background: '#f8f9fa'
}

const sectionTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '16px',
  color: '#2c3e50'
}

const sectionSubtitleStyle = {
  fontSize: '18px',
  textAlign: 'center',
  color: '#7f8c8d',
  maxWidth: '600px',
  margin: '0 auto'
}

const serviceCardStyle = {
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const serviceIconStyle = {
  fontSize: '48px',
  marginBottom: '20px'
}

const serviceNameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#2c3e50'
}

const serviceDescStyle = {
  color: '#7f8c8d',
  marginBottom: '16px'
}

const viewMoreStyle = {
  color: '#007bff',
  fontWeight: '600'
}

const providerHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '20px'
}

const providerImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const providerNameStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const providerServiceStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}

const providerStatsStyle = {
  marginBottom: '16px'
}

const ratingStyle = {
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '8px'
}

const ratingCountStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: 'normal'
}

const experienceStyle = {
  fontSize: '14px',
  color: '#28a745',
  fontWeight: '600'
}

const ctaStyle = {
  background: 'linear-gradient(135deg, #2c3e50, #34495e)',
  color: 'white',
  padding: '80px 0'
}

const ctaTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '16px'
}

const ctaSubtitleStyle = {
  fontSize: '18px',
  marginBottom: '40px',
  opacity: '0.9'
}

const ctaButtonsStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const ctaBtnStyle = {
  fontSize: '18px',
  padding: '16px 32px'
}
