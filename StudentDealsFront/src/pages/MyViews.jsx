import React from 'react'
import DealCard from '../components/DealCard'

function MyViews() {
  const viewed = (() => {
    try { return JSON.parse(localStorage.getItem('viewedDeals') || '[]') } catch { return [] }
  })()

  if (!viewed || viewed.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Mes deals visualisés</h2>
        <p>Vous n'avez pas encore visualisé de deal.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Mes deals visualisés</h2>
      <section className="deal-stack" style={{ marginTop: 12 }}>
        {viewed.map((p, idx) => (
          <DealCard key={(p.url||idx)+ (p.viewedAt||idx)} title={''} description={p.url} url={p.url} />
        ))}
      </section>
    </div>
  )
}

export default MyViews
