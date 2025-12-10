import DealCard from '../components/DealCard'

const sample = [
  {
    id: 1,
    title: 'Réduction étudiant',
    price: 9.99,
  },
  {
    id: 2,
    title: 'Offre week-end',
    price: 14.5,
  },
  {
    id: 3,
    title: 'Carte resto',
    price: 5,
  },
]

function Home() {
  return (
    <div>
      <nav className="tab-nav">
        {['Pour vous', 'Les + hot', 'Tendance', 'Tous'].map((tab) => (
          <button key={tab} className="tab-link">
            {tab}
          </button>
        ))}
      </nav>

      <section className="deal-stack">
        {sample.map((d) => (
          <DealCard key={d.id} id={d.id} title={d.title} price={d.price} />
        ))}
      </section>
    </div>
  )
}

export default Home