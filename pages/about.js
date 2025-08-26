import Layout from '../components/Layout'
import Link from 'next/link'

export default function About() {
  const teamMembers = [
    {
      name: 'Rahul Sharma',
      role: 'CEO & Founder',
      image: '👨‍💼',
      description: 'Experienced entrepreneur with 10+ years in service industry'
    },
    {
      name: 'Priya Patel',
      role: 'CTO',
      image: '👩‍💻',
      description: 'Tech leader with expertise in platform development and scaling'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Operations',
      image: '👨‍💼',
      description: 'Operations expert ensuring quality service delivery'
    }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'HandyFix launched in Mumbai with 50+ service providers'
    },
    {
      year: '2023',
      title: '1000+ Customers',
      description: 'Reached our first milestone of 1000 satisfied customers'
    },
    {
      year: '2024',
      title: 'Multi-city Expansion',
      description: 'Expanded to Delhi, Bangalore, and Pune markets'
    },
    {
      year: '2024',
      title: 'Mobile App Launch',
      description: 'Launched mobile apps for iOS and Android platforms'
    }
  ]

  return (
    <Layout title="About Us - HandyFix">
      {/* Hero Section */}
      <section style={heroStyle}>
        <div className="container">
          <h1 style={heroTitleStyle}>About HandyFix</h1>
          <p style={heroSubtitleStyle}>
            Connecting communities with trusted service professionals
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={missionSectionStyle}>
        <div className="container">
          <div className="grid grid-2" style={missionGridStyle}>
            <div className="card" style={missionCardStyle}>
              <div style={missionIconStyle}>🎯</div>
              <h2 style={missionTitleStyle}>Our Mission</h2>
              <p style={missionTextStyle}>
                To make quality home and office services accessible to everyone by connecting 
                customers with verified, skilled professionals in their neighborhood. We believe 
                in creating opportunities for service providers while ensuring convenience and 
                reliability for our customers.
              </p>
            </div>

            <div className="card" style={missionCardStyle}>
              <div style={missionIconStyle}>🌟</div>
              <h2 style={missionTitleStyle}>Our Vision</h2>
              <p style={missionTextStyle}>
                To become India's most trusted platform for local services, empowering millions 
                of skilled professionals and serving every household with excellence. We envision 
                a future where finding reliable service providers is as easy as a few taps on 
                your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={storyStyle}>
        <div className="container">
          <div style={storyContentStyle}>
            <div style={storyTextStyle}>
              <h2 style={sectionTitleStyle}>Our Story</h2>
              <p style={storyParagraphStyle}>
                HandyFix was born out of a simple frustration - finding reliable service providers 
                when you need them most. Our founders experienced the common struggle of locating 
                trustworthy plumbers, electricians, and other professionals during emergencies.
              </p>
              <p style={storyParagraphStyle}>
                In 2023, we decided to solve this problem by creating a platform that connects 
                customers with verified, skilled professionals in their area. What started as a 
                solution for our own needs has now grown into a trusted marketplace serving 
                thousands of customers across multiple cities.
              </p>
              <p style={storyParagraphStyle}>
                Today, HandyFix is more than just a service platform - we're a community that 
                believes in empowering local professionals while providing exceptional service 
                experiences to our customers.
              </p>
            </div>
            <div style={storyImageStyle}>
              <div style={placeholderImageStyle}>
                🏠<br/>Our Journey
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={valuesStyle}>
        <div className="container">
          <h2 style={valuesTitleStyle}>Our Core Values</h2>
          <div className="grid grid-3" style={valuesGridStyle}>
            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>🤝</div>
              <h3 style={valueHeadingStyle}>Trust</h3>
              <p style={valueTextStyle}>
                Every service provider is thoroughly verified to ensure safety and reliability 
                for our customers.
              </p>
            </div>

            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>⚡</div>
              <h3 style={valueHeadingStyle}>Convenience</h3>
              <p style={valueTextStyle}>
                Book services anytime, anywhere with our easy-to-use platform and quick 
                response times.
              </p>
            </div>

            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>🎯</div>
              <h3 style={valueHeadingStyle}>Quality</h3>
              <p style={valueTextStyle}>
                We maintain high standards through our rating system and continuous feedback 
                monitoring.
              </p>
            </div>

            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>💪</div>
              <h3 style={valueHeadingStyle}>Empowerment</h3>
              <p style={valueTextStyle}>
                We empower local professionals by providing them with tools and opportunities 
                to grow their business.
              </p>
            </div>

            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>🌱</div>
              <h3 style={valueHeadingStyle}>Growth</h3>
              <p style={valueTextStyle}>
                We're committed to continuous improvement and expanding our services to serve 
                more communities.
              </p>
            </div>

            <div className="card text-center" style={valueCardStyle}>
              <div style={valueIconStyle}>💬</div>
              <h3 style={valueHeadingStyle}>Transparency</h3>
              <p style={valueTextStyle}>
                Clear pricing, honest reviews, and open communication form the foundation of 
                our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={teamStyle}>
        <div className="container">
          <h2 style={teamTitleStyle}>Meet Our Team</h2>
          <p style={teamSubtitleStyle}>
            The passionate people behind HandyFix
          </p>

          <div className="grid grid-3" style={teamGridStyle}>
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center" style={teamCardStyle}>
                <div style={teamImageStyle}>{member.image}</div>
                <h3 style={teamNameStyle}>{member.name}</h3>
                <p style={teamRoleStyle}>{member.role}</p>
                <p style={teamDescStyle}>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section style={milestonesStyle}>
        <div className="container">
          <h2 style={milestonesTitleStyle}>Our Journey</h2>
          <div style={timelineStyle}>
            {milestones.map((milestone, index) => (
              <div key={index} style={timelineItemStyle}>
                <div style={timelineYearStyle}>{milestone.year}</div>
                <div style={timelineContentStyle}>
                  <h3 style={timelineTitleStyle}>{milestone.title}</h3>
                  <p style={timelineDescStyle}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={statsStyle}>
        <div className="container">
          <div className="grid grid-4" style={statsGridStyle}>
            <div className="card text-center" style={statCardStyle}>
              <div style={statNumberStyle}>2000+</div>
              <div style={statLabelStyle}>Happy Customers</div>
            </div>
            
            <div className="card text-center" style={statCardStyle}>
              <div style={statNumberStyle}>500+</div>
              <div style={statLabelStyle}>Service Providers</div>
            </div>
            
            <div className="card text-center" style={statCardStyle}>
              <div style={statNumberStyle}>50+</div>
              <div style={statLabelStyle}>Cities Served</div>
            </div>
            
            <div className="card text-center" style={statCardStyle}>
              <div style={statNumberStyle}>98%</div>
              <div style={statLabelStyle}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={ctaStyle}>
        <div className="container text-center">
          <h2 style={ctaTitleStyle}>Ready to Get Started?</h2>
          <p style={ctaSubtitleStyle}>
            Join thousands of satisfied customers or become a service provider today
          </p>
          <div style={ctaButtonsStyle}>
            <Link href="/services" className="btn btn-primary" style={ctaBtnStyle}>
              Book a Service
            </Link>
            <Link href="/auth/provider-register" className="btn btn-outline" style={ctaBtnStyle}>
              Become a Provider
            </Link>
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
  padding: '100px 0',
  textAlign: 'center'
}

const heroTitleStyle = {
  fontSize: '48px',
  fontWeight: '700',
  marginBottom: '16px'
}

const heroSubtitleStyle = {
  fontSize: '22px',
  opacity: '0.9',
  maxWidth: '600px',
  margin: '0 auto'
}

const missionSectionStyle = {
  padding: '80px 0',
  background: '#f8f9fa'
}

const missionGridStyle = {
  gap: '40px'
}

const missionCardStyle = {
  padding: '40px',
  textAlign: 'center'
}

const missionIconStyle = {
  fontSize: '64px',
  marginBottom: '24px'
}

const missionTitleStyle = {
  fontSize: '28px',
  fontWeight: '700',
  marginBottom: '20px',
  color: '#2c3e50'
}

const missionTextStyle = {
  fontSize: '16px',
  lineHeight: '1.8',
  color: '#555'
}

const storyStyle = {
  padding: '80px 0',
  background: 'white'
}

const storyContentStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '60px',
  alignItems: 'center'
}

const storyTextStyle = {}

const sectionTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '32px',
  color: '#2c3e50'
}

const storyParagraphStyle = {
  fontSize: '16px',
  lineHeight: '1.8',
  marginBottom: '20px',
  color: '#555'
}

const storyImageStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const placeholderImageStyle = {
  width: '300px',
  height: '300px',
  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  textAlign: 'center',
  color: '#1976d2',
  fontWeight: '600'
}

const valuesStyle = {
  padding: '80px 0',
  background: '#f8f9fa'
}

const valuesTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '60px',
  color: '#2c3e50'
}

const valuesGridStyle = {
  gap: '24px'
}

const valueCardStyle = {
  padding: '32px'
}

const valueIconStyle = {
  fontSize: '48px',
  marginBottom: '20px'
}

const valueHeadingStyle = {
  fontSize: '22px',
  fontWeight: '600',
  marginBottom: '16px',
  color: '#2c3e50'
}

const valueTextStyle = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#555'
}

const teamStyle = {
  padding: '80px 0',
  background: 'white'
}

const teamTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '16px',
  color: '#2c3e50'
}

const teamSubtitleStyle = {
  fontSize: '18px',
  textAlign: 'center',
  color: '#7f8c8d',
  marginBottom: '60px'
}

const teamGridStyle = {
  gap: '32px'
}

const teamCardStyle = {
  padding: '32px'
}

const teamImageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: '#e9ecef',
  margin: '0 auto 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px'
}

const teamNameStyle = {
  fontSize: '22px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const teamRoleStyle = {
  fontSize: '16px',
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '16px'
}

const teamDescStyle = {
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.6'
}

const milestonesStyle = {
  padding: '80px 0',
  background: '#f8f9fa'
}

const milestonesTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: '60px',
  color: '#2c3e50'
}

const timelineStyle = {
  maxWidth: '800px',
  margin: '0 auto'
}

const timelineItemStyle = {
  display: 'flex',
  gap: '40px',
  marginBottom: '40px',
  alignItems: 'center'
}

const timelineYearStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#007bff',
  minWidth: '100px'
}

const timelineContentStyle = {
  flex: '1',
  padding: '24px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const timelineTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const timelineDescStyle = {
  color: '#555',
  lineHeight: '1.6'
}

const statsStyle = {
  padding: '80px 0',
  background: '#2c3e50',
  color: 'white'
}

const statsGridStyle = {
  gap: '24px'
}

const statCardStyle = {
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  color: 'white',
  padding: '32px'
}

const statNumberStyle = {
  fontSize: '48px',
  fontWeight: '700',
  marginBottom: '12px',
  color: '#ffd700'
}

const statLabelStyle = {
  fontSize: '18px',
  fontWeight: '500'
}

const ctaStyle = {
  padding: '80px 0',
  background: 'white'
}

const ctaTitleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '16px',
  color: '#2c3e50'
}

const ctaSubtitleStyle = {
  fontSize: '18px',
  color: '#7f8c8d',
  marginBottom: '40px'
}

const ctaButtonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap'
}

const ctaBtnStyle = {
  padding: '16px 32px',
  fontSize: '18px',
  fontWeight: '600'
}
