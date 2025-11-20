import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'

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
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = searchTerm.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }
  const [loginOpen, setLoginOpen] = useState(false)

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

            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Barre de recherche"
              />
              <button type="submit" className="icon-btn" aria-label="Rechercher">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          <div className="top-actions">
            <button className="ghost-btn" onClick={() => setLoginOpen(true)}>
              Connexion ou inscription
            </button>
          </div>
        </header>

        {loginOpen && (
          <Login isModal={true} onClose={() => setLoginOpen(false)} />
        )}

      </div>
    </div>
  )
}

export default Navbar

