import React from 'react'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-brand">
            <div className="brand-icon" />
            <div>
              <strong>StudentDeals</strong>
              <div className="muted">Les meilleurs bons plans pour étudiants</div>
            </div>
          </div>
        </div>

        <div className="footer-col footer-links">
          <strong>Liens</strong>
          <a href="#">Pour vous</a>
          <a href="#">Tendance</a>
          <a href="#">Codes promo</a>
        </div>

        <div className="footer-col footer-links">
          <strong>Aide</strong>
          <a href="#">Contact</a>
          <a href="#">Règles</a>
          <a href="#">Signaler un contenu</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} StudentDeals — Fait avec ❤️ pour les étudiants
      </div>
    </footer>
  )
}

export default Footer
