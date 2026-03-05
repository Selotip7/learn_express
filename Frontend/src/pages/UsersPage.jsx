import { useState } from 'react'
import { Button, Badge, Modal, Input, Select, Label } from '../components/ui'
import { useUsers } from '../hooks/useUsers'
import { initials, roleBadgeColor, statusBadgeColor } from '../utils'

const PER_PAGE = 5
const FILTERS  = [
  { id: 'semua',      label: 'Semua' },
  { id: 'Aktif',      label: 'Aktif' },
  { id: 'Tidak Aktif',label: 'Nonaktif' },
  { id: 'Admin',      label: 'Admin' },
  { id: 'Editor',     label: 'Editor' },
  { id: 'User',       label: 'User' },
]

function UserFormModal({ open, onClose, editUser, onSave }) {
  const [form, setForm] = useState(
    editUser
      ? (() => { const [fn, ...ln] = (editUser.name || '').split(' '); return { firstname: fn, lastname: ln.join(' '), email: editUser.email, phone: editUser.phone || '', role: editUser.role, status: editUser.status } })()
      : { firstname: '', lastname: '', email: '', phone: '', role: 'User', status: 'Aktif' }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal open={open} onClose={onClose} maxWidth={520}>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
      <p style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--accent)', marginBottom: 4 }}>// Form</p>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 24 }}>{editUser ? 'Edit Pengguna' : 'Tambah Pengguna'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div><Label>Nama Depan</Label><Input placeholder="John" value={form.firstname} onChange={e => setForm({ ...form, firstname: e.target.value })} required /></div>
          <div><Label>Nama Belakang</Label><Input placeholder="Doe" value={form.lastname} onChange={e => setForm({ ...form, lastname: e.target.value })} /></div>
        </div>
        <div style={{ marginBottom: 16 }}><Label>Email</Label><Input type="email" placeholder="john@contoh.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
        <div style={{ marginBottom: 16 }}><Label>No. Telepon <span style={{ color: 'var(--muted)' }}>(opsional)</span></Label><Input type="tel" placeholder="+62 812 xxxx xxxx" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div><Label>Role</Label><Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option>USER</option><option>ADMIN</option><option>Editor</option></Select></div>
          <div><Label>Status</Label><Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>Aktif</option><option>Tidak Aktif</option></Select></div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button type="button" variant="ghost" full onClick={onClose}>Batal</Button>
          <Button type="submit" variant="accent" full>Simpan →</Button>
        </div>
      </form>
    </Modal>
  )
}

function DeleteModal({ open, user, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={400}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,77,106,0.1)', border: '1px solid rgba(255,77,106,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="28" height="28" fill="none" stroke="var(--danger)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>Hapus Pengguna?</h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Data <strong style={{ color: 'white' }}>{user?.name}</strong> akan dihapus permanen.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="ghost" full onClick={onClose}>Batal</Button>
          <Button variant="danger" full onClick={onConfirm}>Hapus</Button>
        </div>
      </div>
    </Modal>
  )
}

function ViewModal({ open, user, onClose, onEdit }) {
  if (!user) return null
  return (
    <Modal open={open} onClose={onClose} maxWidth={440}>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, fontFamily: 'var(--mono)', margin: '0 auto 12px' }}>{initials(user.name)}</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{user.name}</h3>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
          <Badge color={roleBadgeColor(user.role)}>{user.role}</Badge>
          <Badge color={statusBadgeColor(user.status)}>{user.status}</Badge>
        </div>
      </div>
      {[['Email', user.email, '✉'], ['Telepon', user.phone || '—', '📞'], ['ID', '#' + user.id, '🆔']].map(([l, v, ic]) => (
        <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{l}</span>
          <span style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{ic} {v}</span>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Button variant="ghost" full onClick={onClose}>Tutup</Button>
        <Button variant="accent" full onClick={() => { onClose(); onEdit(user) }}>Edit →</Button>
      </div>
    </Modal>
  )
}

export function UsersPage({ showToast }) {
  const { users, addUser, updateUser, deleteUser } = useUsers()
  const [search,      setSearch]      = useState('')
  const [filter,      setFilter]      = useState('semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [formModal,   setFormModal]   = useState(false)
  const [editTarget,  setEditTarget]  = useState(null)
  const [deleteTarget,setDeleteTarget]= useState(null)
  const [viewTarget,  setViewTarget]  = useState(null)


  const filtered = users.filter(u => {
    // console.log(users);
    const q = search.toLowerCase()
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchF = filter === 'semua' || u.status === filter || u.role === filter
    return matchQ && matchF
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const page       = Math.min(currentPage, totalPages)
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const openAdd = () => { setEditTarget(null); setFormModal(true) }
  const openEdit = (u) => { setEditTarget(u); setFormModal(true) }

  const handleSave = async(form) => {
    const name = `${form.firstname} ${form.lastname}`.trim()
    const data = { name, email: form.email, phone: form.phone, role: form.role, status: form.status }
    if (editTarget) { updateUser(editTarget.id, data); showToast('✓ Pengguna berhasil diperbarui') }
    else{
      try{
        await addUser(data);      
        showToast('✓ Pengguna berhasil ditambahkan')
      }catch(err){
        showToast(err.message);
      }
       }
    setFormModal(false)
  }

  const handleDelete = () => {
    deleteUser(deleteTarget.id)
    showToast('🗑 Pengguna dihapus')
    setDeleteTarget(null)
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 32, position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontFamily: 'var(--mono)' }}>// Manajemen</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginTop: 2 }}>
            Pengguna <span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 18 }}>({users.length})</span>
          </h1>
        </div>
        <Button variant="accent" onClick={openAdd}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tambah Pengguna
        </Button>
      </div>

      {/* Search & Filters */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', display: 'flex' }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <Input style={{ paddingLeft: 38 }} placeholder="Cari nama atau email..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1) }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => { setFilter(f.id); setCurrentPage(1) }} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--mono)', transition: 'all 0.2s',
                border: `1.5px solid ${filter === f.id ? 'var(--accent)' : 'var(--border)'}`,
                background: filter === f.id ? 'var(--accent-dim)' : 'transparent',
                color: filter === f.id ? 'var(--accent)' : 'var(--muted)',
              }}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['#','Nama','Email','Role','Status','Aksi'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: 'var(--mono)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    <p style={{ fontWeight: 600 }}>Tidak ada data</p>
                    <p style={{ fontSize: 13, marginTop: 4 }}>Coba ubah filter atau kata kunci pencarian</p>
                  </td>
                </tr>
              ) : paged.map((u, i) => (
                <tr key={u.id}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  style={{ transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 16px', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 12 }}>{(page - 1) * PER_PAGE + i + 1}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: 'var(--mono)', flexShrink: 0 }}>{initials(u.name)}</div>
                      <span style={{ fontWeight: 600, color: 'white', fontSize: 14 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 13 }}>{u.email}</td>
                  <td style={{ padding: '14px 16px' }}><Badge color={roleBadgeColor(u.role)}>{u.role}</Badge></td>
                  <td style={{ padding: '14px 16px' }}><Badge color={statusBadgeColor(u.status)}>{u.status}</Badge></td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <Button variant="ghost" sm onClick={() => setViewTarget(u)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Button>
                      <Button variant="ghost" sm onClick={() => openEdit(u)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Button>
                      <button onClick={() => setDeleteTarget(u)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', background: 'rgba(255,77,106,0.1)', color: 'var(--danger)', border: '1px solid rgba(255,77,106,0.2)', fontSize: 13, transition: 'all 0.2s' }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
            {filtered.length === 0 ? '0 hasil' : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)} dari ${filtered.length}`}
          </p>
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} style={{
                width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: 'var(--mono)', transition: 'all 0.2s',
                border: `1.5px solid ${p === page ? 'var(--accent)' : 'var(--border)'}`,
                background: p === page ? 'var(--accent-dim)' : 'transparent',
                color: p === page ? 'var(--accent)' : 'var(--muted)',
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserFormModal open={formModal} onClose={() => setFormModal(false)} editUser={editTarget} onSave={handleSave} key={editTarget?.id ?? 'new'} />
      <DeleteModal   open={!!deleteTarget} user={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
      <ViewModal     open={!!viewTarget}   user={viewTarget}   onClose={() => setViewTarget(null)}   onEdit={openEdit} />
    </div>
  )
}
