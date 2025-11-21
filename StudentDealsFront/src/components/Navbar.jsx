import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import PostDeal from './PostDeal'

const menuItems = [
  {
    label: 'Catégories',
    children: ['High-tech', 'Voyage', 'Meuble', 'Mode', 'Alimentation'],
  },
  { label: 'Codes promo' },
  { label: 'Gratuit' },
  { label: 'Bons plans' },
  { label: 'Discussions' },
  { label: 'Club' },
  { label: 'Nouveau look' },
]

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [postOpen, setPostOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(() => {
    try { return !!JSON.parse(localStorage.getItem('sd_user')) } catch (e) { return false }
  })
  const [pendingPost, setPendingPost] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem('sd_user') || 'null'); return s && s.user ? s.user : null } catch { return null }
  })
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = searchTerm.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }
  const [loginOpen, setLoginOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)

  return (
    <div className="layout">
      <aside className={`side-drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="close-drawer" onClick={() => setDrawerOpen(false)}>
          Fermer
        </button>
        <ul className="drawer-menu">
          {menuItems.map((item) => (
            <li key={item.label} className="drawer-item">
              {item.children ? (
                <>
                  <button
                    className="drawer-link"
                    aria-expanded={openSubmenu === item.label}
                    onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                  >
                    {item.label}
                  </button>

                  {openSubmenu === item.label && (
                    <ul className="submenu">
                      {item.children.map((child) => (
                        <li key={child}>
                          <button
                            className="drawer-sub-link"
                            onClick={() => {
                              const q = child.trim()
                              if (q) {
                                navigate(`/search?q=${encodeURIComponent(q)}`)
                              }
                              setDrawerOpen(false)
                              setOpenSubmenu(null)
                            }}
                          >
                            {child}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  className="drawer-link"
                  onClick={() => {
                    const q = item.label
                    navigate(`/search?q=${encodeURIComponent(q)}`)
                    setDrawerOpen(false)
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
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
            <div className="auth-block">
              {!isAuth ? (
                <>
                  <button className="ghost-btn" onClick={() => { setLoginOpen(true); /* open login mode */ }}>
                    Connexion
                  </button>

                  <button className="ghost-btn" onClick={() => { setLoginOpen(true); /* open register mode */ setTimeout(() => { const ev = new CustomEvent('open-register'); window.dispatchEvent(ev); }, 0); }}>
                    S'inscrire
                  </button>
                </>
              ) : (
                <div style={{ position: 'relative' }}>
                  <button
                    className="user-avatar-btn"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    aria-label="Mon compte"
                  >
                    <div className="user-avatar">{currentUser ? (currentUser.nomUtilisateur ? currentUser.nomUtilisateur.charAt(0).toUpperCase() : 'U') : 'U'}</div>
                  </button>

                  {userMenuOpen && (
                    <div className="user-menu">
                      <div className="user-menu-header">
                        <div className="user-avatar large">{currentUser ? (currentUser.nomUtilisateur ? currentUser.nomUtilisateur.charAt(0).toUpperCase() : 'U') : 'U'}</div>
                        <div style={{ marginLeft: 10 }}>
                          <div style={{ fontWeight: 700 }}>{currentUser ? `${currentUser.prenomUtilisateur || ''} ${currentUser.nomUtilisateur || ''}`.trim() : 'Utilisateur'}</div>
                          <div style={{ fontSize: 12, color: '#7a8599' }}>{currentUser ? currentUser.adresseMail : ''}</div>
                        </div>
                      </div>
                      <button className="user-menu-item" onClick={() => { navigate('/profile'); setUserMenuOpen(false) }}>Mon profil</button>
                      <button className="user-menu-item" onClick={() => { navigate('/my-posts'); setUserMenuOpen(false) }}>Mes deals postés</button>
                      <button className="user-menu-item" onClick={() => { navigate('/my-views'); setUserMenuOpen(false) }}>Mes deals visualisés</button>
                      <hr />
                      <button className="user-menu-item" onClick={() => { localStorage.removeItem('sd_user'); setIsAuth(false); setCurrentUser(null); setUserMenuOpen(false); navigate('/') }}>Me déconnecter</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="post-header-wrap">
              <button
                className="post-header-btn"
                onClick={() => {
                  if (isAuth) {
                    setPostOpen(true)
                  } else {
                    setPendingPost(true)
                    setLoginOpen(true)
                  }
                }}
              >
                Poster un deal
              </button>
            </div>
          </div>
        </header>

        {loginOpen && (
          <Login
            isModal={true}
            onClose={() => setLoginOpen(false)}
            onLogin={() => {
              setIsAuth(true)
              // if user clicked Poster while logged out, open PostDeal now
              if (pendingPost) {
                setPostOpen(true)
                setPendingPost(false)
              }
            }}
          />
        )}

        {postOpen && (
          <PostDeal onClose={() => setPostOpen(false)} onPosted={(url) => console.log('posted', url)} />
        )}

        {/* removed floating post button: header now contains the post action */}

      </div>
    </div>
  )
}

export default Navbar

