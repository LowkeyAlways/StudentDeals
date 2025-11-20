import { useSearchParams } from 'react-router-dom'

function Search() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  return (
    <div>
      <h1>Résultats de recherche</h1>
      <p>Recherche : <strong>{q}</strong></p>
      {/* TODO: remplacer ceci par un vrai composant de résultats/filtrage */}
    </div>
  )
}

export default Search
