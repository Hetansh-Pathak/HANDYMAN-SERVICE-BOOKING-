import { useUser } from '../context/UserContext'
import CustomerLayout from './layouts/CustomerLayout'
import ProviderLayout from './layouts/ProviderLayout'
import AdminLayout from './layouts/AdminLayout'
import Layout from './Layout' // Default layout for non-authenticated users

export default function RoleBasedLayout({ children, ...props }) {
  const { user, isCustomer, isProvider, isAdmin } = useUser()

  // If user is not logged in, use default layout
  if (!user) {
    return <Layout {...props}>{children}</Layout>
  }

  // Use role-specific layout based on user type
  if (isAdmin) {
    return <AdminLayout {...props}>{children}</AdminLayout>
  }
  
  if (isProvider) {
    return <ProviderLayout {...props}>{children}</ProviderLayout>
  }
  
  if (isCustomer) {
    return <CustomerLayout {...props}>{children}</CustomerLayout>
  }

  // Fallback to default layout
  return <Layout {...props}>{children}</Layout>
}
