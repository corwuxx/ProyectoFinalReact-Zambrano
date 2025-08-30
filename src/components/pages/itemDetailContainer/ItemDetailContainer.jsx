import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ItemDetailContainer.css'
import { db } from '../../../firebaseConfig'
import { collection, doc, getDoc } from "firebase/firestore"
import ItemCount from '../../common/itemCount/ItemCount'

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    let productsCollection = collection(db, "products")
    let refDoc = doc(productsCollection, id)
    getDoc(refDoc).then((res) => setProduct({ id: res.id, ...res.data() }))
  }, [id])

  return (
    <div className="item-detail-container">
      <div className="product-detail">
        <img src={product.imageUrl} alt={product.title} className="detail-image" />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="stock">Stock disponible: {product.stock}</p>
          <ItemCount product={product} />
        </div>
      </div>
    </div>
  )
}