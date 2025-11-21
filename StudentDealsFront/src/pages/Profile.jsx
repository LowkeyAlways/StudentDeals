import React from 'react'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Profil</h2>
        <p>Vous n'êtes pas connecté.</p>
      </div>
    )
  }

  const initials = (user.nomUtilisateur ? user.nomUtilisateur.charAt(0) : 'U').toUpperCase()

  return (
    <div style={{ padding: 24 }}>
      <h2>Mon profil</h2>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12 }}>
        <div style={{ width: 96, height: 96 }}>
          <div className="user-avatar large" style={{ width: 96, height: 96, fontSize: 28 }}>{initials}</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{`${user.prenomUtilisateur || ''} ${user.nomUtilisateur || ''}`.trim()}</div>
          <div style={{ color: '#7a8599', marginTop: 6 }}>{user.adresseMail}</div>
          <div style={{ marginTop: 12 }}><strong>Branche:</strong> {user.branche}</div>
        </div>
      </div>
    </div>
  )
}

export default Profile
