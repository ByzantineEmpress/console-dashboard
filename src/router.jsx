import { useState, useEffect } from 'react'

// Simple custom hooks (no react-router needed — we use custom routing)
export const useLocation = () => {
  const [location, setLocation] = useState({ pathname: location.pathname })
  useEffect(() => {
    const handlePopState = () => setLocation({ pathname: location.pathname })
    const handlePathChange = (e) => {
      if (e.type === 'popstate') {
        const hash = e.url.hash || ''
        setLocation({ pathname: location.pathname, hash })
      }
    }
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePathChange)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePathChange)
    }
  }, [])
  return location
}

export const useRouter = () => {
  const navigate = (path) => {
    const hash = path.startsWith('#') ? '' : `#${path}`
    window.history.pushState({}, '', hash)
  }
  return navigate
}
