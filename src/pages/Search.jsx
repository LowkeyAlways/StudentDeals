import { useSearchParams } from 'react-router-dom'

function Search() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  return (
    <div>
      <h1>Résultats de recherche</h1>
      <p>Recherche : <strong>{q}</strong></p>
      {}
    </div>
  )
}

export default Search
