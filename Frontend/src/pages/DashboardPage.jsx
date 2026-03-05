import { Button, Badge } from '../components/ui'
import { useClock } from '../hooks/useClock'
import { useUsers } from '../hooks/useUsers'
import { initials, roleBadgeColor, statusBadgeColor } from '../utils'

const ROLE_COLORS = { Admin: 'var(--info)', Editor: 'var(--warning)', User: 'var(--accent)' }
const ACTIVITIES = [
  { color: 'var(--accent)',   text: 'Pengguna baru ditambahkan', time: '2m lalu' },
  { color: 'var(--info)',     text: 'Data diperbarui',           time: '15m lalu' },
  { color: 'var(--warning)',  text: 'Pengguna dinonaktifkan',    time: '1j lalu' },
  { color: 'var(--danger)',   text: 'Pengguna dihapus',          time: '3j lalu' },
]

function StatCard({ label, value, iconColor, bgColor }) {
  return (
    <div
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22, cursor: 'default', transition: 'border-color 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <svg width="20" height="20" fill="none" stroke={iconColor} strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        </svg>
      </div>
      <p style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4 }}>{value}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</p>
    </div>
  )
}

function RoleBarChart({ users }) {
  const roles = ['Admin', 'Editor', 'User']
  const max = Math.max(...roles.map(r => users.filter(u => u.role === r).length), 1)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
      <p style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Pengguna per Role</p>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 20 }}>Distribusi Role</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
        {roles.map(r => {
          const count = users.filter(u => u.role === r).length
          const pct = (count / max) * 100
          return (
            <div key={r} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ROLE_COLORS[r], fontFamily: 'var(--mono)' }}>{count}</span>
              <div style={{ width: '100%', flex: 1, background: 'var(--surface2)', borderRadius: '4px 4px 0 0', position: 'relative', minHeight: 8 }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderRadius: '4px 4px 0 0', background: ROLE_COLORS[r], opacity: 0.8, height: `${Math.max(pct, 8)}%`, transition: 'height 0.8s ease' }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{r}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ActivityFeed() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
      <p style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Aktivitas</p>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 16 }}>Terbaru</h3>
      {ACTIVITIES.map((a, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < ACTIVITIES.length - 1 ? '1px solid rgba(42,42,58,0.5)' : 'none' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
          <div style={{ flex: 1 }}><p style={{ fontSize: 12, color: 'white' }}>{a.text}</p></div>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', flexShrink: 0 }}>{a.time}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardPage({ setPage }) {
  const time    = useClock()
  const { users } = useUsers()

  const stats = [
    { label: 'Total Pengguna', value: users?.length||0,                                   iconColor: 'var(--accent)',  bgColor: 'rgba(0,255,136,0.1)' },
    { label: 'Aktif',          value: users.filter(u => u.status === 'Aktif').length, iconColor: 'var(--accent)',  bgColor: 'rgba(0,255,136,0.1)' },
    { label: 'Tidak Aktif',    value: users.filter(u => u.status !== 'Aktif').length, iconColor: 'var(--warning)', bgColor: 'rgba(255,170,0,0.1)' },
    { label: 'Admin',          value: users.filter(u => u.role === 'Admin').length,   iconColor: 'var(--info)',    bgColor: 'rgba(77,159,255,0.1)' },
  ]

  const recent = [...users].slice(-5).reverse()

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 32, position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>// Overview</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginTop: 2 }}>Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--mono)' }}>{time.toTimeString().slice(0, 8)}</p>
          </div>
          <Button variant="accent" sm onClick={() => setPage('users')}>+ Tambah User</Button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <RoleBarChart users={users} />
        <ActivityFeed />
      </div>

      {/* Recent table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Tabel</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>Pengguna Terbaru</h3>
          </div>
          <Button variant="ghost" sm onClick={() => setPage('users')}>Lihat Semua →</Button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Nama','Email','Role','Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'var(--mono)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(u => (
                <tr key={u.id}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{initials(u.name)}</div>
                      <span style={{ fontWeight: 600, color: 'white' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 13 }}>{u.email}</td>
                  <td style={{ padding: '14px 16px' }}><Badge color={roleBadgeColor(u.role)}>{u.role}</Badge></td>
                  <td style={{ padding: '14px 16px' }}><Badge color={statusBadgeColor(u.status)}>{u.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
