import { useState, useRef, useCallback } from 'react'

export function useToast() {
  const [message, setMessage] = useState('')
  const timer = useRef(null)

  const showToast = useCallback((msg) => {
    setMessage(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(''), 3000)
  }, [])

  return { message, showToast }
}
