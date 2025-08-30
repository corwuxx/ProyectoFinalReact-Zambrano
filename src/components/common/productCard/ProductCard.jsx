import { Link } from 'react-router-dom'
import './productCard.css'

export const ProductCard = ({ product }) => {
  const { id, title, price, imageUrl } = product

  return (
    <div className="product-card">
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-info">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <Link to={`/item/${id}`} className="detail-btn">
          Ver detalles
        </Link>
      </div>
    </div>
  )
}