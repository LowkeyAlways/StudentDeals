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
        <header className="top-bar" style={{alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <button className="menu-toggle" onClick={() => setDrawerOpen(true)}>
              ☰
            </button>
          </div>

          <div style={{textAlign: 'center', flex: 1}}>
            <div className="brand">
              <div className="brand-icon" />
              <Link to="/">
                <span>StudentDeals</span>
              </Link>
            </div>
            <form className="search-form" onSubmit={handleSearchSubmit} style={{maxWidth: 720, margin: '0.35rem auto'}}>
              <input
                type="search"
                placeholder="Rechercher des réductions, e.g. Spotify"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Barre de recherche"
              />
            </form>
          </div>

          <div className="top-actions" style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <button className="ghost-btn" onClick={() => setLoginOpen(true)}>
              Se connecter
            </button>
            <Link to="/connexion" className="ghost-btn" style={{padding: '0.45rem 0.9rem'}}>Poster</Link>
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

