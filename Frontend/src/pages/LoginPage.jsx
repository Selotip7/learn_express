import { useState } from 'react'
import { Button, Input, Label, Logo } from '../components/ui'
import { nameFromEmail, saveStoredUser } from '../utils'

const FEATURES = [
  { icon: '📊', title: 'Dashboard Real-time',  desc: 'Pantau semua metrik bisnis dalam satu tampilan' },
  { icon: '👥', title: 'Manajemen Tim',         desc: 'Atur akses dan peran pengguna dengan mudah' },
  { icon: '🔒', title: 'Keamanan Tinggi',       desc: 'Enkripsi data end-to-end pada setiap transaksi' },
]

function LeftPanel() {
  return (
    <div style={{
      width: 480, flexShrink: 0,
      background: 'linear-gradient(135deg,#0a0a0f 0%,#0f1a14 100%)',
      display: 'none', flexDirection: 'column', justifyContent: 'space-between',
      padding: 48, position: 'relative', overflow: 'hidden',
    }} className="login-left">
      {/* Hex bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104' viewBox='0 0 60 104'%3E%3Cpath d='M30 4 L56 19 L56 49 L30 64 L4 49 L4 19 Z' fill='none' stroke='rgba(0,255,136,0.06)' stroke-width='1'/%3E%3C/svg%3E")`,
        opacity: 0.8,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%,rgba(0,255,136,0.08) 0%,transparent 65%)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Logo />
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 12 }}>
            Kelola bisnis<br />lebih <span style={{ color: 'var(--accent)' }}>cerdas.</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>Platform manajemen modern untuk tim yang bergerak cepat.</p>
        </div>

        <div style={{ marginTop: 40 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '18px 0',
              borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,255,136,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 16,
              }}>{f.icon}</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{f.title}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex' }}>
          {['#ff6b6b','#4d9fff','#ffaa00'].map((c, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: '50%', background: c,
              border: '2px solid #0a0a0f',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 12, fontWeight: 700,
              marginLeft: i > 0 ? -8 : 0,
            }}>
              {['A','B','C'][i]}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          Dipercaya <span style={{ color: 'white', fontWeight: 600 }}>2,400+</span> pengguna aktif
        </p>
      </div>
      <style>{`.login-left { display: flex !important; } @media(max-width:1023px){.login-left{display:none !important;}}`}</style>
    </div>
  )
}

export function LoginPage({ setPage, setUser, showToast }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login gagal");
      if (data.success === false) throw new Error(data.message)

      const user = { name: nameFromEmail(email), email }
      saveStoredUser(user)
      setUser(user)
      showToast('✓ Berhasil masuk!')
      setTimeout(() => setPage('dashboard'), 800)
    } catch (err) {
      showToast(err.message)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <LeftPanel />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div className="fade-up" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontFamily: 'var(--mono)', marginBottom: 8 }}>
              // Selamat datang
            </p>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: 'white' }}>Masuk ke akun</h1>
            <p style={{ fontSize: 14, marginTop: 4, color: 'var(--muted)' }}>
              Belum punya akun?{' '}
              <span onClick={() => setPage('register')} style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>
                Daftar gratis →
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <Label>Email</Label>
              <Input
                type="email" placeholder="anda@contoh.com"
                value={email} onChange={e => setEmail(e.target.value)} required
                icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type={showPass ? 'text' : 'password'} placeholder="Masukkan password"
                value={password} onChange={e => setPassword(e.target.value)} required
                icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                rightEl={
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                }
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', cursor: 'pointer' }}>
                <input type="checkbox" /> Ingat saya
              </label>
              <span style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Lupa password?</span>
            </div>

            <Button type="submit" variant="accent" full style={{ fontSize: 15, padding: 15 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10,17 15,12 10,7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Masuk
            </Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>atau lanjutkan dengan</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Google', 'GitHub'].map(p => (
              <Button key={p} variant="ghost" onClick={() => showToast(`${p} login coming soon!`)}>
                {p === 'Google'
                  ? <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  : <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                }
                {p}
              </Button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, marginTop: 32, color: 'var(--muted)' }}>
            Demo: masukkan email & password apa saja
          </p>
        </div>
      </div>
    </div>
  )
}
