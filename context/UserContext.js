import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('handyfix_user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      loadNotifications(userData.id)
    }
    setLoading(false)
  }, [])

  const login = async (userData) => {
    // Mock login - replace with actual API call
    const userWithId = {
      ...userData,
      id: Date.now(), // Mock ID
      createdAt: new Date().toISOString()
    }
    
    setUser(userWithId)
    localStorage.setItem('handyfix_user', JSON.stringify(userWithId))
    await loadNotifications(userWithId.id)
    return userWithId
  }

  const logout = () => {
    setUser(null)
    setNotifications([])
    localStorage.removeItem('handyfix_user')
  }

  const updateProfile = async (updatedData) => {
    // Mock update - replace with actual API call
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('handyfix_user', JSON.stringify(updatedUser))
    return updatedUser
  }

  const loadNotifications = async (userId) => {
    // Mock notifications - replace with actual API call
    const mockNotifications = [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'You have a new booking request from Priya Sharma',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/dashboard/provider'
      },
      {
        id: 2,
        type: 'booking_confirmed',
        title: 'Booking Confirmed',
        message: 'Your booking with Rajesh Kumar has been confirmed',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/dashboard/user'
      }
    ]
    
    setNotifications(mockNotifications.filter(n => n.userId === userId || !n.userId))
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
    
    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      })
    }
  }

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  const value = {
    user,
    loading,
    notifications,
    login,
    logout,
    updateProfile,
    loadNotifications,
    markNotificationAsRead,
    addNotification,
    requestNotificationPermission,
    isCustomer: user?.userType === 'customer',
    isProvider: user?.userType === 'provider',
    isAdmin: user?.role === 'admin'
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
