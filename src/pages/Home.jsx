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
      <h1>Home</h1>
    </div>
  )
}

export default Home