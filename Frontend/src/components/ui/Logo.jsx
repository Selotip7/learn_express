export function Logo({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700,
        color: 'var(--text)', cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: 36, height: 36,
        background: 'var(--accent)',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#000',
      }}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
        </svg>
      </div>
      NexApp
    </div>
  )
}
