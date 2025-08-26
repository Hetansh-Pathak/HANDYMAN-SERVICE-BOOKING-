import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Messages() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock conversations data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        participant: {
          name: 'Rajesh Kumar',
          type: 'provider',
          service: 'Plumbing',
          avatar: '👨‍🔧',
          online: true
        },
        lastMessage: {
          text: 'I can come tomorrow at 10 AM for the kitchen sink repair. Is that time suitable for you?',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          sender: 'provider'
        },
        unreadCount: 2,
        status: 'active',
        messages: [
          {
            id: 101,
            text: 'Hi, I need help with my kitchen sink. It\'s been leaking for the past few days.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            sender: 'customer'
          },
          {
            id: 102,
            text: 'Hello! I can definitely help you with that. Can you send me a photo of the leak?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
            sender: 'provider'
          },
          {
            id: 103,
            text: 'Sure, here\'s the photo. It\'s leaking from under the sink.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
            sender: 'customer',
            image: '📷'
          },
          {
            id: 104,
            text: 'I can see the issue. It looks like a loose pipe connection. This should be an easy fix.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            sender: 'provider'
          },
          {
            id: 105,
            text: 'I can come tomorrow at 10 AM for the kitchen sink repair. Is that time suitable for you?',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            sender: 'provider'
          }
        ]
      },
      {
        id: 2,
        participant: {
          name: 'Priya Singh',
          type: 'customer',
          service: 'Cleaning',
          avatar: '👩‍💼',
          online: false
        },
        lastMessage: {
          text: 'Thank you for the excellent cleaning service! The house looks amazing.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          sender: 'customer'
        },
        unreadCount: 0,
        status: 'completed',
        messages: [
          {
            id: 201,
            text: 'Hi! I\'m looking for a deep cleaning service for my 3BHK apartment.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            sender: 'customer'
          },
          {
            id: 202,
            text: 'Hello! I\'d be happy to help. When would you like to schedule the cleaning?',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
            sender: 'provider'
          },
          {
            id: 203,
            text: 'How about this Saturday morning? Around 9 AM?',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
            sender: 'customer'
          },
          {
            id: 204,
            text: 'Perfect! I\'ll be there at 9 AM sharp. The estimated time is 4-5 hours.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
            sender: 'provider'
          },
          {
            id: 205,
            text: 'Thank you for the excellent cleaning service! The house looks amazing.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            sender: 'customer'
          }
        ]
      },
      {
        id: 3,
        participant: {
          name: 'Amit Sharma',
          type: 'provider',
          service: 'Electrical',
          avatar: '👨‍💼',
          online: true
        },
        lastMessage: {
          text: 'I\'ll be there in 20 minutes for the electrical work.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          sender: 'provider'
        },
        unreadCount: 1,
        status: 'in_progress',
        messages: [
          {
            id: 301,
            text: 'Hi, I need some electrical work done. Can you help?',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            sender: 'customer'
          },
          {
            id: 302,
            text: 'Absolutely! What kind of electrical work do you need?',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 10 * 60 * 1000),
            sender: 'provider'
          },
          {
            id: 303,
            text: 'I need to install a new ceiling fan in the bedroom and fix a few switches.',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000 + 15 * 60 * 1000),
            sender: 'customer'
          },
          {
            id: 304,
            text: 'I\'ll be there in 20 minutes for the electrical work.',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            sender: 'provider'
          }
        ]
      }
    ]
    
    setConversations(mockConversations)
    setSelectedConversation(mockConversations[0])
    setLoading(false)
  }, [])

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participant.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'customer' // In real app, this would be dynamic
    }

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: {
                text: newMessage,
                timestamp: new Date(),
                sender: 'customer'
              }
            }
          : conv
      )
    )

    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }))

    setNewMessage('')
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return timestamp.toLocaleDateString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#28a745'
      case 'in_progress': return '#007bff'
      case 'completed': return '#6c757d'
      default: return '#ffc107'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active Booking'
      case 'in_progress': return 'In Progress'
      case 'completed': return 'Completed'
      default: return 'Pending'
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <Layout title="Messages - HandyFix">
      <div style={containerStyle}>
        <div className="container">
          {/* Header */}
          <div style={headerStyle}>
            <div>
              <h1 style={titleStyle}>
                💬 Messages
                {totalUnread > 0 && (
                  <span style={unreadBadgeStyle}>{totalUnread}</span>
                )}
              </h1>
              <p style={subtitleStyle}>Communicate directly with your service providers</p>
            </div>
            
            <div style={headerActionsStyle}>
              <Link href="/services" style={newChatBtnStyle}>
                ➕ Start New Chat
              </Link>
            </div>
          </div>

          {/* Messages Interface */}
          <div style={messagesContainerStyle}>
            {/* Conversations List */}
            <div style={conversationsListStyle}>
              <div style={searchBarStyle}>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={searchInputStyle}
                />
                <span style={searchIconStyle}>🔍</span>
              </div>

              <div style={conversationsStyle}>
                {loading ? (
                  <div style={loadingStyle}>Loading conversations...</div>
                ) : filteredConversations.length === 0 ? (
                  <div style={emptyConversationsStyle}>
                    <div style={emptyIconStyle}>💬</div>
                    <p>No conversations found</p>
                  </div>
                ) : (
                  filteredConversations.map(conversation => (
                    <div
                      key={conversation.id}
                      style={{
                        ...conversationItemStyle,
                        ...(selectedConversation?.id === conversation.id ? selectedConversationStyle : {})
                      }}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div style={conversationAvatarStyle}>
                        {conversation.participant.avatar}
                        {conversation.participant.online && (
                          <div style={onlineIndicatorStyle} />
                        )}
                      </div>

                      <div style={conversationContentStyle}>
                        <div style={conversationHeaderStyle}>
                          <h3 style={participantNameStyle}>
                            {conversation.participant.name}
                          </h3>
                          <span style={lastMessageTimeStyle}>
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>

                        <div style={serviceInfoStyle}>
                          <span style={serviceTagStyle}>
                            {conversation.participant.service}
                          </span>
                          <span style={{
                            ...statusBadgeStyle,
                            backgroundColor: getStatusColor(conversation.status) + '20',
                            color: getStatusColor(conversation.status)
                          }}>
                            {getStatusText(conversation.status)}
                          </span>
                        </div>

                        <p style={lastMessageStyle}>
                          {conversation.lastMessage.sender === 'provider' && '💼 '}
                          {conversation.lastMessage.text}
                        </p>
                      </div>

                      {conversation.unreadCount > 0 && (
                        <div style={unreadCountStyle}>
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div style={chatAreaStyle}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div style={chatHeaderStyle}>
                    <div style={chatParticipantStyle}>
                      <div style={chatAvatarStyle}>
                        {selectedConversation.participant.avatar}
                        {selectedConversation.participant.online && (
                          <div style={chatOnlineIndicatorStyle} />
                        )}
                      </div>
                      <div>
                        <h3 style={chatParticipantNameStyle}>
                          {selectedConversation.participant.name}
                        </h3>
                        <p style={chatServiceStyle}>
                          {selectedConversation.participant.service} • 
                          {selectedConversation.participant.online ? ' Online' : ' Offline'}
                        </p>
                      </div>
                    </div>

                    <div style={chatActionsStyle}>
                      <button style={callBtnStyle} title="Voice Call">
                        📞
                      </button>
                      <button style={videoBtnStyle} title="Video Call">
                        📹
                      </button>
                      <Link
                        href={`/book/${selectedConversation.participant.name.toLowerCase().replace(' ', '-')}`}
                        style={bookBtnStyle}
                      >
                        📅 Book Service
                      </Link>
                    </div>
                  </div>

                  {/* Messages */}
                  <div style={messagesAreaStyle}>
                    {selectedConversation.messages.map(message => (
                      <div
                        key={message.id}
                        style={{
                          ...messageItemStyle,
                          ...(message.sender === 'customer' ? customerMessageStyle : providerMessageStyle)
                        }}
                      >
                        <div style={messageContentStyle}>
                          {message.image && (
                            <div style={messageImageStyle}>
                              {message.image} Image attachment
                            </div>
                          )}
                          <p style={messageTextStyle}>{message.text}</p>
                          <span style={messageTimeStyle}>
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div style={messageInputAreaStyle}>
                    <div style={messageInputContainerStyle}>
                      <button style={attachBtnStyle} title="Attach file">
                        📎
                      </button>
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        style={messageInputStyle}
                      />
                      <button style={emojiBtnStyle} title="Add emoji">
                        😊
                      </button>
                      <button
                        style={sendBtnStyle}
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                      >
                        ➤
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={noChatSelectedStyle}>
                  <div style={noChatIconStyle}>💬</div>
                  <h3>Select a conversation</h3>
                  <p>Choose a conversation from the left to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Styles
const containerStyle = {
  padding: '40px 0',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '32px',
  flexWrap: 'wrap',
  gap: '20px'
}

const titleStyle = {
  fontSize: '36px',
  fontWeight: '800',
  color: '#2c3e50',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const unreadBadgeStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: '600'
}

const subtitleStyle = {
  fontSize: '18px',
  color: '#6c757d',
  margin: 0
}

const headerActionsStyle = {
  display: 'flex',
  gap: '12px'
}

const newChatBtnStyle = {
  background: '#007bff',
  color: 'white',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.3s ease'
}

const messagesContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '400px 1fr',
  gap: '24px',
  height: '70vh',
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden'
}

const conversationsListStyle = {
  borderRight: '1px solid #e9ecef',
  display: 'flex',
  flexDirection: 'column'
}

const searchBarStyle = {
  position: 'relative',
  padding: '20px'
}

const searchInputStyle = {
  width: '100%',
  padding: '12px 16px 12px 40px',
  border: '2px solid #e9ecef',
  borderRadius: '25px',
  fontSize: '14px',
  background: '#f8f9fa'
}

const searchIconStyle = {
  position: 'absolute',
  left: '32px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#6c757d'
}

const conversationsStyle = {
  flex: '1',
  overflowY: 'auto'
}

const loadingStyle = {
  padding: '40px 20px',
  textAlign: 'center',
  color: '#6c757d'
}

const emptyConversationsStyle = {
  padding: '40px 20px',
  textAlign: 'center',
  color: '#6c757d'
}

const emptyIconStyle = {
  fontSize: '48px',
  marginBottom: '16px',
  opacity: '0.5'
}

const conversationItemStyle = {
  display: 'flex',
  gap: '12px',
  padding: '16px 20px',
  cursor: 'pointer',
  borderBottom: '1px solid #f8f9fa',
  transition: 'all 0.3s ease',
  position: 'relative'
}

const selectedConversationStyle = {
  background: 'rgba(0, 123, 255, 0.05)',
  borderLeft: '4px solid #007bff'
}

const conversationAvatarStyle = {
  position: 'relative',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  flexShrink: 0
}

const onlineIndicatorStyle = {
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  width: '12px',
  height: '12px',
  background: '#28a745',
  borderRadius: '50%',
  border: '2px solid white'
}

const conversationContentStyle = {
  flex: '1',
  minWidth: '0'
}

const conversationHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4px'
}

const participantNameStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#2c3e50',
  margin: '0'
}

const lastMessageTimeStyle = {
  fontSize: '12px',
  color: '#6c757d'
}

const serviceInfoStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '6px'
}

const serviceTagStyle = {
  background: 'rgba(0, 123, 255, 0.1)',
  color: '#007bff',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600'
}

const statusBadgeStyle = {
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '600'
}

const lastMessageStyle = {
  fontSize: '14px',
  color: '#6c757d',
  margin: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const unreadCountStyle = {
  width: '20px',
  height: '20px',
  background: '#dc3545',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: '700',
  flexShrink: 0
}

const chatAreaStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const chatHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid #f8f9fa'
}

const chatParticipantStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const chatAvatarStyle = {
  position: 'relative',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px'
}

const chatOnlineIndicatorStyle = {
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  width: '12px',
  height: '12px',
  background: '#28a745',
  borderRadius: '50%',
  border: '2px solid white'
}

const chatParticipantNameStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50',
  margin: '0 0 4px 0'
}

const chatServiceStyle = {
  fontSize: '14px',
  color: '#6c757d',
  margin: '0'
}

const chatActionsStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center'
}

const callBtnStyle = {
  background: 'none',
  border: '2px solid #28a745',
  color: '#28a745',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'all 0.3s ease'
}

const videoBtnStyle = {
  background: 'none',
  border: '2px solid #007bff',
  color: '#007bff',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'all 0.3s ease'
}

const bookBtnStyle = {
  background: '#007bff',
  color: 'white',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.3s ease'
}

const messagesAreaStyle = {
  flex: '1',
  overflowY: 'auto',
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
}

const messageItemStyle = {
  display: 'flex',
  marginBottom: '16px'
}

const customerMessageStyle = {
  justifyContent: 'flex-end'
}

const providerMessageStyle = {
  justifyContent: 'flex-start'
}

const messageContentStyle = {
  maxWidth: '70%',
  padding: '12px 16px',
  borderRadius: '18px',
  position: 'relative'
}

const messageImageStyle = {
  background: 'rgba(0, 123, 255, 0.1)',
  color: '#007bff',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '14px',
  marginBottom: '8px'
}

const messageTextStyle = {
  margin: '0 0 4px 0',
  fontSize: '14px',
  lineHeight: '1.4'
}

const messageTimeStyle = {
  fontSize: '11px',
  opacity: '0.7'
}

const messageInputAreaStyle = {
  padding: '20px 24px',
  borderTop: '1px solid #f8f9fa'
}

const messageInputContainerStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  background: '#f8f9fa',
  borderRadius: '25px',
  padding: '8px 16px'
}

const attachBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#6c757d',
  padding: '4px'
}

const messageInputStyle = {
  flex: '1',
  border: 'none',
  background: 'none',
  padding: '8px',
  fontSize: '14px',
  outline: 'none'
}

const emojiBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#6c757d',
  padding: '4px'
}

const sendBtnStyle = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'all 0.3s ease'
}

const noChatSelectedStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: '#6c757d',
  textAlign: 'center'
}

const noChatIconStyle = {
  fontSize: '64px',
  marginBottom: '20px',
  opacity: '0.5'
}

// Add different message bubble colors for customer vs provider
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .customer-message .message-content {
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white;
    }
    
    .provider-message .message-content {
      background: #f8f9fa;
      color: #2c3e50;
      border: 1px solid #e9ecef;
    }
  `
  document.head.appendChild(style)
}
