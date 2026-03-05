// ─── User / String helpers ────────────────────────────────────────────────────

/**
 * Return up to 2 initials from a full name.
 * e.g. "Budi Santoso" → "BS"
 */
export const initials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

/**
 * Capitalise each word coming after delimiters like `.`, `_`, `-`.
 * Used to derive a display name from an email local part.
 */
export const emailToName = (email = '') =>
  email
    .split('@')[0]
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

// ─── LocalStorage helpers ─────────────────────────────────────────────────────

const DEFAULT_USERS = [
  { id: 1, name: 'Budi Santoso',    email: 'budi@contoh.com',  role: 'Admin',  status: 'Aktif',      phone: '' },
  { id: 2, name: 'Dewi Rahayu',     email: 'dewi@contoh.com',  role: 'Editor', status: 'Aktif',      phone: '' },
  { id: 3, name: 'Andi Wijaya',     email: 'andi@contoh.com',  role: 'User',   status: 'Tidak Aktif', phone: '' },
  { id: 4, name: 'Siti Nurhaliza',  email: 'siti@contoh.com',  role: 'User',   status: 'Aktif',      phone: '' },
  { id: 5, name: 'Rizky Fadhillah', email: 'rizky@contoh.com', role: 'User',   status: 'Aktif',      phone: '' },
]

export const getUsers = () =>
  JSON.parse(localStorage.getItem('nx_users') || 'null') || DEFAULT_USERS

export const saveUsers = (users) =>
  localStorage.setItem('nx_users', JSON.stringify(users))

// ─── Badge colour helpers ─────────────────────────────────────────────────────

export const roleBadgeColor = (role) =>
  role === 'Admin' ? 'blue' : role === 'Editor' ? 'yellow' : 'green'

export const statusBadgeColor = (status) =>
  status === 'Aktif' ? 'green' : 'red'

// ─── Browser detector ────────────────────────────────────────────────────────

export const detectBrowser = () => {
  const ua = navigator.userAgent
  if (ua.includes('Chrome'))  return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari'))  return 'Safari'
  if (ua.includes('Edge'))    return 'Edge'
  return 'Browser'
}
