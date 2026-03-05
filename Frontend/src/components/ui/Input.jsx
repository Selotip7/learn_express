const inputStyle = (hasIcon, hasRight) => ({
  width: '100%',
  background: 'var(--surface2)',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  padding: hasIcon
    ? '13px 16px 13px 42px'
    : hasRight
      ? '13px 42px 13px 16px'
      : '13px 16px',
  color: 'var(--text)',
  fontFamily: 'var(--sans)',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
})

function handleFocus(e) {
  e.target.style.borderColor = 'var(--accent)'
  e.target.style.boxShadow  = '0 0 0 3px var(--accent-dim)'
}
function handleBlur(e) {
  e.target.style.borderColor = 'var(--border)'
  e.target.style.boxShadow  = 'none'
}

export function Input({ icon, rightEl, style: extra, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      {icon && (
        <span style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--muted)', pointerEvents: 'none',
          display: 'flex',
        }}>
          {icon}
        </span>
      )}
      <input
        style={{ ...inputStyle(!!icon, !!rightEl), ...extra }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {rightEl && (
        <span style={{
          position: 'absolute', right: 14, top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
        }}>
          {rightEl}
        </span>
      )}
    </div>
  )
}

export function Select({ children, style: extra, ...props }) {
  return (
    <select
      style={{
        width: '100%',
        background: 'var(--surface2)',
        border: '1.5px solid var(--border)',
        borderRadius: 10,
        padding: '13px 16px',
        color: 'var(--text)',
        fontFamily: 'var(--sans)',
        fontSize: 14,
        outline: 'none',
        cursor: 'pointer',
        ...extra,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {children}
    </select>
  )
}

export function Label({ children }) {
  return (
    <label style={{
      display: 'block',
      fontSize: 12, fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginBottom: 8,
      fontFamily: 'var(--mono)',
    }}>
      {children}
    </label>
  )
}
