export function Toast({ message }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: 'var(--surface2)',
      border: '1px solid var(--accent)',
      color: 'var(--text)',
      padding: '14px 20px',
      borderRadius: 12,
      fontSize: 14,
      boxShadow: '0 0 20px var(--accent-glow)',
      fontFamily: 'var(--mono)',
      transition: 'all 0.3s ease',
      opacity: message ? 1 : 0,
      transform: message ? 'translateY(0)' : 'translateY(60px)',
      pointerEvents: 'none',
    }}>
      {message}
    </div>
  )
}
