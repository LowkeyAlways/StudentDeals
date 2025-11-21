import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import MyPosts from './pages/MyPosts'
import MyViews from './pages/MyViews'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/my-views" element={<MyViews />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
