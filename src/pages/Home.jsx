import DealCard from '../components/DealCard'

const sample = [
  {
    
  },
  {
    
  },
  {
    id: 3,
   
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
          <DealCard key={d.id} {...d} />
        ))}
      </section>
    </div>
  )
}

export default Home