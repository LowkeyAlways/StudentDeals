import React from 'react'
import { useAuth } from '../context/AuthContext'

function MyPosts() {
  const { isAuth } = useAuth()

  return (
    <div style={{ padding: 24 }}>
      <h2>Mes deals postés</h2>
      {!isAuth && (
        <p>Connecte-toi pour poster des deals et les retrouver ici.</p>
      )}
      {isAuth && (
        <p>Cette section sera synchronisée avec la base de données lorsque l'API permettra de filtrer les deals par utilisateur.</p>
      )}
    </div>
  )
}

export default MyPosts
