import '../styles/globals.css'
import { UserProvider } from '../context/UserContext'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Request notification permission on app load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Check if the component has its own layout (like auth pages)
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <UserProvider>
      {getLayout(<Component {...pageProps} />)}
    </UserProvider>
  )
}
