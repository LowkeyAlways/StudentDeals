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

        <nav className="tab-nav">
          {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
            <button key={tab} className="tab-link">
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Home

