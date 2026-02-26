import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PreviewOverlay from './components/PreviewOverlay'

function App() {
  return (
    <CartProvider>
      <Router>
        <PreviewOverlay />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/shop" element={<Collection />} />
          <Route path="/sneakers" element={<Collection />} />
          <Route path="/streetwear" element={<Collection />} />
          <Route path="/accessories" element={<Collection />} />
          <Route path="/new-arrivals" element={<Collection />} />
          <Route path="/sale" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
