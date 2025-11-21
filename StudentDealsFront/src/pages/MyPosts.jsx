import React from 'react'
import DealCard from '../components/DealCard'

function MyPosts() {
  const posted = (() => {
    try { return JSON.parse(localStorage.getItem('postedDeals') || '[]') } catch { return [] }
  })()

  if (!posted || posted.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Mes deals postés</h2>
        <p>Vous n'avez pas encore posté de deal.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Mes deals postés</h2>
      <section className="deal-stack" style={{ marginTop: 12 }}>
        {posted.map((p, idx) => (
          <DealCard key={(p.url||idx)+ (p.createdAt||idx)} title={''} description={p.url} url={p.url} />
        ))}
      </section>
    </div>
  )
}

export default MyPosts
