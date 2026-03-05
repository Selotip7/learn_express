// ─── User storage helpers ────────────────────────────────────────────────────
// export const DEFAULT_USERS = [
//   { id: 1, name: 'Budi Santoso',    email: 'budi@contoh.com',  role: 'Admin',  status: 'Aktif',      phone: '' },
//   { id: 2, name: 'Dewi Rahayu',     email: 'dewi@contoh.com',  role: 'Editor', status: 'Aktif',      phone: '' },
//   { id: 3, name: 'Andi Wijaya',     email: 'andi@contoh.com',  role: 'User',   status: 'Tidak Aktif',phone: '' },
//   { id: 4, name: 'Siti Nurhaliza',  email: 'siti@contoh.com',  role: 'User',   status: 'Aktif',      phone: '' },
//   { id: 5, name: 'Rizky Fadhillah', email: 'rizky@contoh.com', role: 'User',   status: 'Aktif',      phone: '' },
// ]

// export const getStoredUsers = () =>
//   JSON.parse(localStorage.getItem('nx_users') || 'null') || DEFAULT_USERS

export const saveStoredUsers = (users) =>
  localStorage.setItem('nx_users', JSON.stringify(users))

// export const getStoredUser = () =>
//   JSON.parse(localStorage.getItem('nx_user') || 'null')

export const saveStoredUser = (user) =>
  localStorage.setItem('nx_user', JSON.stringify(user))

export const clearStoredUser = () =>
  localStorage.removeItem('nx_user')

// ─── String helpers ──────────────────────────────────────────────────────────
export const initials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

export const nameFromEmail = (email = '') =>
  email.split('@')[0]
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())

// ─── Badge helpers ───────────────────────────────────────────────────────────
export const roleBadgeColor   = (role)   => role === 'Admin' ? 'blue' : role === 'Editor' ? 'yellow' : 'green'
export const statusBadgeColor = (status) => status === 'Aktif' ? 'green' : 'red'
