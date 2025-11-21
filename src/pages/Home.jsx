import DealCard from '../components/DealCard'
import { useEffect, useState, useRef } from 'react'

const sample = [
  {
    id: 1,
    title: 'Abonnement Spotify Premium - 50% étudiants',
    price: '5,99€',
    oldPrice: '11,99€',
    discount: '-50%',
    source: 'Spotify',
    description: 'Profitez de Spotify Premium à moitié prix avec votre statut étudiant.',
    votes: 234,
  },
  {
    id: 2,
    title: 'MacBook Pro M3 - Offre étudiante',
    price: '1699€',
    oldPrice: '2499€',
    discount: '-32%',
    source: 'Apple',
    description: 'Remise sur la nouvelle génération M3.',
    votes: 98,
  },
  {
    id: 3,
    title: 'PlayStation 5 - Pack spécial',
    price: '549€',
    oldPrice: '799€',
    discount: '-31%',
    source: 'Fnac',
    description: 'Pack PS5 avec réduction limitée.',
    votes: 412,
  },
]

function Home() {
  const slides = [1,2,3]
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!trackRef.current) return
    const width = trackRef.current.clientWidth
    trackRef.current.style.transform = `translateX(-${index * width}px)`
  }, [index])

  return (
    <div>
      <section className="hero-banner">
        <div className="hero-slider">
          <div className="hero-track" ref={trackRef} style={{width: `${slides.length * 100}%`}}>
            {slides.map((s) => (
              <div className="hero-slide" key={s}>
                <div className="hero-inner-cards">
                  {[0,1,2,3].map((c) => (
                    <div key={c} style={{minWidth: 260, height: 120, borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', padding: 12, boxShadow: '0 10px 30px rgba(2,6,23,0.45)'}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="hero-arrow left" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}>‹</button>
          <button className="hero-arrow right" onClick={() => setIndex((i) => (i + 1) % slides.length)}>›</button>
        </div>
      </section>

      <nav className="tab-nav">
        {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
          <button key={tab} className="tab-link">
            {tab}
          </button>
        ))}
      </nav>

      <div className="content-grid">
        <main className="deals-feed">
          {/* featured */}
          <div style={{marginBottom: 16}}>
            <DealCard {...sample[0]} featured={true} />
          </div>

          <section className="deal-stack">
            {sample.slice(1).map((d) => (
              <DealCard key={d.id} {...d} />
            ))}
          </section>
        </main>

        <aside className="hot-panel">
          <h3 style={{color: '#c77dff', marginTop: 0}}>Bons d'achat en vedette</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={{padding: 12, borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))'}}>
              <strong>Amazon</strong>
              <div style={{fontSize: 13, opacity: 0.8}}>Jusqu'à -70%</div>
            </div>
            <div style={{padding: 12, borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))'}}>
              <strong>Shein</strong>
              <div style={{fontSize: 13, opacity: 0.8}}>-20% sur tout</div>
            </div>
            <div style={{padding: 12, borderRadius: 10, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))'}}>
              <strong>Cdiscount</strong>
              <div style={{fontSize: 13, opacity: 0.8}}>Promos flash</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Home