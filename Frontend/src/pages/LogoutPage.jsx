import { useState } from 'react'
import { Button, Badge } from '../components/ui'
import { initials, clearStoredUser } from '../utils'

export function LogoutPage({ setPage, user }) {
  const [state, setState] = useState('confirm')
  const [count, setCount] = useState(3)

  const ua = navigator.userAgent
  const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : ua.includes('Safari') ? 'Safari' : 'Browser'
  const loginTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  const startLogout = async () => {
    setState('loading')
    clearStoredUser()
    try {
      await fetch('http://localhost:3001/api/user/logout', { method: 'GET', credentials: 'include' })
    } catch { /* ignore */ }
    setTimeout(() => { setState('done'); startCountdown() }, 1800)
  }

  const startCountdown = () => {
    let c = 3
    const iv = setInterval(() => {
      c--
      setCount(c)
      if (c <= 0) { clearInterval(iv); setPage('login') }
    }, 1000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
      <div className="fade-scale" style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>

        {/* ─ Confirm ─ */}
        {state === 'confirm' && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="32" height="32" fill="none" stroke="var(--danger)" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: 'white', marginBottom: 8 }}>Keluar?</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>Sesi Anda akan diakhiri. Pastikan pekerjaan sudah tersimpan.</p>

            {/* User card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0, fontFamily: 'var(--mono)' }}>
                {initials(user?.name)}
              </div>
              <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                <p style={{ fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Demo User'}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || 'demo@app.com'}</p>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <Button variant="danger" full style={{ fontSize: 15, padding: 15 }} onClick={startLogout}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Ya, Keluar Sekarang
              </Button>
              <Button variant="ghost" full style={{ fontSize: 15, padding: 15 }} onClick={() => setPage('dashboard')}>
                ← Kembali ke Dashboard
              </Button>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, textAlign: 'left' }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 12 }}>Sesi Aktif</p>
              {[['Browser', browser, null], ['Waktu masuk', loginTime, null], ['Status', null, 'Online']].map(([k, v, badge]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  {badge ? <Badge color="green">{badge}</Badge> : <span style={{ color: 'white' }}>{v}</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ─ Loading ─ */}
        {state === 'loading' && (
          <>
            <div style={{ width: 120, height: 120, borderRadius: '50%', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '2px solid transparent', borderTopColor: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
              <svg width="60" height="60" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.6 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8 }}>Mengakhiri Sesi...</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>Mohon tunggu sebentar</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: `bounce 0.8s ease ${d}s infinite` }} />
              ))}
            </div>
          </>
        )}

        {/* ─ Done ─ */}
        {state === 'done' && (
          <>
            <div style={{ position: 'relative', width: 128, height: 128, margin: '0 auto 24px' }}>
              <svg width="128" height="128" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="3" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * (3 - count) / 3)}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 32, color: 'white', fontFamily: 'var(--mono)' }}>{count}</span>
              </div>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8 }}>Berhasil Keluar</h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Sampai jumpa! Dialihkan dalam {count} detik...</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid rgba(0,255,136,0.2)', marginBottom: 24 }}>
              <svg width="14" height="14" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Sesi telah diakhiri dengan aman</p>
            </div>
            <Button variant="accent" full onClick={() => setPage('login')}>Masuk Lagi</Button>
          </>
        )}
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  )
}
