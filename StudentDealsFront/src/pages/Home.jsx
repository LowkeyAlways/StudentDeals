import { useState, useEffect } from 'react'
import DealCard from '../components/DealCard'

const sample = [ {}, {}, { id: 3 } ]

function Home() {
  const [posted, setPosted] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem('postedDeals') || '[]')
      return Array.isArray(list) ? list : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const onPosted = (e) => {
      try {
        setPosted((prev) => [ { url: e.detail, createdAt: Date.now() }, ...prev ])
      } catch {
        // ignore
      }
    }
    window.addEventListener('sd:posted', onPosted)
    return () => window.removeEventListener('sd:posted', onPosted)
  }, [])

  const items = posted && posted.length ? posted : sample

  return (
    <div>
      <nav className="tab-nav">
        {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
          <button key={tab} className="tab-link">
            {tab}
          </button>
        ))}
      </nav>

      <section className="deal-stack">
        {items.map((d, idx) => {
          // if posted deals are stored as objects with url and createdAt
          if (d && d.url) {
            return (
              <DealCard
                key={d.url + d.createdAt}
                title={''}
                description={d.url}
                url={d.url}
              />
            )
          }

          return <DealCard key={d.id || idx} {...d} />
        })}
      </section>
    </div>
  )
}

export default Home