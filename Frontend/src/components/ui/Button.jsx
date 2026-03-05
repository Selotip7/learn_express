const VARIANTS = {
  accent:  { background: 'var(--accent)',  color: '#000',   border: 'none' },
  ghost:   { background: 'transparent',    color: 'var(--text)',  border: '1.5px solid var(--border)' },
  danger:  { background: 'var(--danger)',  color: '#fff',   border: 'none' },
}

export function Button({
  variant = 'accent',
  full = false,
  sm = false,
  children,
  style: extraStyle,
  ...props
}) {
  const v = VARIANTS[variant] ?? VARIANTS.accent

  return (
    <button
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: sm ? '7px 14px' : '13px 24px',
        borderRadius: sm ? 8 : 10,
        fontFamily: 'var(--sans)', fontWeight: 600,
        fontSize: sm ? 13 : 14,
        cursor: 'pointer',
        transition: 'all 0.2s',
        width: full ? '100%' : undefined,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...v,
        ...extraStyle,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
