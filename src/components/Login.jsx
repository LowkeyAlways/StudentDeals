import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="login-page light">
      <div className="login-card light">
        <Link to="/" className="back-link text">
          Retour aux deals
        </Link>

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
    </div>
  )
}

export default Login

