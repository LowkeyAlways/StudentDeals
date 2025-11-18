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

function Navbar() {
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
                <Link to="/">
                  <span>StudentDeals</span>
                </Link>
            </div>
          </div>

          <div className="top-actions">
            <Link to="/connexion" className="ghost-btn">
              Connexion ou inscription
            </Link>
          </div>
        </header>

      </div>
    </div>
  )
}

export default Navbar

