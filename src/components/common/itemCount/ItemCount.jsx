import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import './itemCount.css';

const ItemCount = ({ product }) => {
  const { addToCart, getAvailableStock } = useContext(CartContext);
  const [contador, setContador] = useState(1);
  
  // Obtener stock disponible considerando lo que ya está en el carrito
  const availableStock = getAvailableStock(product.id) || product.stock;

  const sumar = () => {
    if (contador < availableStock) {
      setContador(contador + 1);
    } else {
      alert("Stock máximo disponible alcanzado");
    }
  };

  const restar = () => {
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (contador <= availableStock) {
      let productoConCantidad = { 
        ...product, 
        cantidad: contador 
      };
      addToCart(productoConCantidad);
    } else {
      alert(`❌ No puedes agregar ${contador} unidades. Solo hay ${availableStock} disponibles.`);
    }
  };

  return (
    <div className="item-count">
      <div className="counter-container">
        <h4>Selecciona la cantidad:</h4>
        <div className="counter">
          <button 
            onClick={restar} 
            disabled={contador === 1}
            className="counter-btn minus"
          >
            −
          </button>
          
          <span className="quantity">{contador}</span>
          
          <button 
            onClick={sumar} 
            disabled={contador === availableStock}
            className="counter-btn plus"
          >
            +
          </button>
        </div>
        
        <div className="stock-info">
          {availableStock > 0 ? (
            <span className="available">✓ {availableStock} disponibles</span>
          ) : (
            <span className="out-of-stock">✗ Sin stock</span>
          )}
        </div>
        
        <button 
          onClick={agregarAlCarrito}
          disabled={availableStock === 0}
          className="add-to-cart-btn"
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;