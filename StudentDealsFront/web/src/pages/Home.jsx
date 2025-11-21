import { useState } from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
  'Catégories',
  'Codes promo',
  'Gratuit',
  'Bons plans',
  'Discussions',
  'Club',
  'Nouveau look',
]

const placeholderCards = Array.from({ length: 3 })

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="layout">
      <aside className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="close-drawer" onClick={() => setDrawerOpen(false)}>
          Fermer
        </button>
        <ul>
          {menuItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>

      <div
        className={`scrim ${drawerOpen ? 'visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      <div className="app-shell">
        <header className="top-bar">
          <div className="left-block">
            <button className="menu-toggle" onClick={() => setDrawerOpen(true)}>
              Menu
            </button>
            <div className="brand">
              <div className="brand-icon" />
              <span>StudentDeals</span>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Rechercher un deal..." />
            </div>
          </div>

          <div className="top-actions">
            <Link to="/connexion" className="ghost-btn">
              Connexion ou inscription
            </Link>
          </div>
        </header>

        <section className="hero-banner">
          <div className="hero-block" />
        </section>

        <nav className="tab-nav">
          {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
            <button key={tab} className="tab-link">
              {tab}
            </button>
          ))}
        </nav>

        <main className="content-grid">
          <section className="deals-feed">
            <div className="placeholder-title" />
            <div className="deal-stack">
              {placeholderCards.map((_, index) => (
                <article key={index} className="deal-card empty">
                  <div className="deal-image placeholder" />
                  <div className="deal-content">
                    <div className="placeholder-line w40" />
                    <div className="placeholder-line w75" />
                    <div className="placeholder-line w55" />
                    <div className="placeholder-tags">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="placeholder-actions">
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="hot-panel">
            <div className="placeholder-title small" />
            <div className="hot-list">
              {placeholderCards.map((_, index) => (
                <article key={index} className="hot-card empty">
                  <div className="hot-thumb placeholder" />
                  <div className="hot-info">
                    <div className="placeholder-line w60" />
                    <div className="placeholder-line w30" />
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Home

