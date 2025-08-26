import { useState } from 'react'
import RoleBasedLayout from '../../components/RoleBasedLayout'
import { useUser } from '../../context/UserContext'

export default function PaymentMethods() {
  const { user, isCustomer } = useUser()
  const [selectedMethod, setSelectedMethod] = useState('cod')
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'upi',
      name: 'PhonePe',
      identifier: '9876543210@paytm',
      isDefault: false,
      status: 'verified'
    },
    {
      id: 2,
      type: 'card',
      name: 'HDFC Credit Card',
      identifier: '**** **** **** 1234',
      isDefault: true,
      status: 'verified',
      expiryDate: '12/25'
    }
  ])

  const handleSetDefault = (methodId) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    )
  }

  const handleRemoveMethod = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId))
  }

  const getMethodIcon = (type) => {
    switch(type) {
      case 'upi': return '📱'
      case 'card': return '💳'
      case 'netbanking': return '🏦'
      case 'wallet': return '👛'
      default: return '💰'
    }
  }

  if (!isCustomer) {
    return (
      <RoleBasedLayout title="Payment Methods - HandyFix">
        <div style={containerStyle}>
          <div className="container">
            <div style={restrictedStyle}>
              <h2>Access Restricted</h2>
              <p>Payment methods are only available for customers.</p>
            </div>
          </div>
        </div>
      </RoleBasedLayout>
    )
  }

  return (
    <RoleBasedLayout title="Payment Methods - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={titleStyle}>Payment Methods</h1>
            <button className="btn btn-primary" style={addBtnStyle}>
              + Add Payment Method
            </button>
          </div>

          {/* Current Payment Methods */}
          <div className="card" style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>Saved Payment Methods</h2>
            
            <div style={methodsListStyle}>
              {paymentMethods.map(method => (
                <div key={method.id} style={methodItemStyle}>
                  <div style={methodInfoStyle}>
                    <div style={methodIconStyle}>
                      {getMethodIcon(method.type)}
                    </div>
                    <div style={methodDetailsStyle}>
                      <h3 style={methodNameStyle}>{method.name}</h3>
                      <p style={methodIdentifierStyle}>{method.identifier}</p>
                      {method.expiryDate && (
                        <p style={methodExpiryStyle}>Expires: {method.expiryDate}</p>
                      )}
                      <div style={methodStatusStyle}>
                        <span style={verifiedBadgeStyle}>✅ Verified</span>
                        {method.isDefault && (
                          <span style={defaultBadgeStyle}>Default</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={methodActionsStyle}>
                    {!method.isDefault && (
                      <button
                        style={actionBtnStyle}
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      style={{...actionBtnStyle, ...dangerBtnStyle}}
                      onClick={() => handleRemoveMethod(method.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {paymentMethods.length === 0 && (
              <div style={emptyStateStyle}>
                <div style={emptyIconStyle}>💳</div>
                <h3>No payment methods added</h3>
                <p>Add a payment method to make quick payments for your bookings.</p>
              </div>
            )}
          </div>

          {/* Payment Options */}
          <div className="card" style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>Available Payment Options</h2>
            
            <div style={optionsGridStyle}>
              <div style={optionItemStyle}>
                <div style={optionIconStyle}>💵</div>
                <h3 style={optionNameStyle}>Cash on Delivery</h3>
                <p style={optionDescStyle}>
                  Pay directly to the service provider after work completion.
                </p>
                <div style={optionStatusStyle}>✅ Available</div>
              </div>

              <div style={{...optionItemStyle, ...comingSoonStyle}}>
                <div style={optionIconStyle}>📱</div>
                <h3 style={optionNameStyle}>UPI Payment</h3>
                <p style={optionDescStyle}>
                  Pay instantly using UPI apps like PhonePe, Google Pay, Paytm.
                </p>
                <div style={comingSoonBadgeStyle}>🚀 Coming Soon</div>
              </div>

              <div style={{...optionItemStyle, ...comingSoonStyle}}>
                <div style={optionIconStyle}>💳</div>
                <h3 style={optionNameStyle}>Card Payment</h3>
                <p style={optionDescStyle}>
                  Secure payments using your debit or credit cards.
                </p>
                <div style={comingSoonBadgeStyle}>🚀 Coming Soon</div>
              </div>

              <div style={{...optionItemStyle, ...comingSoonStyle}}>
                <div style={optionIconStyle}>🏦</div>
                <h3 style={optionNameStyle}>Net Banking</h3>
                <p style={optionDescStyle}>
                  Direct bank transfers for secure transactions.
                </p>
                <div style={comingSoonBadgeStyle}>🚀 Coming Soon</div>
              </div>

              <div style={{...optionItemStyle, ...comingSoonStyle}}>
                <div style={optionIconStyle}>👛</div>
                <h3 style={optionNameStyle}>Digital Wallets</h3>
                <p style={optionDescStyle}>
                  Pay using Paytm Wallet, Amazon Pay, and other wallets.
                </p>
                <div style={comingSoonBadgeStyle}>🚀 Coming Soon</div>
              </div>

              <div style={{...optionItemStyle, ...comingSoonStyle}}>
                <div style={optionIconStyle}>🔄</div>
                <h3 style={optionNameStyle}>EMI Options</h3>
                <p style={optionDescStyle}>
                  Convert high-value payments into easy monthly installments.
                </p>
                <div style={comingSoonBadgeStyle}>🚀 Coming Soon</div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="card" style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>Payment Security</h2>
            <div style={securityInfoStyle}>
              <div style={securityItemStyle}>
                <div style={securityIconStyle}>🔒</div>
                <div>
                  <h4>Bank-Level Security</h4>
                  <p>All payments are processed through secure, encrypted channels.</p>
                </div>
              </div>
              <div style={securityItemStyle}>
                <div style={securityIconStyle}>🛡️</div>
                <div>
                  <h4>PCI DSS Compliant</h4>
                  <p>Our payment system meets the highest security standards.</p>
                </div>
              </div>
              <div style={securityItemStyle}>
                <div style={securityIconStyle}>💯</div>
                <div>
                  <h4>100% Refund Protection</h4>
                  <p>Get full refund if service is not delivered as promised.</p>
                </div>
              </div>
              <div style={securityItemStyle}>
                <div style={securityIconStyle}>📞</div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Our support team is available round the clock for payment issues.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="card" style={sectionCardStyle}>
            <h2 style={sectionTitleStyle}>Recent Transactions</h2>
            <div style={transactionsListStyle}>
              <div style={transactionItemStyle}>
                <div style={transactionInfoStyle}>
                  <h4>Plumbing Service - Rajesh Kumar</h4>
                  <p>Booking ID: BK001 • Jan 24, 2024</p>
                </div>
                <div style={transactionAmountStyle}>
                  <span style={amountStyle}>₹750</span>
                  <span style={statusPaidStyle}>✅ Paid (COD)</span>
                </div>
              </div>
              
              <div style={transactionItemStyle}>
                <div style={transactionInfoStyle}>
                  <h4>AC Repair Service - Sneha Patel</h4>
                  <p>Booking ID: BK002 • Jan 20, 2024</p>
                </div>
                <div style={transactionAmountStyle}>
                  <span style={amountStyle}>₹1,200</span>
                  <span style={statusPaidStyle}>✅ Paid (COD)</span>
                </div>
              </div>
            </div>
            
            <div style={viewAllStyle}>
              <button className="btn btn-outline">View All Transactions</button>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  )
}

// Styles
const containerStyle = {
  padding: '40px 0',
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

const addBtnStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '600'
}

const sectionCardStyle = {
  marginBottom: '24px',
  padding: '32px'
}

const sectionTitleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  marginBottom: '24px',
  color: '#2c3e50'
}

const methodsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const methodItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  background: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid #e9ecef'
}

const methodInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const methodIconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: '#e9ecef',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px'
}

const methodDetailsStyle = {}

const methodNameStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#2c3e50'
}

const methodIdentifierStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  marginBottom: '4px'
}

const methodExpiryStyle = {
  fontSize: '12px',
  color: '#7f8c8d',
  marginBottom: '8px'
}

const methodStatusStyle = {
  display: 'flex',
  gap: '8px'
}

const verifiedBadgeStyle = {
  background: '#d4edda',
  color: '#155724',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600'
}

const defaultBadgeStyle = {
  background: '#007bff',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '600'
}

const methodActionsStyle = {
  display: 'flex',
  gap: '8px'
}

const actionBtnStyle = {
  padding: '8px 16px',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
  background: 'white',
  cursor: 'pointer',
  fontSize: '14px'
}

const dangerBtnStyle = {
  color: '#dc3545',
  borderColor: '#dc3545'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '60px 20px'
}

const emptyIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

const optionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px'
}

const optionItemStyle = {
  padding: '24px',
  background: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid #e9ecef',
  textAlign: 'center'
}

const comingSoonStyle = {
  opacity: '0.6'
}

const optionIconStyle = {
  fontSize: '48px',
  marginBottom: '16px'
}

const optionNameStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#2c3e50'
}

const optionDescStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  marginBottom: '16px',
  lineHeight: '1.5'
}

const optionStatusStyle = {
  background: '#d4edda',
  color: '#155724',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'inline-block'
}

const comingSoonBadgeStyle = {
  background: '#ffc107',
  color: '#333',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  display: 'inline-block'
}

const securityInfoStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px'
}

const securityItemStyle = {
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-start'
}

const securityIconStyle = {
  fontSize: '32px',
  marginTop: '4px'
}

const transactionsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '24px'
}

const transactionItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
}

const transactionInfoStyle = {}

const transactionAmountStyle = {
  textAlign: 'right'
}

const amountStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#2c3e50',
  display: 'block'
}

const statusPaidStyle = {
  fontSize: '12px',
  color: '#28a745',
  fontWeight: '600'
}

const viewAllStyle = {
  textAlign: 'center'
}

const restrictedStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  background: 'white',
  borderRadius: '12px'
}
