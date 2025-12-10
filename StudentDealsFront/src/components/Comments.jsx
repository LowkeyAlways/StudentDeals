import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// Composant pour afficher un seul commentaire
function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.auteur || 'Utilisateur Anonyme'}</span>
        <span className="comment-date">{comment.date || 'Maintenant'}</span>
      </div>
      <p className="comment-text">{comment.texte}</p>
    </div>
  )
}

// Composant principal de gestion des commentaires
function Comments({ dealId, onClose }) {
  const { isAuth, user } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Logique de chargement des commentaires (simulée pour l'instant)
  useEffect(() => {
    // Simuler le chargement des commentaires pour le dealId
    setLoading(true)
    setTimeout(() => {
      setComments([
        { id: 1, auteur: 'Alice', texte: 'Super deal, merci !', date: 'Il y a 1h' },
        { id: 2, auteur: 'Bob', texte: 'J\'ai déjà commandé, ça marche !', date: 'Il y a 30min' },
      ])
      setLoading(false)
    }, 500)
  }, [dealId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // Simuler l'envoi du commentaire à l'API
    setLoading(true)
    setError('')

    const commentPayload = {
      dealId,
      auteur: user?.nomUtilisateur || 'Anonyme',
      texte: newComment.trim(),
    }

    try {
      // Remplacer par un appel API réel si l'API backend est disponible
      // const res = await fetch(`http://localhost:8080/api/deals/${dealId}/comments`, { ... })
      
      // Simulation de succès
      const newId = comments.length + 1
      const newCommentData = {
        id: newId,
        auteur: user?.nomUtilisateur || 'Moi',
        texte: newComment.trim(),
        date: 'À l\'instant',
      }

      setComments([newCommentData, ...comments])
      setNewComment('')
    } catch (err) {
      setError('Échec de l\'envoi du commentaire.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="comments-modal">
      <div className="modal-scrim visible" onClick={onClose} />
      <div className="modal-wrapper" role="dialog" aria-modal="true">
        <div className="comments-card">
          <button className="close-modal" onClick={onClose} aria-label="Fermer">×</button>
          <h3>Commentaires ({comments.length})</h3>

          {/* Formulaire d'ajout de commentaire */}
          {isAuth ? (
            <form onSubmit={handleSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                rows="3"
                disabled={loading}
              />
              <button type="submit" className="primary-btn" disabled={loading || !newComment.trim()}>
                {loading ? 'Envoi...' : 'Commenter'}
              </button>
              {error && <div className="form-error">{error}</div>}
            </form>
          ) : (
            <p className="login-prompt">Vous devez être connecté pour commenter.</p>
          )}

          {/* Liste des commentaires */}
          <div className="comments-list">
            {loading && <p>Chargement des commentaires...</p>}
            {!loading && comments.length === 0 && <p>Soyez le premier à commenter !</p>}
            {!loading && comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments