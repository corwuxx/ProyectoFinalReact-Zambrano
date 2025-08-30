import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../../common/productCard/ProductCard'
import './ItemListContainer.css'
import { db } from '../../../firebaseConfig'
import { collection, getDocs, query, where } from "firebase/firestore";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { category } = useParams()

  useEffect(() => {
    setLoading(true)
    
    let productosCollection = collection(db, "products");
    let consulta = productosCollection;
    
    if (category) {
      let filtrado = query(productosCollection, where("category", "==", category));
      consulta = filtrado;
    }
    

    let getProducts = getDocs(consulta);
    
    getProducts
      .then((res) => {
        let arrayBien = res.docs.map((elemento) => {
          return { id: elemento.id, ...elemento.data() };
        });
        setProducts(arrayBien);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [category])

  if (loading) {
    return <div className="loading">Cargando productos...</div>
  }

  return (
    <div className="item-list-container">
      <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Todos los productos'}</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && <p>No hay productos en esta categoría</p>}
    </div>
  )
}