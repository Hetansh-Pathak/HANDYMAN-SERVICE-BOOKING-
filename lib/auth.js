// Enhanced authentication and booking utilities
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
        address: '123 Main Street, Andheri West, Mumbai, 400058',
        verified: true,
        profileImage: null,
        preferences: {
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true
        },
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
        completedJobs: 245,
        totalEarnings: 125000,
        availability: {
          monday: { start: '09:00', end: '18:00', available: true },
          tuesday: { start: '09:00', end: '18:00', available: true },
          wednesday: { start: '09:00', end: '18:00', available: true },
          thursday: { start: '09:00', end: '18:00', available: true },
          friday: { start: '09:00', end: '18:00', available: true },
          saturday: { start: '09:00', end: '15:00', available: true },
          sunday: { start: '10:00', end: '14:00', available: false }
        },
        services: ['Plumbing', 'Pipe Repair', 'Bathroom Fitting', 'Kitchen Plumbing'],
        basePrice: 500,
        emergencyRate: 750,
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
      profileImage: null,
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true
      },
      createdAt: new Date().toISOString()
    }
    
    // For providers, add additional fields
    if (userData.userType === 'provider') {
      newUser.rating = 0
      newUser.reviewCount = 0
      newUser.completedJobs = 0
      newUser.totalEarnings = 0
      newUser.services = userData.services || []
      newUser.basePrice = userData.basePrice || 500
      newUser.emergencyRate = userData.emergencyRate || 750
      newUser.availability = {
        monday: { start: '09:00', end: '18:00', available: true },
        tuesday: { start: '09:00', end: '18:00', available: true },
        wednesday: { start: '09:00', end: '18:00', available: true },
        thursday: { start: '09:00', end: '18:00', available: true },
        friday: { start: '09:00', end: '18:00', available: true },
        saturday: { start: '09:00', end: '15:00', available: true },
        sunday: { start: '10:00', end: '14:00', available: false }
      }
    }
    
    // Send welcome email
    await emailService.sendWelcomeEmail(newUser.email, newUser)
    
    return {
      user: newUser,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      message: userData.userType === 'provider' 
        ? 'Registration successful! Your profile is under review. You will receive an email once approved.'
        : 'Registration successful! Please check your email for verification instructions.'
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
    
    // Send password reset email
    await emailService.sendPasswordResetEmail(email, 'reset_token_' + Date.now())
    
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

// Enhanced Booking management API
export const bookingAPI = {
  async createBooking(bookingData) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const bookingId = generateBookingId()
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      estimatedDuration: this.calculateEstimatedDuration(bookingData.service),
      finalPrice: null,
      scheduledDate: null,
      scheduledTime: null,
      completedAt: null,
      rating: null,
      review: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          message: 'Booking request submitted',
          actor: 'customer'
        }
      ]
    }
    
    // Simulate sending notifications
    await Promise.all([
      this.notifyProvider(bookingData.providerId, newBooking),
      this.notifyCustomer(bookingData.customerId, 'booking_submitted', newBooking)
    ])
    
    return newBooking
  },

  async updateBookingStatus(bookingId, status, updateData = {}) {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const statusMessages = {
      confirmed: 'Booking confirmed by provider',
      rejected: 'Booking declined by provider',
      in_progress: 'Service provider is on the way',
      arrived: 'Service provider has arrived',
      working: 'Work in progress',
      completed: 'Service completed successfully',
      cancelled: 'Booking cancelled',
      payment_pending: 'Payment pending from customer'
    }
    
    const updatedBooking = {
      id: bookingId,
      status,
      updatedAt: new Date().toISOString(),
      statusMessage: updateData.message || statusMessages[status],
      ...updateData,
      timeline: [
        // Previous timeline items would be here
        {
          status,
          timestamp: new Date().toISOString(),
          message: updateData.message || statusMessages[status],
          actor: updateData.actor || 'provider'
        }
      ]
    }
    
    // Send appropriate notifications based on status
    if (status === 'confirmed') {
      await this.notifyCustomer(bookingId, 'booking_confirmed', updatedBooking)
      await emailService.sendBookingConfirmation(updateData.customerEmail, updatedBooking)
    } else if (status === 'completed') {
      await this.notifyCustomer(bookingId, 'booking_completed', updatedBooking)
      await emailService.sendServiceCompletionEmail(updateData.customerEmail, updatedBooking)
    } else if (status === 'rejected') {
      await this.notifyCustomer(bookingId, 'booking_rejected', updatedBooking)
      await emailService.sendBookingRejectionEmail(updateData.customerEmail, updatedBooking)
    }
    
    return updatedBooking
  },

  async rescheduleBooking(bookingId, newDate, newTime, reason = '') {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedBooking = {
      id: bookingId,
      scheduledDate: newDate,
      scheduledTime: newTime,
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'rescheduled',
          timestamp: new Date().toISOString(),
          message: `Booking rescheduled to ${newDate} at ${newTime}. Reason: ${reason}`,
          actor: 'provider'
        }
      ]
    }
    
    await this.notifyCustomer(bookingId, 'booking_rescheduled', updatedBooking)
    
    return updatedBooking
  },

  async cancelBooking(bookingId, reason, cancelledBy = 'customer') {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedBooking = {
      id: bookingId,
      status: 'cancelled',
      cancellationReason: reason,
      cancelledBy,
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'cancelled',
          timestamp: new Date().toISOString(),
          message: `Booking cancelled by ${cancelledBy}. Reason: ${reason}`,
          actor: cancelledBy
        }
      ]
    }
    
    // Notify the other party
    if (cancelledBy === 'customer') {
      await this.notifyProvider(bookingId, 'booking_cancelled', updatedBooking)
    } else {
      await this.notifyCustomer(bookingId, 'booking_cancelled', updatedBooking)
    }
    
    return updatedBooking
  },

  async submitReview(bookingId, rating, review, reviewerType = 'customer') {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const reviewData = {
      bookingId,
      rating,
      review,
      reviewerType,
      createdAt: new Date().toISOString()
    }
    
    // Notify the reviewed party
    if (reviewerType === 'customer') {
      await this.notifyProvider(bookingId, 'review_received', reviewData)
    } else {
      await this.notifyCustomer(bookingId, 'review_received', reviewData)
    }
    
    return reviewData
  },

  calculateEstimatedDuration(service) {
    // Mock duration calculation based on service type
    const durations = {
      'Plumbing': '2-3 hours',
      'Electrical': '1-2 hours',
      'Carpentry': '3-4 hours',
      'AC Repair': '1-2 hours',
      'Painting': '4-6 hours',
      'Cleaning': '2-3 hours'
    }
    return durations[service] || '2-3 hours'
  },

  async notifyProvider(providerId, type, data) {
    // Mock implementation - replace with actual notification service
    const notifications = {
      booking_request: {
        title: 'New Booking Request',
        message: `You have a new booking request from ${data.customerName} for ${data.service}`,
        type: 'booking',
        urgent: data.urgency === 'emergency'
      },
      booking_cancelled: {
        title: 'Booking Cancelled',
        message: `Booking ${data.id} has been cancelled by the customer`,
        type: 'booking_cancelled'
      },
      review_received: {
        title: 'New Review Received',
        message: `You received a ${data.rating}-star review for booking ${data.bookingId}`,
        type: 'review'
      }
    }
    
    const notification = notifications[type]
    if (notification) {
      console.log(`🔔 Provider notification sent:`, notification)
      
      // Simulate real-time notification (WebSocket/Push notification)
      if (typeof window !== 'undefined' && window.providerNotificationHandler) {
        window.providerNotificationHandler(notification)
      }
    }
    
    return { success: true, notification }
  },

  async notifyCustomer(customerId, type, data) {
    // Mock implementation - replace with actual notification service
    const notifications = {
      booking_submitted: {
        title: 'Booking Request Sent',
        message: `Your booking request has been sent to ${data.providerName}. You will be notified once they respond.`,
        type: 'booking'
      },
      booking_confirmed: {
        title: 'Booking Confirmed',
        message: `Your ${data.service} service with ${data.providerName} has been confirmed for ${data.scheduledDate}`,
        type: 'booking_confirmed'
      },
      booking_rejected: {
        title: 'Booking Declined',
        message: `Your booking request was declined by ${data.providerName}. We can help you find another provider.`,
        type: 'booking_cancelled'
      },
      booking_completed: {
        title: 'Service Completed',
        message: `Your ${data.service} service has been completed. Please rate your experience.`,
        type: 'booking_completed'
      },
      booking_rescheduled: {
        title: 'Booking Rescheduled',
        message: `Your booking has been rescheduled to ${data.scheduledDate} at ${data.scheduledTime}`,
        type: 'booking'
      },
      booking_cancelled: {
        title: 'Booking Cancelled',
        message: `Your booking has been cancelled by the service provider. A full refund will be processed.`,
        type: 'booking_cancelled'
      },
      review_received: {
        title: 'Review Received',
        message: `${data.reviewerType === 'provider' ? 'Your service provider' : 'You'} left a review for booking ${data.bookingId}`,
        type: 'review'
      }
    }
    
    const notification = notifications[type]
    if (notification) {
      console.log(`🔔 Customer notification sent:`, notification)
      
      // Simulate real-time notification (WebSocket/Push notification)
      if (typeof window !== 'undefined' && window.customerNotificationHandler) {
        window.customerNotificationHandler(notification)
      }
    }
    
    return { success: true, notification }
  }
}

// Enhanced Email notification service
export const emailService = {
  async sendBookingConfirmation(customerEmail, bookingDetails) {
    // Mock implementation - replace with actual email service (SendGrid, Mailgun, etc.)
    console.log('📧 Booking confirmation email sent:', {
      to: customerEmail,
      subject: `Booking Confirmed - ${bookingDetails.service} Service`,
      template: 'booking-confirmation',
      data: {
        bookingId: bookingDetails.id,
        service: bookingDetails.service,
        providerName: bookingDetails.providerName,
        scheduledDate: bookingDetails.scheduledDate,
        scheduledTime: bookingDetails.scheduledTime,
        estimatedPrice: bookingDetails.estimatedPrice,
        providerPhone: bookingDetails.providerPhone,
        address: bookingDetails.address,
        specialInstructions: bookingDetails.additionalNotes
      }
    })
    
    return { success: true, messageId: 'conf_msg_' + Date.now() }
  },

  async sendProviderNotification(providerEmail, bookingDetails) {
    // Mock implementation
    console.log('📧 Provider notification email sent:', {
      to: providerEmail,
      subject: `New Booking Request - ${bookingDetails.service}`,
      template: 'provider-notification',
      data: {
        bookingId: bookingDetails.bookingId,
        customerName: bookingDetails.customerName,
        customerPhone: bookingDetails.customerPhone,
        service: bookingDetails.service,
        preferredDate: bookingDetails.preferredDate,
        preferredTime: bookingDetails.preferredTime,
        address: bookingDetails.address,
        description: bookingDetails.description,
        urgency: bookingDetails.urgency,
        estimatedPrice: bookingDetails.estimatedPrice
      }
    })
    
    return { success: true, messageId: 'prov_msg_' + Date.now() }
  },

  async sendServiceCompletionEmail(customerEmail, bookingDetails) {
    // Mock implementation
    console.log('📧 Service completion email sent:', {
      to: customerEmail,
      subject: `Service Completed - ${bookingDetails.service}`,
      template: 'service-completion',
      data: {
        bookingId: bookingDetails.id,
        service: bookingDetails.service,
        providerName: bookingDetails.providerName,
        completedAt: bookingDetails.completedAt,
        finalPrice: bookingDetails.finalPrice,
        reviewLink: `https://handyfix.com/review/${bookingDetails.id}`
      }
    })
    
    return { success: true, messageId: 'comp_msg_' + Date.now() }
  },

  async sendBookingRejectionEmail(customerEmail, bookingDetails) {
    // Mock implementation
    console.log('📧 Booking rejection email sent:', {
      to: customerEmail,
      subject: `Booking Update - Alternative Providers Available`,
      template: 'booking-rejection',
      data: {
        bookingId: bookingDetails.id,
        service: bookingDetails.service,
        originalProviderName: bookingDetails.providerName,
        reason: bookingDetails.statusMessage,
        alternativeProvidersLink: `https://handyfix.com/providers?service=${bookingDetails.service}`
      }
    })
    
    return { success: true, messageId: 'rej_msg_' + Date.now() }
  },

  async sendWelcomeEmail(userEmail, userData) {
    // Mock implementation
    const template = userData.userType === 'provider' ? 'provider-welcome' : 'customer-welcome'
    const subject = userData.userType === 'provider' 
      ? 'Welcome to HandyFix Pro - Start Growing Your Business' 
      : 'Welcome to HandyFix - Your Home Service Solution'
    
    console.log('📧 Welcome email sent:', {
      to: userEmail,
      subject,
      template,
      data: {
        name: userData.name,
        userType: userData.userType,
        verificationLink: `https://handyfix.com/verify/${userData.id}`,
        dashboardLink: userData.userType === 'provider' 
          ? 'https://handyfix.com/dashboard/provider'
          : 'https://handyfix.com/dashboard/user',
        helpLink: 'https://handyfix.com/help'
      }
    })
    
    return { success: true, messageId: 'wel_msg_' + Date.now() }
  },

  async sendVerificationEmail(userEmail, verificationToken) {
    // Mock implementation
    console.log('📧 Verification email sent:', {
      to: userEmail,
      subject: 'Verify your HandyFix account',
      template: 'email-verification',
      data: { 
        verificationLink: `https://handyfix.com/verify?token=${verificationToken}`,
        expiresIn: '24 hours'
      }
    })
    
    return { success: true, messageId: 'ver_msg_' + Date.now() }
  },

  async sendPasswordResetEmail(userEmail, resetToken) {
    // Mock implementation
    console.log('📧 Password reset email sent:', {
      to: userEmail,
      subject: 'Reset your HandyFix password',
      template: 'password-reset',
      data: { 
        resetLink: `https://handyfix.com/reset-password?token=${resetToken}`,
        expiresIn: '1 hour'
      }
    })
    
    return { success: true, messageId: 'reset_msg_' + Date.now() }
  },

  async sendReminder(userEmail, reminderType, data) {
    // Mock implementation for various reminders
    const reminders = {
      booking_upcoming: {
        subject: 'Upcoming Service Reminder',
        template: 'booking-reminder',
        data: {
          service: data.service,
          providerName: data.providerName,
          scheduledDate: data.scheduledDate,
          scheduledTime: data.scheduledTime,
          providerPhone: data.providerPhone
        }
      },
      payment_due: {
        subject: 'Payment Due - Service Completed',
        template: 'payment-reminder',
        data: {
          bookingId: data.bookingId,
          amount: data.amount,
          paymentLink: `https://handyfix.com/pay/${data.bookingId}`
        }
      },
      review_request: {
        subject: 'How was your service experience?',
        template: 'review-request',
        data: {
          providerName: data.providerName,
          service: data.service,
          reviewLink: `https://handyfix.com/review/${data.bookingId}`
        }
      }
    }
    
    const reminder = reminders[reminderType]
    if (reminder) {
      console.log('📧 Reminder email sent:', {
        to: userEmail,
        subject: reminder.subject,
        template: reminder.template,
        data: reminder.data
      })
    }
    
    return { success: true, messageId: 'rem_msg_' + Date.now() }
  }
}

// SMS notification service
export const smsService = {
  async sendBookingConfirmation(phoneNumber, bookingDetails) {
    // Mock implementation - replace with actual SMS service (Twilio, etc.)
    console.log('📱 SMS sent:', {
      to: phoneNumber,
      message: `HandyFix: Your ${bookingDetails.service} booking is confirmed for ${bookingDetails.scheduledDate} at ${bookingDetails.scheduledTime}. Provider: ${bookingDetails.providerName} (${bookingDetails.providerPhone})`
    })
    
    return { success: true, messageId: 'sms_' + Date.now() }
  },

  async sendProviderAlert(phoneNumber, bookingDetails) {
    // Mock implementation
    console.log('📱 Provider SMS sent:', {
      to: phoneNumber,
      message: `HandyFix: New booking request for ${bookingDetails.service} from ${bookingDetails.customerName}. Check your app for details.`
    })
    
    return { success: true, messageId: 'sms_' + Date.now() }
  },

  async sendStatusUpdate(phoneNumber, message) {
    // Mock implementation
    console.log('📱 Status SMS sent:', {
      to: phoneNumber,
      message: `HandyFix: ${message}`
    })
    
    return { success: true, messageId: 'sms_' + Date.now() }
  }
}

// Push notification service
export const pushNotificationService = {
  async sendToUser(userId, notification) {
    // Mock implementation - replace with actual push service (Firebase, OneSignal, etc.)
    console.log('📲 Push notification sent:', {
      userId,
      title: notification.title,
      body: notification.message,
      data: notification.data || {},
      icon: notification.icon || '/favicon.ico',
      badge: notification.badge || 1
    })
    
    return { success: true, messageId: 'push_' + Date.now() }
  },

  async sendToProvider(providerId, notification) {
    // Mock implementation
    return this.sendToUser(providerId, {
      ...notification,
      icon: '/provider-icon.png'
    })
  },

  async sendToCustomer(customerId, notification) {
    // Mock implementation
    return this.sendToUser(customerId, {
      ...notification,
      icon: '/customer-icon.png'
    })
  }
}

// Utility functions
export const generateBookingId = () => {
  const prefix = 'HF'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export const formatBookingNotification = (booking) => {
  return {
    title: 'New Booking Request',
    message: `Service: ${booking.service} | Customer: ${booking.customerName} | Date: ${booking.preferredDate} | Time: ${booking.preferredTime}`,
    type: 'booking',
    actionUrl: '/provider/bookings',
    actionText: 'View Details',
    urgent: booking.urgency === 'emergency',
    data: booking
  }
}

export const formatConfirmationNotification = (booking) => {
  return {
    title: 'Booking Confirmed',
    message: `Your ${booking.service} service with ${booking.providerName} has been confirmed for ${booking.confirmedDate} at ${booking.confirmedTime}`,
    type: 'booking_confirmed',
    actionUrl: '/dashboard/user',
    actionText: 'View Booking',
    data: booking
  }
}

export const formatReminderNotification = (booking, reminderType) => {
  const reminders = {
    upcoming: {
      title: 'Service Reminder',
      message: `Your ${booking.service} appointment is scheduled for tomorrow at ${booking.scheduledTime}`,
      type: 'reminder'
    },
    arrived: {
      title: 'Provider Arrived',
      message: `${booking.providerName} has arrived for your ${booking.service} appointment`,
      type: 'notification'
    },
    completed: {
      title: 'Service Completed',
      message: `Your ${booking.service} has been completed. Please rate your experience`,
      type: 'booking_completed'
    }
  }
  
  return reminders[reminderType] || reminders.upcoming
}

// Validation utilities
export const validateBookingData = (bookingData) => {
  const errors = []
  
  if (!bookingData.serviceDescription?.trim()) {
    errors.push('Service description is required')
  }
  
  if (!bookingData.preferredDate) {
    errors.push('Preferred date is required')
  } else {
    const selectedDate = new Date(bookingData.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      errors.push('Preferred date cannot be in the past')
    }
  }
  
  if (!bookingData.preferredTime) {
    errors.push('Preferred time is required')
  }
  
  if (!bookingData.address?.trim()) {
    errors.push('Service address is required')
  }
  
  if (!bookingData.contactNumber?.trim()) {
    errors.push('Contact number is required')
  } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(bookingData.contactNumber)) {
    errors.push('Please enter a valid contact number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const calculateServicePrice = (basePrice, urgency, timeSlot, additionalServices = []) => {
  let finalPrice = basePrice
  
  // Urgency multipliers
  const urgencyMultipliers = {
    emergency: 1.5,
    urgent: 1.25,
    normal: 1.0
  }
  
  // Time slot multipliers (for off-hours)
  const hour = parseInt(timeSlot?.split(':')[0] || '10')
  const isOffHours = hour < 8 || hour > 18
  const timeMultiplier = isOffHours ? 1.2 : 1.0
  
  // Apply multipliers
  finalPrice *= urgencyMultipliers[urgency] || 1.0
  finalPrice *= timeMultiplier
  
  // Add additional services
  const additionalCost = additionalServices.reduce((sum, service) => sum + (service.price || 0), 0)
  finalPrice += additionalCost
  
  return {
    basePrice,
    urgencyMultiplier: urgencyMultipliers[urgency] || 1.0,
    timeMultiplier,
    additionalCost,
    finalPrice: Math.round(finalPrice)
  }
}

export const getAvailableTimeSlots = (providerAvailability, selectedDate) => {
  // Mock implementation - replace with actual availability checking
  const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'lowercase' })
  const dayAvailability = providerAvailability[dayOfWeek]
  
  if (!dayAvailability?.available) {
    return []
  }
  
  const slots = []
  const start = parseInt(dayAvailability.start.split(':')[0])
  const end = parseInt(dayAvailability.end.split(':')[0])
  
  for (let hour = start; hour < end; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    if (hour + 0.5 < end) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  
  return slots
}
