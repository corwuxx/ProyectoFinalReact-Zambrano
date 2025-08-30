import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext'
import './Cart.css'

export const Cart = () => {
  const { cart, removeById, resetCart, getTotalAmount } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos para comenzar</p>
        <Link to="/" className="continue-shopping">
          Seguir comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => removeById(item.id)}
              className="remove-btn"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ${getTotalAmount().toFixed(2)}</h3>
        <div className="cart-actions">
          <button onClick={resetCart} className="clear-btn">
            Vaciar carrito
          </button>
          <Link to="/checkout" className="checkout-btn">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  )
}