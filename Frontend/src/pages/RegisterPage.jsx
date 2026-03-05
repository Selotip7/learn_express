import { useState } from 'react'
import { Button, Input, Select, Label, Logo } from '../components/ui'

function StepCircle({ n, active }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, fontFamily: 'var(--mono)',
      background: active ? 'var(--accent)' : 'var(--surface2)',
      color: active ? '#000' : 'var(--muted)',
      border: active ? 'none' : '1.5px solid var(--border)',
      transition: 'all 0.3s',
    }}>{n}</div>
  )
}

function PasswordChecks({ password }) {
  const checks = {
    len:   { label: 'Min. 8 karakter', pass: password.length >= 8 },
    upper: { label: 'Huruf besar',     pass: /[A-Z]/.test(password) },
    num:   { label: 'Angka',           pass: /[0-9]/.test(password) },
    sym:   { label: 'Simbol (!@#)',    pass: /[!@#$%^&*]/.test(password) },
  }
  const score = Object.values(checks).filter(c => c.pass).length
  const barColors = ['#ff4d6a','#ff4d6a','#ffaa00','#00ff88']

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < score ? barColors[score - 1] : 'var(--border)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {Object.entries(checks).map(([k, { label, pass }]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'var(--mono)', color: pass ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.2s' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {pass ? <polyline points="20,6 9,17 4,12" /> : <circle cx="12" cy="12" r="10" />}
            </svg>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function RegisterPage({ setPage, showToast }) {
  const [step, setStep] = useState(1)
  const [info, setInfo] = useState({ firstname: '', lastname: '', email: '', phone: '' })
  const [pass, setPass]       = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed]   = useState(false)
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const goStep2 = () => {
    if (!info.firstname || !info.lastname || !info.email) { showToast('Lengkapi semua field!'); return }
    setStep(2)
  }

  const handleRegister = async () => {
    if (pass.length < 8)  { showToast('Password minimal 8 karakter!'); return }
    if (pass !== confirm)  { showToast('Password tidak cocok!'); return }
    if (!agreed)           { showToast('Setujui syarat & ketentuan dulu!'); return }
    try {
      const res = await fetch('http://localhost:3001/api/user/registration', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${info.firstname} ${info.lastname}`, email: info.email, password: pass }),
      })
      if (!res.ok) throw new Error('Request gagal')
      const data = await res.json()
      if (data.success === false) throw new Error(data.message)
      showToast('Registrasi berhasil!')
      setStep(3)
    } catch (err) { alert(err.message) }
  }

  const eyeIcon = (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', zIndex: 1 }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 32 }}>
          <Logo onClick={() => setPage('login')} />
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'white', marginTop: 24 }}>Buat akun baru</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
            Sudah punya akun?{' '}
            <span onClick={() => setPage('login')} style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Masuk →</span>
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '0 16px' }}>
          <StepCircle n="1" active={step >= 1} />
          <div style={{ flex: 1, height: 1, background: step >= 2 ? 'var(--accent)' : 'var(--border)', transition: 'background 0.3s' }} />
          <StepCircle n="2" active={step >= 2} />
          <div style={{ flex: 1, height: 1, background: step >= 3 ? 'var(--accent)' : 'var(--border)', transition: 'background 0.3s' }} />
          <StepCircle n="✓" active={step >= 3} />
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }} className="fade-up">

          {/* ─ Step 1 ─ */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', marginBottom: 16 }}>Langkah 1 — Informasi Pribadi</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <Label>Nama Depan</Label>
                  <Input placeholder="John" value={info.firstname} onChange={e => setInfo({ ...info, firstname: e.target.value })} />
                </div>
                <div>
                  <Label>Nama Belakang</Label>
                  <Input placeholder="Doe" value={info.lastname} onChange={e => setInfo({ ...info, lastname: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Label>Email</Label>
                <Input type="email" placeholder="anda@contoh.com" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })}
                  icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <Label>No. Telepon <span style={{ color: 'var(--muted)' }}>(opsional)</span></Label>
                <Input type="tel" placeholder="+62 812 3456 7890" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} />
              </div>
              <Button variant="accent" full onClick={goStep2}>Lanjut →</Button>
            </div>
          )}

          {/* ─ Step 2 ─ */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', marginBottom: 16 }}>Langkah 2 — Buat Password</p>
              <div style={{ marginBottom: 16 }}>
                <Label>Password</Label>
                <Input type={showPass ? 'text' : 'password'} placeholder="Min. 8 karakter" value={pass} onChange={e => setPass(e.target.value)}
                  icon={<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  rightEl={<button type="button" onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>{eyeIcon}</button>}
                />
                <PasswordChecks password={pass} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Label>Konfirmasi Password</Label>
                <Input type={showConfirm ? 'text' : 'password'} placeholder="Ulangi password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  rightEl={<button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>{eyeIcon}</button>}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2 }} />
                <span>Saya menyetujui <span style={{ color: 'var(--accent)' }}>Syarat & Ketentuan</span> serta <span style={{ color: 'var(--accent)' }}>Kebijakan Privasi</span></span>
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="ghost" full onClick={() => setStep(1)}>← Kembali</Button>
                <Button variant="accent" full onClick={handleRegister}>Daftar →</Button>
              </div>
            </div>
          )}

          {/* ─ Step 3 ─ */}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid rgba(0,255,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="36" height="36" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8 }}>Akun Berhasil Dibuat!</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Selamat bergabung di NexApp. Klik tombol di bawah untuk masuk.</p>
              <Button variant="accent" full onClick={() => setPage('dashboard')} style={{ marginBottom: 12 }}>Pergi ke Dashboard →</Button>
              <Button variant="ghost" full onClick={() => setPage('login')}>Masuk Manual</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
