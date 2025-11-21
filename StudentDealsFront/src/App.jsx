import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
