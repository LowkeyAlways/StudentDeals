import { useCallback, useEffect, useState } from 'react'

export function useDeals(apiUrl = 'http://localhost:8080/api/deals/all') {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(apiUrl)
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Erreur ${res.status}`)
      }

      const data = await res.json()
      setDeals(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load deals', err)
      setError('Impossible de récupérer les deals depuis le serveur.')
      setDeals([])
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])

  useEffect(() => {
    const onPosted = () => fetchDeals()
    window.addEventListener('sd:posted', onPosted)
    return () => window.removeEventListener('sd:posted', onPosted)
  }, [fetchDeals])

  return { deals, loading, error, reload: fetchDeals }
}
