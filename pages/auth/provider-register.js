import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function ProviderRegister() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Business Info
    businessName: '',
    experience: '',
    services: [],
    serviceArea: '',
    city: '',
    pincode: '',
    
    // Pricing & Availability
    basePrice: '',
    availability: {
      monday: { start: '09:00', end: '18:00', available: true },
      tuesday: { start: '09:00', end: '18:00', available: true },
      wednesday: { start: '09:00', end: '18:00', available: true },
      thursday: { start: '09:00', end: '18:00', available: true },
      friday: { start: '09:00', end: '18:00', available: true },
      saturday: { start: '09:00', end: '18:00', available: true },
      sunday: { start: '10:00', end: '16:00', available: false }
    },
    
    // Documents
    idProof: null,
    experienceCertificate: null,
    profilePhoto: null,
    
    agreeToTerms: false
  })

  const serviceOptions = [
    'Plumbing', 'Electrical', 'Carpentry', 'AC Repair', 
    'Painting', 'Cleaning', 'Appliance Repair', 'Pest Control'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    
    // Handle registration logic here
    console.log('Provider registration:', formData)
    alert('Registration submitted! You will be notified once your profile is verified.')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleServiceChange = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service]
    
    setFormData({
      ...formData,
      services: updatedServices
    })
  }

  const handleAvailabilityChange = (day, field, value) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: {
          ...formData.availability[day],
          [field]: value
        }
      }
    })
  }

  const renderStepIndicator = () => (
    <div style={stepIndicatorStyle}>
      {[1, 2, 3, 4].map(step => (
        <div key={step} style={{
          ...stepStyle,
          ...(step === currentStep ? activeStepStyle : {}),
          ...(step < currentStep ? completedStepStyle : {})
        }}>
          {step}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div>
      <h2 style={stepTitleStyle}>Personal Information</h2>
      
      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="+91 12345 67890"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div>
      <h2 style={stepTitleStyle}>Business Information</h2>
      
      <div className="form-group">
        <label htmlFor="businessName" className="form-label">Business Name (Optional)</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          className="form-input"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="experience" className="form-label">Years of Experience *</label>
          <select
            id="experience"
            name="experience"
            className="form-input"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="basePrice" className="form-label">Base Service Charge (₹) *</label>
          <input
            type="number"
            id="basePrice"
            name="basePrice"
            className="form-input"
            placeholder="e.g., 500"
            value={formData.basePrice}
            onChange={handleChange}
            required
            min="100"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Services Offered * (Select all that apply)</label>
        <div style={servicesGridStyle}>
          {serviceOptions.map(service => (
            <label key={service} style={serviceCheckboxStyle}>
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceChange(service)}
                style={checkboxStyle}
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-2">
        <div className="form-group">
          <label htmlFor="city" className="form-label">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pincode" className="form-label">Pincode *</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="form-input"
            placeholder="Enter pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            pattern="[0-9]{6}"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="serviceArea" className="form-label">Service Area Description *</label>
        <textarea
          id="serviceArea"
          name="serviceArea"
          className="form-input"
          placeholder="Describe the areas you serve (e.g., North Mumbai, South Delhi, etc.)"
          value={formData.serviceArea}
          onChange={handleChange}
          required
          rows="3"
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div>
      <h2 style={stepTitleStyle}>Availability Schedule</h2>
      <p style={stepDescStyle}>Set your working hours for each day of the week</p>
      
      <div style={availabilityGridStyle}>
        {Object.entries(formData.availability).map(([day, schedule]) => (
          <div key={day} style={dayScheduleStyle}>
            <div style={dayHeaderStyle}>
              <label style={dayLabelStyle}>
                <input
                  type="checkbox"
                  checked={schedule.available}
                  onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                  style={checkboxStyle}
                />
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
            </div>
            
            {schedule.available && (
              <div style={timeInputsStyle}>
                <input
                  type="time"
                  value={schedule.start}
                  onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                  style={timeInputStyle}
                />
                <span>to</span>
                <input
                  type="time"
                  value={schedule.end}
                  onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                  style={timeInputStyle}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div>
      <h2 style={stepTitleStyle}>Document Upload & Verification</h2>
      <p style={stepDescStyle}>Upload required documents for verification</p>
      
      <div className="form-group">
        <label htmlFor="profilePhoto" className="form-label">Profile Photo *</label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          className="form-input"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <small style={helpTextStyle}>Upload a clear photo of yourself (Max 5MB)</small>
      </div>

      <div className="form-group">
        <label htmlFor="idProof" className="form-label">Government ID Proof *</label>
        <input
          type="file"
          id="idProof"
          name="idProof"
          className="form-input"
          accept="image/*,.pdf"
          onChange={handleChange}
          required
        />
        <small style={helpTextStyle}>Aadhaar Card, PAN Card, or Driving License (Max 5MB)</small>
      </div>

      <div className="form-group">
        <label htmlFor="experienceCertificate" className="form-label">Experience Certificate (Optional)</label>
        <input
          type="file"
          id="experienceCertificate"
          name="experienceCertificate"
          className="form-input"
          accept="image/*,.pdf"
          onChange={handleChange}
        />
        <small style={helpTextStyle}>Any certificate showing your work experience (Max 5MB)</small>
      </div>

      <div className="form-group">
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            style={checkboxStyle}
            required
          />
          I agree to the{' '}
          <Link href="/terms" style={linkStyle}>Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" style={linkStyle}>Privacy Policy</Link>.
          I understand that my profile will be reviewed before approval.
        </label>
      </div>
    </div>
  )

  return (
    <Layout title="Provider Registration - HandyFix">
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Become a Service Provider</h1>
            <p style={subtitleStyle}>Join our network of trusted professionals</p>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit} style={formStyle}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div style={buttonContainerStyle}>
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={prevBtnStyle}
                >
                  Previous
                </button>
              )}
              
              <button type="submit" className="btn btn-primary" style={nextBtnStyle}>
                {currentStep === 4 ? 'Submit Application' : 'Next Step'}
              </button>
            </div>
          </form>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              Already have an account?{' '}
              <Link href="/auth/login" style={linkStyle}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const containerStyle = {
  minHeight: '80vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 0'
}

const formContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  background: 'white',
  borderRadius: '16px',
  padding: '40px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '32px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  color: '#2c3e50'
}

const subtitleStyle = {
  color: '#7f8c8d',
  fontSize: '18px'
}

const stepIndicatorStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '40px'
}

const stepStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#e9ecef',
  color: '#6c757d',
  fontWeight: '600',
  fontSize: '16px'
}

const activeStepStyle = {
  background: '#007bff',
  color: 'white'
}

const completedStepStyle = {
  background: '#28a745',
  color: 'white'
}

const formStyle = {
  marginBottom: '24px'
}

const stepTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const stepDescStyle = {
  color: '#7f8c8d',
  marginBottom: '32px'
}

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '12px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '2px solid #e9ecef'
}

const serviceCheckboxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  padding: '8px 12px',
  background: 'white',
  borderRadius: '6px',
  border: '1px solid #dee2e6'
}

const checkboxStyle = {
  width: '16px',
  height: '16px'
}

const availabilityGridStyle = {
  display: 'grid',
  gap: '16px'
}

const dayScheduleStyle = {
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6'
}

const dayHeaderStyle = {
  marginBottom: '12px'
}

const dayLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600'
}

const timeInputsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const timeInputStyle = {
  padding: '8px 12px',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
  fontSize: '14px'
}

const helpTextStyle = {
  color: '#6c757d',
  fontSize: '12px',
  marginTop: '4px'
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: '1.5'
}

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  marginTop: '40px'
}

const prevBtnStyle = {
  flex: '0 0 auto'
}

const nextBtnStyle = {
  flex: '1',
  maxWidth: '200px',
  marginLeft: 'auto'
}

const footerStyle = {
  textAlign: 'center',
  paddingTop: '24px',
  borderTop: '1px solid #eee'
}

const footerTextStyle = {
  color: '#7f8c8d',
  fontSize: '14px'
}

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '600'
}
