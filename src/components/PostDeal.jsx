import React, { useState, useEffect } from 'react'

function PostDeal({ onClose, onPosted } = {}) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function validateUrl(v) {
    try {
      new URL(v)
      return true
    } catch (err) {
      return false
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (!url.trim()) { setError('Veuillez coller un lien.'); return }
    let candidate = url.trim()
    if (!validateUrl(candidate)) {
      // try adding https:// if user omitted protocol
      if (validateUrl('https://' + candidate)) {
        candidate = 'https://' + candidate
      } else {
        setError("Lien invalide.");
        return
      }
    }

    // For now store locally (demo). In real app, POST to API.
    try {
      const list = JSON.parse(localStorage.getItem('postedDeals') || '[]')
      list.unshift({ url: candidate, createdAt: Date.now() })
      localStorage.setItem('postedDeals', JSON.stringify(list))
    } catch {
      // ignore storage errors (quota/private mode)
    }

    try {
      window.dispatchEvent(new CustomEvent('sd:posted', { detail: candidate }))
    } catch {
      // ignore
    }

    onPosted && onPosted(candidate)
    onClose && onClose()
  }

  return (
    <div className="postdeal-modal">
      <div className="modal-scrim visible" onClick={onClose} />
      <div className="modal-wrapper" role="dialog" aria-modal="true">
        <div className="postdeal-card">
          <button className="close-modal" onClick={onClose} aria-label="Fermer">×</button>
          <h3>Poster un deal</h3>
          <p className="muted">Collez le lien du deal depuis une autre page.</p>
          <form onSubmit={submit} className="post-form">
            <input
              type="url"
              placeholder="https://exemple.com/mon-deal"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError('') }}
            />
            {error && <div className="form-error">{error}</div>}
            <div style={{display:'flex',gap:'0.6rem',marginTop:'0.6rem'}}>
              <button type="submit" className="primary-btn">Poster</button>
              <button type="button" className="ghost-btn" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostDeal
