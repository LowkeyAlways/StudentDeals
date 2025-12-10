import { useEffect, useState, useCallback } from 'react'
import { sampleDeals } from '../data/sampleDeals.js'
import DealCard from '../components/DealCard'

function Home() {
  const [deals, setDeals] = useState(sampleDeals) // Utilisation des données initiales du fichier séparé
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
      setDeals(Array.isArray(data) ? data : sampleDeals) // En cas d'échec de l'API, utiliser les données initiales
    } catch (err) {
      console.error('Failed to load deals', err)
      setError('Impossible de récupérer les deals depuis le serveur.')
      setDeals(sampleDeals) // En cas d'erreur, utiliser les données initiales
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
              key={deal.id_deals || deal.id} // Utilisation de l'ID unique, `deal.url` n'est pas une clé stable
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
