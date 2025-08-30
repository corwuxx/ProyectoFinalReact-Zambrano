import { Link } from 'react'
import './NotFound.css'

export const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Página no encontrada</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  )
}