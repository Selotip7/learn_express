const BG   = { green: 'rgba(0,255,136,0.1)',  red: 'rgba(255,77,106,0.1)',  blue: 'rgba(77,159,255,0.1)',  yellow: 'rgba(255,170,0,0.1)'  }
const TEXT = { green: 'var(--accent)',         red: 'var(--danger)',          blue: 'var(--info)',            yellow: 'var(--warning)'        }

export function Badge({ children, color = 'green' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
      fontFamily: 'var(--mono)',
      background: BG[color],
      color: TEXT[color],
    }}>
      ● {children}
    </span>
  )
}
