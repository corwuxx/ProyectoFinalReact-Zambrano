import { useContext, useState } from "react"
import { CartContext } from "../../../context/CartContext"
import { Link } from 'react-router-dom'
import { db } from "../../../firebaseConfig"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import './Checkout.css'

export const Checkout = () => {
  const [user, setUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
  })

  const { cart, getTotalAmount, resetCart } = useContext(CartContext)
  const [orderId, setOrderId] = useState(null)

  const handleSubmit = (evento) => {
    evento.preventDefault()
    
    let total = getTotalAmount()
    let objetoCompra = {
      buyer: user,
      items: cart,
      total: total,
    }

    let ordersCollection = collection(db, "orders")
    addDoc(ordersCollection, objetoCompra)
      .then((res) => {
        setOrderId(res.id)
        resetCart()
        
        // Actualizar el stock de todos los productos comprados
        let productosCollection = collection(db, "products")
        objetoCompra.items.forEach((elemento) => {
          let productRef = doc(productosCollection, elemento.id)
          updateDoc(productRef, { stock: elemento.stock - elemento.cantidad })
        })
      })
      .catch((error) => {
        alert("Ocurrió un error al procesar la compra")
        console.log(error)
      })
  }

  const handleChange = (evento) => {
    setUser({ ...user, [evento.target.name]: evento.target.value })
  }

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>¡Compra exitosa!</h2>
        <p>Tu número de orden es: {orderId}</p>
        <Link to="/" className="continue-shopping">
          Volver a la tienda
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>No hay productos en el carrito</h2>
        <Link to="/" className="continue-shopping">
          Volver a la tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Resumen de compra</h3>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.title}</span>
              <span>${item.price} x {item.cantidad}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total: ${getTotalAmount().toFixed(2)}</strong>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Confirmar compra
        </button>
      </form>
    </div>
  )
}