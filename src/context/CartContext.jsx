import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    const existingItemIndex = cart.findIndex(item => item.id === producto.id);
    
    if (existingItemIndex >= 0) {
      // Si el producto ya existe en el carrito
      const newCart = [...cart];
      const newQuantity = newCart[existingItemIndex].cantidad + producto.cantidad;
      
      // Verificar que no exceda el stock
      if (newQuantity <= newCart[existingItemIndex].stock) {
        newCart[existingItemIndex].cantidad = newQuantity;
        setCart(newCart);
        alert("✅ Cantidad actualizada en el carrito");
      } else {
        alert(`❌ No hay suficiente stock. Máximo disponible: ${newCart[existingItemIndex].stock}`);
      }
    } else {
      // Si el producto no existe en el carrito
      if (producto.cantidad <= producto.stock) {
        setCart([...cart, producto]);
        alert("✅ Producto agregado al carrito");
      } else {
        alert(`❌ No hay suficiente stock. Máximo disponible: ${producto.stock}`);
      }
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  const removeById = (id) => {
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    setCart(arrayFiltrado);
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.price * elemento.cantidad;
    }, 0);
    return total;
  };

  const getTotalQuanty = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.cantidad;
    }, 0);
    return total;
  };

  // Función para verificar stock disponible de un producto
  const getAvailableStock = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      return cartItem.stock - cartItem.cantidad;
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeById,
        resetCart,
        getTotalAmount,
        getTotalQuanty,
        getAvailableStock
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;