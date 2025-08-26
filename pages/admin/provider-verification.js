import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { useUser } from '../../context/UserContext'

export default function ProviderVerification() {
  const { user, isAdmin } = useUser()
  const [pendingProviders, setPendingProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    const loadPendingProviders = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockProviders = [
        {
          id: 1,
          name: 'Vikram Gupta',
          email: 'vikram.provider@gmail.com',
          phone: '+91 98765 43213',
          service: 'Electrical',
          city: 'Delhi',
          experience: 5,
          appliedDate: '2024-01-20T10:00:00Z',
          documentsSubmitted: true,
          profilePhoto: '👨‍💼',
          idProof: 'aadhaar_vikram.pdf',
          experienceCertificate: 'electrical_cert.pdf',
          status: 'pending_review',
          basePrice: 450,
          serviceArea: 'North Delhi, Central Delhi',
          specialties: ['Home Wiring', 'Appliance Repair', 'Circuit Installation']
        },
        {
          id: 2,
          name: 'Meera Joshi',
          email: 'meera.provider@gmail.com',
          phone: '+91 98765 43214',
          service: 'Painting',
          city: 'Pune',
          experience: 3,
          appliedDate: '2024-01-22T14:30:00Z',
          documentsSubmitted: true,
          profilePhoto: '👩‍🎨',
          idProof: 'pan_meera.pdf',
          experienceCertificate: null,
          status: 'pending_documents',
          basePrice: 350,
          serviceArea: 'Pune City, Pimpri-Chinchwad',
          specialties: ['Interior Painting', 'Exterior Painting', 'Wall Texture']
        },
        {
          id: 3,
          name: 'Rahul Shah',
          email: 'rahul.provider@gmail.com',
          phone: '+91 98765 43215',
          service: 'AC Repair',
          city: 'Ahmedabad',
          experience: 7,
          appliedDate: '2024-01-23T09:15:00Z',
          documentsSubmitted: false,
          profilePhoto: '👨‍🔧',
          idProof: null,
          experienceCertificate: 'hvac_cert.pdf',
          status: 'pending_documents',
          basePrice: 500,
          serviceArea: 'Ahmedabad, Gandhinagar',
          specialties: ['AC Installation', 'AC Servicing', 'Refrigerator Repair']
        }
      ]
      
      setPendingProviders(mockProviders)
      setLoading(false)
    }
    
    if (isAdmin) {
      loadPendingProviders()
    }
  }, [isAdmin])

  const handleProviderAction = async (providerId, action, reason = '') => {
    setActionLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const provider = pendingProviders.find(p => p.id === providerId)
      
      // Send email notification to provider
      console.log(`📧 Email sent to ${provider.email}:`, {
        subject: action === 'approved' ? 'Application Approved - HandyFix' : 'Application Update - HandyFix',
        message: action === 'approved' 
          ? 'Congratulations! Your provider application has been approved.'
          : `Your application needs attention: ${reason}`
      })

      // Update provider status
      setPendingProviders(prev => 
        prev.map(p => 
          p.id === providerId 
            ? { ...p, status: action, reviewedAt: new Date().toISOString(), reviewReason: reason }
            : p
        ).filter(p => action === 'approved' ? p.id !== providerId : true)
      )

      setSelectedProvider(null)
      
    } catch (error) {
      console.error('Error processing provider:', error)
      alert('Failed to process provider. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    }
    
    switch(status) {
      case 'pending_review':
        return { ...baseStyle, background: '#fff3cd', color: '#856404' }
      case 'pending_documents':
        return { ...baseStyle, background: '#f8d7da', color: '#721c24' }
      case 'approved':
        return { ...baseStyle, background: '#d4edda', color: '#155724' }
      case 'rejected':
        return { ...baseStyle, background: '#f8d7da', color: '#721c24' }
      default:
        return baseStyle
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAdmin) {
    return (
      <AdminLayout title="Access Denied - HandyFix Admin">
        <div style={accessDeniedStyle}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </AdminLayout>
    )
  }

  if (loading) {
    return (
      <AdminLayout title="Provider Verification - HandyFix Admin">
        <div style={loadingStyle}>Loading pending providers...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Provider Verification - HandyFix Admin">
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Provider Verification</h1>
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>
                {pendingProviders.filter(p => p.status === 'pending_review').length}
              </span>
              <span style={statLabelStyle}>Ready for Review</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>
                {pendingProviders.filter(p => p.status === 'pending_documents').length}
              </span>
              <span style={statLabelStyle}>Pending Documents</span>
            </div>
          </div>
        </div>

        <div style={providersListStyle}>
          {pendingProviders.map(provider => (
            <div key={provider.id} className="card" style={providerCardStyle}>
              <div style={cardHeaderStyle}>
                <div style={providerInfoStyle}>
                  <div style={providerImageStyle}>{provider.profilePhoto}</div>
                  <div>
                    <h3 style={providerNameStyle}>{provider.name}</h3>
                    <p style={serviceInfoStyle}>{provider.service} • {provider.city}</p>
                    <p style={experienceInfoStyle}>{provider.experience} years experience</p>
                  </div>
                </div>
                <div style={statusColumnStyle}>
                  <span style={getStatusStyle(provider.status)}>
                    {provider.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span style={appliedDateStyle}>
                    Applied: {formatDate(provider.appliedDate)}
                  </span>
                </div>
              </div>

              <div style={providerDetailsStyle}>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📧 Email:</span>
                  <span>{provider.email}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📞 Phone:</span>
                  <span>{provider.phone}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>💰 Base Price:</span>
                  <span>₹{provider.basePrice}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={labelStyle}>📍 Service Area:</span>
                  <span>{provider.serviceArea}</span>
                </div>
                <div style={specialtiesRowStyle}>
                  <span style={labelStyle}>🛠️ Specialties:</span>
                  <div style={specialtiesTagsStyle}>
                    {provider.specialties.map(specialty => (
                      <span key={specialty} style={specialtyTagStyle}>{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={documentsStyle}>
                <h4 style={documentsHeadingStyle}>Documents Submitted</h4>
                <div style={documentsListStyle}>
                  <div style={documentItemStyle}>
                    <span>📷 Profile Photo:</span>
                    <span style={provider.profilePhoto ? submittedStyle : pendingStyle}>
                      {provider.profilePhoto ? '✅ Submitted' : '❌ Pending'}
                    </span>
                  </div>
                  <div style={documentItemStyle}>
                    <span>🆔 ID Proof:</span>
                    <span style={provider.idProof ? submittedStyle : pendingStyle}>
                      {provider.idProof ? `✅ ${provider.idProof}` : '❌ Not submitted'}
                    </span>
                  </div>
                  <div style={documentItemStyle}>
                    <span>📜 Experience Certificate:</span>
                    <span style={provider.experienceCertificate ? submittedStyle : pendingStyle}>
                      {provider.experienceCertificate ? `✅ ${provider.experienceCertificate}` : '❌ Not submitted'}
                    </span>
                  </div>
                </div>
              </div>

              <div style={actionsStyle}>
                {provider.status === 'pending_review' && provider.documentsSubmitted && (
                  <>
                    <button
                      className="btn btn-primary"
                      style={actionBtnStyle}
                      onClick={() => handleProviderAction(provider.id, 'approved')}
                      disabled={actionLoading}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={actionBtnStyle}
                      onClick={() => setSelectedProvider(provider)}
                      disabled={actionLoading}
                    >
                      ❌ Reject
                    </button>
                  </>
                )}
                {provider.status === 'pending_documents' && (
                  <button
                    className="btn btn-outline"
                    style={actionBtnStyle}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    📧 Request Documents
                  </button>
                )}
                <button
                  className="btn btn-outline"
                  style={actionBtnStyle}
                  onClick={() => setSelectedProvider(provider)}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {pendingProviders.length === 0 && (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>✅</div>
            <h3>All caught up!</h3>
            <p>No pending provider applications at the moment.</p>
          </div>
        )}

        {/* Provider Details Modal */}
        {selectedProvider && (
          <div style={modalOverlayStyle} onClick={() => setSelectedProvider(null)}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <h2>Provider Application Details</h2>
                <button
                  style={closeButtonStyle}
                  onClick={() => setSelectedProvider(null)}
                >
                  ✕
                </button>
              </div>

              <div style={modalBodyStyle}>
                <div style={modalProviderInfoStyle}>
                  <div style={modalProviderHeaderStyle}>
                    <div style={modalProviderImageStyle}>{selectedProvider.profilePhoto}</div>
                    <div>
                      <h3>{selectedProvider.name}</h3>
                      <p>{selectedProvider.service} Specialist</p>
                      <p>{selectedProvider.city} • {selectedProvider.experience} years exp.</p>
                    </div>
                  </div>
                </div>

                <div style={modalSectionStyle}>
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedProvider.email}</p>
                  <p><strong>Phone:</strong> {selectedProvider.phone}</p>
                  <p><strong>Service Area:</strong> {selectedProvider.serviceArea}</p>
                  <p><strong>Base Price:</strong> ₹{selectedProvider.basePrice}</p>
                </div>

                <div style={modalSectionStyle}>
                  <h4>Specialties</h4>
                  <div style={modalSpecialtiesStyle}>
                    {selectedProvider.specialties.map(specialty => (
                      <span key={specialty} style={modalSpecialtyTagStyle}>{specialty}</span>
                    ))}
                  </div>
                </div>

                <div style={modalSectionStyle}>
                  <h4>Document Status</h4>
                  <div style={modalDocumentsStyle}>
                    <p>📷 Profile Photo: {selectedProvider.profilePhoto ? '✅ Submitted' : '❌ Pending'}</p>
                    <p>🆔 ID Proof: {selectedProvider.idProof ? `✅ ${selectedProvider.idProof}` : '❌ Not submitted'}</p>
                    <p>📜 Experience Cert: {selectedProvider.experienceCertificate ? `✅ ${selectedProvider.experienceCertificate}` : '❌ Not submitted'}</p>
                  </div>
                </div>

                {selectedProvider.status === 'pending_review' && (
                  <div style={modalActionsStyle}>
                    <h4>Review Decision</h4>
                    <div style={decisionButtonsStyle}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleProviderAction(selectedProvider.id, 'approved')}
                        disabled={actionLoading}
                      >
                        ✅ Approve Application
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          const reason = prompt('Please provide a reason for rejection:')
                          if (reason) {
                            handleProviderAction(selectedProvider.id, 'rejected', reason)
                          }
                        }}
                        disabled={actionLoading}
                      >
                        ❌ Reject Application
                      </button>
                    </div>
                  </div>
                )}

                {selectedProvider.status === 'pending_documents' && (
                  <div style={modalActionsStyle}>
                    <h4>Request Missing Documents</h4>
                    <textarea
                      placeholder="Specify which documents are needed..."
                      style={modalTextareaStyle}
                      id="document-request"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const message = document.getElementById('document-request').value
                        handleProviderAction(selectedProvider.id, 'document_requested', message)
                      }}
                      disabled={actionLoading}
                    >
                      📧 Send Document Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

// Styles
const containerStyle = {
  padding: '40px',
  background: '#f8f9fa',
  minHeight: '80vh'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px'
}

const titleStyle = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#2c3e50',
  margin: 0
}

const statsStyle = {
  display: 'flex',
  gap: '24px'
}

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 24px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}

const statNumberStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#e74c3c'
}

const statLabelStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500'
}

const providersListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}

const providerCardStyle = {
  marginBottom: '0',
  border: '1px solid #dee2e6'
}

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '20px'
}

const providerInfoStyle = {
  display: 'flex',
  gap: '16px'
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

const serviceInfoStyle = {
  color: '#007bff',
  fontWeight: '500',
  marginBottom: '4px'
}

const experienceInfoStyle = {
  color: '#28a745',
  fontSize: '14px',
  fontWeight: '500'
}

const statusColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-end'
}

const appliedDateStyle = {
  fontSize: '12px',
  color: '#7f8c8d'
}

const providerDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '20px'
}

const detailRowStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

const labelStyle = {
  fontWeight: '500',
  color: '#555',
  minWidth: '120px'
}

const specialtiesRowStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start'
}

const specialtiesTagsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px'
}

const specialtyTagStyle = {
  padding: '4px 8px',
  background: '#e9ecef',
  borderRadius: '4px',
  fontSize: '12px',
  color: '#495057'
}

const documentsStyle = {
  background: '#f8f9fa',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '20px'
}

const documentsHeadingStyle = {
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
  color: '#2c3e50'
}

const documentsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const documentItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px'
}

const submittedStyle = {
  color: '#28a745',
  fontWeight: '500'
}

const pendingStyle = {
  color: '#dc3545',
  fontWeight: '500'
}

const actionsStyle = {
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

const emptyStateStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  color: '#7f8c8d'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
  fontSize: '18px',
  color: '#7f8c8d'
}

const accessDeniedStyle = {
  textAlign: 'center',
  padding: '80px 20px'
}

// Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
}

const modalContentStyle = {
  background: 'white',
  borderRadius: '12px',
  maxWidth: '700px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto'
}

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 24px 0',
  borderBottom: '1px solid #eee',
  marginBottom: '24px'
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#7f8c8d'
}

const modalBodyStyle = {
  padding: '0 24px 24px'
}

const modalProviderInfoStyle = {
  marginBottom: '24px'
}

const modalProviderHeaderStyle = {
  display: 'flex',
  gap: '16px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const modalProviderImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px'
}

const modalSectionStyle = {
  marginBottom: '24px'
}

const modalSpecialtiesStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px'
}

const modalSpecialtyTagStyle = {
  padding: '6px 12px',
  background: '#007bff',
  color: 'white',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: '500'
}

const modalDocumentsStyle = {
  background: '#f8f9fa',
  padding: '16px',
  borderRadius: '8px'
}

const modalActionsStyle = {
  border: '1px solid #007bff',
  borderRadius: '8px',
  padding: '16px'
}

const decisionButtonsStyle = {
  display: 'flex',
  gap: '12px',
  marginTop: '12px'
}

const modalTextareaStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  minHeight: '80px',
  marginBottom: '12px',
  resize: 'vertical'
}
