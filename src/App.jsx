import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/sneakers" element={<Collection />} />
        <Route path="/streetwear" element={<Collection />} />
        <Route path="/accessories" element={<Collection />} />
        <Route path="/new-arrivals" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
