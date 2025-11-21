import React, { useState, useEffect } from 'react'

function PostDeal({ onClose, onPosted } = {}) {
  const [url, setUrl] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    // fetch categories, if none exist try init endpoint
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categories/all')
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setCategories(data || [])
            if (data && data.length > 0) setSelectedCategory(data[0].id_categorie)
            // if empty, try to init
            if (!data || data.length === 0) {
              const r2 = await fetch('http://localhost:8080/api/categories/init', { method: 'POST' })
              if (r2.ok) {
                const d2 = await r2.json()
                if (mounted) {
                  setCategories(d2 || [])
                  if (d2 && d2.length > 0) setSelectedCategory(d2[0].id_categorie)
                }
              }
            }
          }
        }
      } catch (err) {
        // ignore fetch errors, categories optional
        console.error('Failed to load categories', err)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  function validateUrl(v) {
    try {
      new URL(v)
      return true
    } catch (err) {
      return false
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!titre.trim()) { setError('Le titre est requis.'); return }
    if (!url.trim()) { setError('Le lien est requis.'); return }

    let candidate = url.trim()
    if (!validateUrl(candidate)) {
      if (validateUrl('https://' + candidate)) {
        candidate = 'https://' + candidate
      } else {
        setError('Lien invalide.');
        return
      }
    }

    const payload = { titre: titre.trim(), description: description.trim(), url: candidate }
    if (selectedCategory) {
      payload.categorie = { id_categorie: Number(selectedCategory) }
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/deals/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Erreur ${res.status}`)
      }

      const saved = await res.json()

      // store locally for quick display and dispatch event
      try {
        const list = JSON.parse(localStorage.getItem('postedDeals') || '[]')
        list.unshift({ url: saved.url || candidate, createdAt: Date.now(), id: saved.id_deals || saved.id })
        localStorage.setItem('postedDeals', JSON.stringify(list))
      } catch {}

      try { window.dispatchEvent(new CustomEvent('sd:posted', { detail: saved.url || candidate })) } catch {}

      onPosted && onPosted(saved.url || candidate)
      onClose && onClose()
    } catch (err) {
      console.error('Post deal failed', err)
      setError("Impossible d'envoyer le deal — vérifie le serveur ou ta connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="postdeal-modal">
      <div className="modal-scrim visible" onClick={onClose} />
      <div className="modal-wrapper" role="dialog" aria-modal="true">
        <div className="postdeal-card">
          <button className="close-modal" onClick={onClose} aria-label="Fermer">×</button>
          <h3>Poster un deal</h3>
          <p className="muted">Remplis les informations du deal pour le partager avec la communauté.</p>
          <form onSubmit={submit} className="post-form">
            <label>
              Titre
              <input type="text" placeholder="Titre du deal" value={titre} onChange={(e) => { setTitre(e.target.value); setError('') }} />
            </label>

            <label>
              Description
              <textarea placeholder="Une courte description (optionnel)" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label>
              Catégorie
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories && categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.id_categorie} value={c.id_categorie}>{c.categorie_deals || c.id_categorie}</option>
                  ))
                ) : (
                  <option value="">Aucune catégorie</option>
                )}
              </select>
            </label>

            <label>
              Lien
              <input type="url" placeholder="https://exemple.com/mon-deal" value={url} onChange={(e) => { setUrl(e.target.value); setError('') }} />
            </label>

            {error && <div className="form-error">{error}</div>}

            <div style={{display:'flex',gap:'0.6rem',marginTop:'0.6rem'}}>
              <button type="submit" className="primary-btn" disabled={loading}>{loading ? 'Envoi...' : 'Poster'}</button>
              <button type="button" className="ghost-btn" onClick={onClose}>Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostDeal
