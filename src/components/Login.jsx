import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function Login({ isModal = false, onClose } = {}) {
  useEffect(() => {
    if (!isModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isModal, onClose])

  const content = (
    <div className={`login-card light ${isModal ? 'compact' : ''}`}>
      {isModal ? (
        <button className="close-modal" onClick={onClose} aria-label="Fermer">
          ×
        </button>
      ) : (
        <Link to="/" className="back-link text">
          Retour aux deals
        </Link>
      )}

      <div className="login-brand">
        <div className="brand-icon" />
        <span>StudentDeals</span>
      </div>

      <h1>Connexion ou inscription</h1>
      <p className="subtitle">Rejoignez la communauté !</p>

      <form className="login-form">
        <label>
          Nom d’utilisateur ou adresse e-mail
          <input type="text" placeholder="email@exemple.fr" />
        </label>

        <label>
          Mot de passe
          <input type="password" placeholder="Votre mot de passe" />
        </label>

        <button type="submit" className="primary-btn wide">
          Continuer
        </button>
      </form>

      <div className="divider">
        <span>ou continuer avec</span>
      </div>

      <div className="social-grid">
        <button className="social-btn">Google</button>
        <button className="social-btn">Apple</button>
        <button className="social-btn">Facebook</button>
      </div>
    </div>
  )

  if (!isModal) {
    return <div className="login-page light">{content}</div>
  }

  return (
    <div className="login-modal">
      <div className="modal-scrim visible" onClick={onClose} />
      <div className="modal-wrapper" role="dialog" aria-modal="true">
        {content}
      </div>
    </div>
  )
}

export default Login

