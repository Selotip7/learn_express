import { Logo } from '../ui'
import { initials } from '../../utils'

const NAV_ITEMS = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'users', label: 'Pengguna',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'analytics', label: 'Analitik', disabled: true,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'reports', label: 'Laporan', disabled: true,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
  },
  {
    id: 'settings', label: 'Pengaturan', disabled: true,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

function NavItem({ item, active, onClick }) {
  return (
    <div
      onClick={() => !item.disabled && onClick(item.id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 16px', borderRadius: 10,
        fontSize: 14, fontWeight: 500,
        cursor: item.disabled ? 'default' : 'pointer',
        transition: 'all 0.2s',
        color: active ? 'var(--accent)' : item.disabled ? 'var(--border)' : 'var(--muted)',
        background: active ? 'var(--accent-dim)' : 'transparent',
        border: active ? '1px solid rgba(0,255,136,0.2)' : '1px solid transparent',
      }}
    >
      {item.icon}
      {item.label}
    </div>
  )
}

export function Sidebar({ page, setPage, user }) {
  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <Logo onClick={() => setPage('dashboard')} />
      </div>

      <nav style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item.id} item={item} active={page === item.id} onClick={setPage} />
        ))}
      </nav>

      <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 12, padding: 12, borderRadius: 12,
          background: 'var(--surface2)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--accent)', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>
            {initials(user?.name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email || 'user@app.com'}
            </p>
          </div>
        </div>

        <div
          onClick={() => setPage('logout')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 16px', borderRadius: 10,
            fontSize: 14, fontWeight: 500,
            cursor: 'pointer', color: 'var(--danger)',
            transition: 'background 0.2s',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Keluar
        </div>
      </div>
    </aside>
  )
}
