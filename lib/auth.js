// Enhanced authentication utilities
// This will be replaced with actual backend API calls

export const authAPI = {
  // User authentication
  async login(credentials) {
    // Mock implementation - replace with actual API call
    const { email, password, userType } = credentials
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data based on email
    const mockUsers = {
      'customer@test.com': {
        id: 1,
        name: 'John Customer',
        email: 'customer@test.com',
        userType: 'customer',
        phone: '+91 98765 43210',
        city: 'Mumbai',
        verified: true,
        createdAt: '2023-01-15T10:00:00Z'
      },
      'provider@test.com': {
        id: 2,
        name: 'Jane Provider',
        email: 'provider@test.com',
        userType: 'provider',
        phone: '+91 98765 43211',
        city: 'Mumbai',
        service: 'Plumbing',
        verified: true,
        approved: true,
        rating: 4.8,
        reviewCount: 156,
        createdAt: '2023-02-10T10:00:00Z'
      },
      'admin@test.com': {
        id: 3,
        name: 'Admin User',
        email: 'admin@test.com',
        userType: 'admin',
        role: 'admin',
        verified: true,
        createdAt: '2023-01-01T10:00:00Z'
      }
    }
    
    const user = mockUsers[email]
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials')
    }
    
    return {
      user,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    }
  },

  async register(userData) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newUser = {
      id: Date.now(),
      ...userData,
      verified: false,
      approved: userData.userType === 'provider' ? false : true,
      createdAt: new Date().toISOString()
    }
    
    // For providers, add additional fields
    if (userData.userType === 'provider') {
      newUser.rating = 0
      newUser.reviewCount = 0
      newUser.completedJobs = 0
      newUser.totalEarnings = 0
    }
    
    return {
      user: newUser,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      message: userData.userType === 'provider' 
        ? 'Registration successful! Your profile is under review.'
        : 'Registration successful! Please verify your email.'
    }
  },

  async logout() {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: true }
  },

  async verifyToken(token) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (!token || !token.startsWith('mock_jwt_token_')) {
      throw new Error('Invalid token')
    }
    
    return { valid: true }
  },

  async refreshToken(refreshToken) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    }
  },

  async forgotPassword(email) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: 'Password reset instructions sent to your email'
    }
  },

  async resetPassword(token, newPassword) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: 'Password reset successfully'
    }
  }
}

// Booking management API
export const bookingAPI = {
  async createBooking(bookingData) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newBooking = {
      id: 'BK' + Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Simulate sending notification to provider
    await this.notifyProvider(bookingData.providerId, newBooking)
    
    return newBooking
  },

  async updateBookingStatus(bookingId, status, message = '') {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedBooking = {
      id: bookingId,
      status,
      updatedAt: new Date().toISOString(),
      statusMessage: message
    }
    
    // Simulate sending notification to customer
    if (status === 'confirmed') {
      await this.notifyCustomer(bookingId, 'Your booking has been confirmed!')
    }
    
    return updatedBooking
  },

  async notifyProvider(providerId, booking) {
    // Mock implementation - replace with actual email/SMS API
    console.log(`📧 Email sent to provider ${providerId}:`, {
      subject: 'New Booking Request',
      body: `You have a new booking request from ${booking.customerName}`
    })
    
    // Simulate in-app notification
    return {
      type: 'booking_request',
      providerId,
      booking,
      sent: true
    }
  },

  async notifyCustomer(bookingId, message) {
    // Mock implementation - replace with actual email/SMS API
    console.log(`📧 Email sent to customer for booking ${bookingId}:`, {
      subject: 'Booking Update',
      body: message
    })
    
    return {
      type: 'booking_update',
      bookingId,
      message,
      sent: true
    }
  }
}

// Email notification service
export const emailService = {
  async sendBookingConfirmation(customerEmail, bookingDetails) {
    // Mock implementation - replace with actual email service (SendGrid, etc.)
    console.log('📧 Booking confirmation email sent:', {
      to: customerEmail,
      subject: 'Booking Confirmed - HandyFix',
      template: 'booking-confirmation',
      data: bookingDetails
    })
    
    return { success: true, messageId: 'mock_msg_' + Date.now() }
  },

  async sendProviderNotification(providerEmail, bookingDetails) {
    // Mock implementation
    console.log('📧 Provider notification email sent:', {
      to: providerEmail,
      subject: 'New Booking Request - HandyFix',
      template: 'provider-notification',
      data: bookingDetails
    })
    
    return { success: true, messageId: 'mock_msg_' + Date.now() }
  },

  async sendWelcomeEmail(userEmail, userData) {
    // Mock implementation
    console.log('📧 Welcome email sent:', {
      to: userEmail,
      subject: 'Welcome to HandyFix!',
      template: userData.userType === 'provider' ? 'provider-welcome' : 'customer-welcome',
      data: userData
    })
    
    return { success: true, messageId: 'mock_msg_' + Date.now() }
  },

  async sendVerificationEmail(userEmail, verificationToken) {
    // Mock implementation
    console.log('📧 Verification email sent:', {
      to: userEmail,
      subject: 'Verify your HandyFix account',
      template: 'email-verification',
      data: { verificationToken }
    })
    
    return { success: true, messageId: 'mock_msg_' + Date.now() }
  }
}

// Utility functions
export const generateBookingId = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

export const formatBookingNotification = (booking) => {
  return {
    title: 'New Booking Request',
    message: `Service: ${booking.service} | Customer: ${booking.customerName} | Date: ${booking.preferredDate}`,
    type: 'booking',
    actionUrl: '/provider/bookings',
    data: booking
  }
}

export const formatConfirmationNotification = (booking) => {
  return {
    title: 'Booking Confirmed',
    message: `Your ${booking.service} service has been confirmed for ${booking.confirmedDate}`,
    type: 'booking_confirmed',
    actionUrl: '/dashboard/user',
    data: booking
  }
}
