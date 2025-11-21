import { useEffect, useState, useCallback } from 'react'
import DealCard from '../components/DealCard'

function Home() {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDeals = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://localhost:8080/api/deals/all')
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
  }, [])

  useEffect(() => {
    fetchDeals()
  }, [fetchDeals])

  useEffect(() => {
    const onPosted = () => fetchDeals()
    window.addEventListener('sd:posted', onPosted)
    return () => window.removeEventListener('sd:posted', onPosted)
  }, [fetchDeals])

  return (
    <div>
      <nav className="tab-nav">
        {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
          <button key={tab} className="tab-link">
            {tab}
          </button>
        ))}
      </nav>

      {loading && (
        <div style={{ padding: 24 }}>Chargement des deals…</div>
      )}

      {error && !loading && (
        <div style={{ padding: 24, color: '#e03131' }}>{error}</div>
      )}

      {!loading && !error && deals.length === 0 && (
        <div style={{ padding: 24 }}>Aucun deal n'a encore été posté.</div>
      )}

      {!loading && !error && deals.length > 0 && (
        <section className="deal-stack">
          {deals.map((deal) => (
            <DealCard
              key={deal.id_deals || deal.id || deal.url}
              title={deal.titre || 'Deal sans titre'}
              description={deal.description}
              url={deal.url || '#'}
              source={deal.categorie?.categorie_deals}
              imageUrl={deal.imageUrl}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default Home