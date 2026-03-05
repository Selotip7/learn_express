const BASE_URL = 'http://localhost:3001/api'

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) throw new Error('Request gagal')

  const data = await res.json()
  if (data.success === false) throw new Error(data.message)

  return data
}

export const apiLogin = (email, password) =>
  request('/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const apiRegister = (name, email, password) =>
  request('/user/registration', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })

export const apiLogout = () =>
  request('/user/logout', { method: 'GET' })

export const apiMe = () =>
  request('/user/me', { method: 'GET' })
