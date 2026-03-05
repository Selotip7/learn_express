import Sidebar from './Sidebar.jsx'

export default function AppLayout({ page, navigate, user, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} navigate={navigate} user={user} />
      <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
    </div>
  )
}
