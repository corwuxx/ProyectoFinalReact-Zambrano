import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartContextProvider from './context/CartContext'
import { Navbar } from './components/layout/navbar/Navbar'
import { Footer } from './components/layout/footer/Footer'
import { ItemListContainer } from './components/pages/itemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/pages/itemDetailContainer/ItemDetailContainer'
import { Cart } from './components/pages/cart/Cart'
import { Checkout } from './components/pages/checkout/Checkout'
import { NotFound } from './components/pages/notFound/NotFound'
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default App