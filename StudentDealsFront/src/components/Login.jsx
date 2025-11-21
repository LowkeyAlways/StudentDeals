import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Login({ isModal = false, onClose, onLogin, startRegister = false } = {}) {
  useEffect(() => {
    if (!isModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose && onClose()
    }
    document.addEventListener('keydown', onKey)

    // allow external trigger to open modal in register mode
    const onOpenRegister = () => {
      try { setIsRegister(true) } catch (e) {}
    }
    window.addEventListener('open-register', onOpenRegister)

    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('open-register', onOpenRegister)
    }
  }, [isModal, onClose])

  const [isRegister, setIsRegister] = useState(!!startRegister)
  const [nomUtilisateur, setNomUtilisateur] = useState('')
  const [prenomUtilisateur, setPrenomUtilisateur] = useState('')
  const [adresseMail, setAdresseMail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [branche, setBranche] = useState('Ressource_humaine')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

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

      <h1>{isRegister ? "S'inscrire" : 'Connexion'}</h1>
      <p className="subtitle">Rejoignez la communauté !</p>
      {/* Modal without internal toggle: mode controlled by prop or external buttons */}

      <form
        className="login-form"
        onSubmit={async (e) => {
          e.preventDefault()
          setErrorMsg('')
          if (isRegister) {
            setLoading(true)
            const user = {
              nomUtilisateur,
              prenomUtilisateur,
              adresseMail,
              motDePasse,
              branche,
            }

            try {
              const res = await fetch('http://localhost:8080/api/utilisateur/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
              })

              if (!res.ok) {
                const text = await res.text()
                throw new Error(text || `Erreur ${res.status}`)
              }

              const saved = await res.json()
              try {
                localStorage.setItem('sd_user', JSON.stringify({ logged: true, user: saved }))
              } catch (err) {}
              onLogin && onLogin(true)
              onClose && onClose()
            } catch (err) {
              console.error('Inscription failed', err)
              setErrorMsg('Échec de l\'inscription — vérifie les informations ou le serveur.')
            } finally {
              setLoading(false)
            }

            return
          }

          // Mode connexion : pour l'instant on garde le comportement local (pas d'endpoint d'authent)
          // Si tu as un endpoint d'authent, dis-moi lequel (ex: POST /api/utilisateur/login)
          try {
            localStorage.setItem('sd_user', JSON.stringify({ logged: true }))
          } catch (err) {}
          onLogin && onLogin(true)
          onClose && onClose()
        }}
      >
        {isRegister ? (
          // Formulaire d'inscription — mêmes champs que l'entité Utilisateur
          <>
            <label>
              Nom
              <input value={nomUtilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} type="text" placeholder="Nom" />
            </label>

            <label>
              Prénom
              <input value={prenomUtilisateur} onChange={(e) => setPrenomUtilisateur(e.target.value)} type="text" placeholder="Prénom" />
            </label>

            <label>
              Adresse e-mail
              <input value={adresseMail} onChange={(e) => setAdresseMail(e.target.value)} type="email" placeholder="email@exemple.fr" />
            </label>

            <label>
              Mot de passe
              <input value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} type="password" placeholder="Votre mot de passe" />
            </label>

            <label>
              Branche
              <select value={branche} onChange={(e) => setBranche(e.target.value)}>
                <option value="Ressource_humaine">Ressource_humaine</option>
                <option value="Informatique_dev">Informatique_dev</option>
                <option value="Informatique_infra">Informatique_infra</option>
                <option value="Marketing">Marketing</option>
                <option value="Communication">Communication</option>
              </select>
            </label>

            <button type="submit" className="primary-btn wide" disabled={loading}>
              {loading ? 'Patiente...' : "S'inscrire"}
            </button>
            {errorMsg && <div className="form-error">{errorMsg}</div>}
          </>
        ) : (
          // Formulaire de connexion simplifié (comme avant)
          <>
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
          </>
        )}
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

