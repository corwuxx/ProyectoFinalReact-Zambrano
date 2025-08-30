import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { CartContext } from "../../../context/CartContext";
import './cartWidget.css'; 

export const CartWidget = () => {
  const { getTotalQuanty } = useContext(CartContext);
  let total = getTotalQuanty();
  
  return (
    <Link to="/cart" className="cart-widget">
      <div className="cart-container">
        <div className="cart-icon-container">
          <FaShoppingCart size={20} />
          {total > 0 && (
            <span className="cart-badge">
              {total}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};