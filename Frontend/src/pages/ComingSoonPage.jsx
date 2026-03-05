const PAGE_LABELS = {
  analytics: 'Analitik',
  reports:   'Laporan',
  settings:  'Pengaturan',
}

export default function ComingSoonPage({ page }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        padding: 32,
      }}
    >
      <div className="fade-scale" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🚧</div>
        <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          // {PAGE_LABELS[page] ?? page}
        </p>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>
          Segera Hadir
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          Fitur ini sedang dalam pengembangan aktif.
        </p>
      </div>
    </div>
  )
}
