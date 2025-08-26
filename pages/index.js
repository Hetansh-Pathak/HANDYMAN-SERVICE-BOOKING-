import RoleBasedLayout from '../components/RoleBasedLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { user, isProvider, isCustomer } = useUser()

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    { 
      id: 1, 
      name: 'Plumbing', 
      icon: '🔧', 
      desc: 'Pipe repairs, leak fixes, installation',
      color: '#007bff',
      providers: 45,
      avgPrice: '₹500',
      urgentAvailable: true
    },
    { 
      id: 2, 
      name: 'Electrical', 
      icon: '⚡', 
      desc: 'Wiring, appliance installation, repairs',
      color: '#ffc107',
      providers: 38,
      avgPrice: '₹600',
      urgentAvailable: true
    },
    { 
      id: 3, 
      name: 'Carpentry', 
      icon: '🔨', 
      desc: 'Furniture repair, custom woodwork',
      color: '#28a745',
      providers: 32,
      avgPrice: '₹800',
      urgentAvailable: false
    },
    { 
      id: 4, 
      name: 'AC Repair', 
      icon: '❄️', 
      desc: 'AC servicing, installation, maintenance',
      color: '#17a2b8',
      providers: 28,
      avgPrice: '₹700',
      urgentAvailable: true
    },
    { 
      id: 5, 
      name: 'Painting', 
      icon: '🎨', 
      desc: 'Interior and exterior painting',
      color: '#e83e8c',
      providers: 25,
      avgPrice: '₹400',
      urgentAvailable: false
    },
    { 
      id: 6, 
      name: 'Cleaning', 
      icon: '🧽', 
      desc: 'Deep cleaning, regular maintenance',
      color: '#6f42c1',
      providers: 42,
      avgPrice: '₹300',
      urgentAvailable: true
    }
  ]

  const featuredProviders = [
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      service: 'Plumbing', 
      rating: 4.8, 
      experience: 8, 
      image: '👨‍🔧',
      completedJobs: 245,
      responseTime: '15 min',
      verified: true,
      available: true
    },
    { 
      id: 2, 
      name: 'Amit Sharma', 
      service: 'Electrical', 
      rating: 4.9, 
      experience: 12, 
      image: '👨‍💼',
      completedJobs: 312,
      responseTime: '20 min',
      verified: true,
      available: true
    },
    { 
      id: 3, 
      name: 'Priya Singh', 
      service: 'Cleaning', 
      rating: 4.7, 
      experience: 5, 
      image: '👩‍💼',
      completedJobs: 189,
      responseTime: '25 min',
      verified: true,
      available: false
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Mumbai',
      rating: 5,
      text: 'Amazing service! The plumber arrived on time and fixed our leak quickly. Professional and affordable.',
      service: 'Plumbing',
      image: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Delhi',
      rating: 5,
      text: 'Found a great electrician through HandyFix. Quality work and reasonable prices. Highly recommend!',
      service: 'Electrical',
      image: '👨‍💼'
    },
    {
      id: 3,
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 4,
      text: 'Excellent platform for finding trusted service providers. The booking process is so easy!',
      service: 'Cleaning',
      image: '👩'
    }
  ]

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: '😊' },
    { label: 'Verified Providers', value: '2,500+', icon: '✅' },
    { label: 'Services Completed', value: '1,00,000+', icon: '🎯' },
    { label: 'Cities Covered', value: '25+', icon: '🏙️' }
  ]

  const handleSearch = () => {
    const query = searchQuery || selectedService
    if (query) {
      window.location.href = `/services?search=${encodeURIComponent(query)}`
    }
  }

  return (
    <RoleBasedLayout title="HandyFix - Find Trusted Local Service Providers">
      {/* Enhanced Hero Section */}
      <section style={heroStyle}>
        <div style={heroBackgroundStyle}></div>
        <div style={heroParticlesStyle}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{...particleStyle, animationDelay: `${i * 0.2}s`}}></div>
          ))}
        </div>
        
        <div className="container">
          <div style={heroContentStyle}>
            <div style={heroTextSectionStyle}>
              <div style={heroTaglineStyle}>
                <span style={heroTagIconStyle}>⭐</span>
                #1 Trusted Home Service Platform
              </div>
              
              <h1 style={heroTitleStyle}>
                Find Trusted{' '}
                <span style={highlightTextStyle}>
                  <span style={typewriterStyle}>Plumbers</span>
                </span>
                <br />
                <span style={sublineStyle}>Carpenters & Electricians</span>
                <br />
                <span style={locationStyle}>in Your City</span>
              </h1>
              
              <p style={heroSubtitleStyle}>
                Quick, reliable, and affordable home services at your doorstep. 
                Book verified professionals in minutes with instant quotes and real-time tracking.
              </p>
              
              {/* Enhanced Search Bar */}
              <div style={searchContainerStyle}>
                <div style={searchBarStyle}>
                  <div style={serviceSelectStyle}>
                    <span style={selectIconStyle}>🔧</span>
                    <select 
                      style={selectStyle}
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">Choose Service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={locationInputStyle}>
                    <span style={locationIconStyle}>📍</span>
                    <input 
                      type="text" 
                      placeholder="Enter city or pincode" 
                      style={inputStyle}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  
                  <button 
                    className="btn btn-primary" 
                    style={searchBtnStyle}
                    onClick={handleSearch}
                  >
                    <span style={searchBtnIconStyle}>🔍</span>
                    Find Services
                  </button>
                </div>
                
                <div style={searchTagsStyle}>
                  <span style={tagLabelStyle}>Popular:</span>
                  {['Plumbing', 'AC Repair', 'Electrical', 'Cleaning'].map(tag => (
                    <button 
                      key={tag}
                      style={tagStyle}
                      onClick={() => {
                        setSelectedService(tag)
                        setSearchQuery(tag)
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div style={trustIndicatorsStyle}>
                <div style={trustItemStyle}>
                  <span style={trustIconStyle}>✅</span>
                  <span>Verified Professionals</span>
                </div>
                <div style={trustItemStyle}>
                  <span style={trustIconStyle}>⚡</span>
                  <span>30-Sec Booking</span>
                </div>
                <div style={trustItemStyle}>
                  <span style={trustIconStyle}>🛡️</span>
                  <span>100% Secure</span>
                </div>
                <div style={trustItemStyle}>
                  <span style={trustIconStyle}>📞</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Hero Stats */}
            <div style={heroStatsStyle}>
              {stats.map((stat, index) => (
                <div key={index} style={statItemStyle} className="animate-on-scroll">
                  <div style={statIconStyle}>{stat.icon}</div>
                  <div style={statValueStyle}>{stat.value}</div>
                  <div style={statLabelStyle}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={howItWorksStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>How HandyFix Works</h2>
            <p style={sectionSubtitleStyle}>Get your home services done in 3 simple steps</p>
          </div>
          
          <div style={stepsContainerStyle}>
            {[
              { 
                step: '1', 
                title: 'Choose Service', 
                desc: 'Select from 50+ home services',
                icon: '🔍',
                color: '#007bff'
              },
              { 
                step: '2', 
                title: 'Book Instantly', 
                desc: 'Get matched with verified professionals',
                icon: '📱',
                color: '#28a745'
              },
              { 
                step: '3', 
                title: 'Get It Done', 
                desc: 'Relax while experts handle the work',
                icon: '✨',
                color: '#ffc107'
              }
            ].map((item, index) => (
              <div key={index} style={stepItemStyle} className="animate-on-scroll">
                <div style={{...stepIconStyle, backgroundColor: item.color + '20', color: item.color}}>
                  <span style={stepEmojiStyle}>{item.icon}</span>
                  <div style={{...stepNumberStyle, backgroundColor: item.color}}>{item.step}</div>
                </div>
                <h3 style={stepTitleStyle}>{item.title}</h3>
                <p style={stepDescStyle}>{item.desc}</p>
                {index < 2 && <div style={stepConnectorStyle}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section style={servicesStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>Our Services</h2>
            <p style={sectionSubtitleStyle}>Professional help for all your home and office needs</p>
          </div>
          
          <div className="grid grid-3" style={{marginTop: '60px'}}>
            {services.map((service, index) => (
              <Link 
                key={service.id} 
                href={`/services/${service.name.toLowerCase().replace(' ', '-')}`} 
                style={{textDecoration: 'none'}}
              >
                <div 
                  className="card animate-on-scroll hover-lift" 
                  style={{
                    ...serviceCardStyle,
                    borderTop: `4px solid ${service.color}`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={{...serviceIconStyle, color: service.color}}>
                    {service.icon}
                  </div>
                  <h3 style={serviceNameStyle}>{service.name}</h3>
                  <p style={serviceDescStyle}>{service.desc}</p>
                  
                  <div style={serviceMetricsStyle}>
                    <div style={metricStyle}>
                      <span style={metricIconStyle}>👥</span>
                      <span>{service.providers} providers</span>
                    </div>
                    <div style={metricStyle}>
                      <span style={metricIconStyle}>💰</span>
                      <span>From {service.avgPrice}</span>
                    </div>
                    {service.urgentAvailable && (
                      <div style={urgentBadgeStyle}>
                        <span>⚡ Emergency Available</span>
                      </div>
                    )}
                  </div>
                  
                  <div style={viewMoreStyle}>
                    <span>Book Now</span>
                    <span style={arrowStyle}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section style={providersStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>Featured Service Providers</h2>
            <p style={sectionSubtitleStyle}>Top-rated professionals in your area</p>
          </div>
          
          <div className="grid grid-3" style={{marginTop: '60px'}}>
            {featuredProviders.map((provider, index) => (
              <div 
                key={provider.id} 
                className="card animate-on-scroll hover-lift" 
                style={{
                  ...providerCardStyle,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={providerHeaderStyle}>
                  <div style={providerImageStyle}>
                    {provider.image}
                    {provider.verified && (
                      <div style={verifiedBadgeStyle}>✓</div>
                    )}
                    <div style={{
                      ...statusDotStyle,
                      backgroundColor: provider.available ? '#00ff00' : '#ff4444'
                    }}></div>
                  </div>
                  <div>
                    <h3 style={providerNameStyle}>{provider.name}</h3>
                    <p style={providerServiceStyle}>{provider.service} Specialist</p>
                    <div style={providerLocationStyle}>📍 Mumbai</div>
                  </div>
                </div>
                
                <div style={providerStatsStyle}>
                  <div style={ratingStyle}>
                    <div style={starsStyle}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          color: i < Math.floor(provider.rating) ? '#ffc107' : '#e0e0e0'
                        }}>⭐</span>
                      ))}
                    </div>
                    <span style={ratingValueStyle}>{provider.rating}</span>
                    <span style={ratingCountStyle}>({provider.completedJobs} jobs)</span>
                  </div>
                  
                  <div style={providerMetricsStyle}>
                    <div style={metricItemStyle}>
                      <span style={metricIconStyle}>⏱️</span>
                      <span>Responds in {provider.responseTime}</span>
                    </div>
                    <div style={metricItemStyle}>
                      <span style={metricIconStyle}>🎯</span>
                      <span>{provider.experience} years experience</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/provider/${provider.id}`} 
                  className="btn btn-primary" 
                  style={{width: '100%', marginTop: '20px'}}
                >
                  {provider.available ? 'Book Now' : 'View Profile'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={testimonialsStyle}>
        <div className="container">
          <div style={sectionHeaderStyle} className="animate-on-scroll">
            <h2 style={sectionTitleStyle}>What Our Customers Say</h2>
            <p style={sectionSubtitleStyle}>Real experiences from satisfied customers</p>
          </div>
          
          <div style={testimonialCarouselStyle}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{
                  ...testimonialCardStyle,
                  ...(index === currentTestimonial ? activeTestimonialStyle : inactiveTestimonialStyle)
                }}
              >
                <div style={testimonialContentStyle}>
                  <div style={quoteIconStyle}>"</div>
                  <p style={testimonialTextStyle}>{testimonial.text}</p>
                  
                  <div style={testimonialAuthorStyle}>
                    <div style={authorImageStyle}>{testimonial.image}</div>
                    <div>
                      <div style={authorNameStyle}>{testimonial.name}</div>
                      <div style={authorLocationStyle}>{testimonial.location}</div>
                      <div style={authorServiceStyle}>Used: {testimonial.service}</div>
                    </div>
                    <div style={testimonialRatingStyle}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} style={starStyle}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={testimonialDotsStyle}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                style={{
                  ...dotStyle,
                  ...(index === currentTestimonial ? activeDotStyle : {})
                }}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaStyle}>
        <div style={ctaBackgroundStyle}></div>
        <div className="container">
          <div style={ctaContentStyle} className="animate-on-scroll">
            <h2 style={ctaTitleStyle}>Ready to Get Started?</h2>
            <p style={ctaSubtitleStyle}>
              Join thousands of satisfied customers who trust HandyFix for their home service needs
            </p>
            
            <div style={ctaButtonsStyle}>
              {!user ? (
                <>
                  <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                    <span>🔍</span>
                    Find Services Now
                  </Link>
                  <Link href="/auth/provider-register" className="btn btn-glass" style={ctaBtnStyle}>
                    <span>🔧</span>
                    Become a Provider
                  </Link>
                </>
              ) : isCustomer ? (
                <>
                  <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                    <span>🔍</span>
                    Book a Service
                  </Link>
                  <Link href="/dashboard/user" className="btn btn-glass" style={ctaBtnStyle}>
                    <span>📊</span>
                    My Dashboard
                  </Link>
                </>
              ) : isProvider ? (
                <>
                  <Link href="/dashboard/provider" className="btn btn-success" style={ctaBtnStyle}>
                    <span>📊</span>
                    Provider Dashboard
                  </Link>
                  <Link href="/provider/profile" className="btn btn-glass" style={ctaBtnStyle}>
                    <span>⚙️</span>
                    Manage Profile
                  </Link>
                </>
              ) : (
                <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
                  <span>🔍</span>
                  Explore Services
                </Link>
              )}
            </div>
            
            <div style={ctaStatsStyle}>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>4.8/5</span>
                <span style={ctaStatLabelStyle}>Average Rating</span>
              </div>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>< 30 min</span>
                <span style={ctaStatLabelStyle}>Response Time</span>
              </div>
              <div style={ctaStatStyle}>
                <span style={ctaStatValueStyle}>24/7</span>
                <span style={ctaStatLabelStyle}>Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RoleBasedLayout>
  )
}

// Enhanced Styles with Animations
const heroStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
  color: 'white',
  padding: '120px 0 80px',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden'
}

const heroBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
  animation: 'backgroundFloat 20s ease-in-out infinite'
}

const heroParticlesStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden'
}

const particleStyle = {
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '50%',
  animation: 'floatParticle 15s linear infinite',
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%'
}

const heroContentStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '80px',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1
}

const heroTextSectionStyle = {
  animation: 'fadeInLeft 1s ease-out'
}

const heroTaglineStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '8px 16px',
  borderRadius: '25px',
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '24px',
  border: '1px solid rgba(255, 255, 255, 0.2)'
}

const heroTagIconStyle = {
  fontSize: '16px',
  animation: 'spin 3s linear infinite'
}

const heroTitleStyle = {
  fontSize: 'clamp(36px, 5vw, 64px)',
  fontWeight: '800',
  marginBottom: '24px',
  lineHeight: '1.1',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const highlightTextStyle = {
  position: 'relative',
  display: 'inline-block'
}

const typewriterStyle = {
  color: '#ffd700',
  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
  animation: 'glow 2s ease-in-out infinite alternate'
}

const sublineStyle = {
  color: '#e0e8ff'
}

const locationStyle = {
  color: '#c7d2fe'
}

const heroSubtitleStyle = {
  fontSize: '20px',
  marginBottom: '40px',
  opacity: '0.9',
  lineHeight: '1.6',
  maxWidth: '600px'
}

const searchContainerStyle = {
  marginBottom: '40px'
}

const searchBarStyle = {
  display: 'flex',
  gap: '0',
  maxWidth: '700px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  padding: '8px',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginBottom: '16px'
}

const serviceSelectStyle = {
  position: 'relative',
  flex: '1'
}

const selectIconStyle = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '16px',
  color: '#666',
  zIndex: 2
}

const selectStyle = {
  flex: '1',
  padding: '16px 16px 16px 48px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  background: 'transparent',
  color: '#333',
  fontWeight: '500'
}

const locationInputStyle = {
  position: 'relative',
  flex: '2'
}

const locationIconStyle = {
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '16px',
  color: '#666',
  zIndex: 2
}

const inputStyle = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  background: 'transparent',
  color: '#333'
}

const searchBtnStyle = {
  whiteSpace: 'nowrap',
  borderRadius: '12px',
  padding: '16px 24px',
  fontSize: '16px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

const searchBtnIconStyle = {
  fontSize: '16px'
}

const searchTagsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap'
}

const tagLabelStyle = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  fontWeight: '500'
}

const tagStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const trustIndicatorsStyle = {
  display: 'flex',
  gap: '32px',
  flexWrap: 'wrap'
}

const trustItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '500'
}

const trustIconStyle = {
  fontSize: '16px'
}

const heroStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  animation: 'fadeInRight 1s ease-out 0.5s both'
}

const statItemStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '24px',
  borderRadius: '16px',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const statIconStyle = {
  fontSize: '32px',
  marginBottom: '12px',
  display: 'block'
}

const statValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#ffd700',
  display: 'block',
  marginBottom: '4px'
}

const statLabelStyle = {
  fontSize: '12px',
  opacity: '0.8',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const howItWorksStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '60px',
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const sectionTitleStyle = {
  fontSize: '42px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #2c3e50, #3498db)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const sectionSubtitleStyle = {
  fontSize: '18px',
  color: '#7f8c8d',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: '1.6'
}

const stepsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '40px',
  position: 'relative'
}

const stepItemStyle = {
  textAlign: 'center',
  position: 'relative',
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const stepIconStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  position: 'relative',
  fontSize: '32px',
  transition: 'all 0.3s ease'
}

const stepEmojiStyle = {
  fontSize: '32px'
}

const stepNumberStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: '700'
}

const stepTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '12px'
}

const stepDescStyle = {
  color: '#7f8c8d',
  fontSize: '16px',
  lineHeight: '1.5'
}

const stepConnectorStyle = {
  position: 'absolute',
  top: '40px',
  right: '-20px',
  fontSize: '24px',
  color: '#ddd',
  zIndex: -1
}

const servicesStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
}

const serviceCardStyle = {
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const serviceIconStyle = {
  fontSize: '56px',
  marginBottom: '24px',
  display: 'block',
  transition: 'transform 0.3s ease'
}

const serviceNameStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#2c3e50'
}

const serviceDescStyle = {
  color: '#7f8c8d',
  marginBottom: '20px',
  lineHeight: '1.5'
}

const serviceMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px'
}

const metricStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontSize: '14px',
  color: '#666'
}

const metricIconStyle = {
  fontSize: '14px'
}

const urgentBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600',
  display: 'inline-block',
  animation: 'pulse 2s infinite'
}

const viewMoreStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#007bff',
  fontWeight: '600',
  marginTop: 'auto'
}

const arrowStyle = {
  transition: 'transform 0.3s ease'
}

const providersStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const providerCardStyle = {
  height: '100%',
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const providerHeaderStyle = {
  display: 'flex',
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
  border: '3px solid #fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
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
  fontWeight: '600',
  border: '2px solid white'
}

const statusDotStyle = {
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: '3px solid white',
  animation: 'pulse 2s infinite'
}

const providerNameStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const providerServiceStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const providerLocationStyle = {
  fontSize: '12px',
  color: '#666'
}

const providerStatsStyle = {
  marginBottom: '20px'
}

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px'
}

const starsStyle = {
  display: 'flex',
  gap: '2px'
}

const ratingValueStyle = {
  fontWeight: '600',
  color: '#2c3e50'
}

const ratingCountStyle = {
  fontSize: '12px',
  color: '#666'
}

const providerMetricsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}

const metricItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '13px',
  color: '#666'
}

const testimonialsStyle = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden'
}

const testimonialCarouselStyle = {
  position: 'relative',
  height: '300px',
  margin: '60px 0 40px'
}

const testimonialCardStyle = {
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '600px',
  transition: 'all 0.5s ease'
}

const activeTestimonialStyle = {
  opacity: '1',
  transform: 'translateX(-50%) scale(1)'
}

const inactiveTestimonialStyle = {
  opacity: '0',
  transform: 'translateX(-50%) scale(0.8)',
  pointerEvents: 'none'
}

const testimonialContentStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  padding: '40px',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  textAlign: 'center'
}

const quoteIconStyle = {
  fontSize: '48px',
  color: 'rgba(255, 255, 255, 0.3)',
  marginBottom: '20px'
}

const testimonialTextStyle = {
  fontSize: '18px',
  lineHeight: '1.6',
  marginBottom: '30px',
  fontStyle: 'italic'
}

const testimonialAuthorStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  justifyContent: 'center'
}

const authorImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px'
}

const authorNameStyle = {
  fontWeight: '600',
  fontSize: '16px'
}

const authorLocationStyle = {
  fontSize: '14px',
  opacity: '0.8'
}

const authorServiceStyle = {
  fontSize: '12px',
  opacity: '0.7'
}

const testimonialRatingStyle = {
  display: 'flex',
  gap: '2px'
}

const starStyle = {
  fontSize: '16px'
}

const testimonialDotsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px'
}

const dotStyle = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.3)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}

const activeDotStyle = {
  background: 'white',
  transform: 'scale(1.2)'
}

const ctaStyle = {
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: 'white',
  padding: '100px 0',
  position: 'relative',
  overflow: 'hidden'
}

const ctaBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
  animation: 'backgroundFloat 15s ease-in-out infinite reverse'
}

const ctaContentStyle = {
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  opacity: '0',
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s ease-out forwards'
}

const ctaTitleStyle = {
  fontSize: '42px',
  fontWeight: '700',
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #ffffff, #e3f2fd)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

const ctaSubtitleStyle = {
  fontSize: '18px',
  marginBottom: '40px',
  opacity: '0.9',
  maxWidth: '600px',
  margin: '0 auto 40px'
}

const ctaButtonsStyle = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '60px'
}

const ctaBtnStyle = {
  fontSize: '16px',
  padding: '16px 32px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '200px'
}

const ctaStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '40px',
  maxWidth: '600px',
  margin: '0 auto'
}

const ctaStatStyle = {
  textAlign: 'center'
}

const ctaStatValueStyle = {
  display: 'block',
  fontSize: '28px',
  fontWeight: '700',
  color: '#ffd700',
  marginBottom: '8px'
}

const ctaStatLabelStyle = {
  fontSize: '14px',
  opacity: '0.8',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

// Add CSS animations
const animations = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes backgroundFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }
  
  @keyframes floatParticle {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes glow {
    from { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
    to { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
  }
`

// Inject animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = animations
  document.head.appendChild(style)
}