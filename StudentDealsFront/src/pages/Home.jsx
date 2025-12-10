import DealCard from '../components/DealCard'
import { useDeals } from '../hooks/useDeals'

function Home() {
  const { deals, loading, error } = useDeals()

  const tabs = ['Pour vous', 'Les + hot', 'Tendance', 'Tous']

  return (
    <div>
      <nav className="tab-nav">
        {tabs.map((tab) => (
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
        <div style={{ padding: 24 }}>Aucun deal n&apos;a encore été posté.</div>
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
              votes={deal.votes || 0}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default Home
