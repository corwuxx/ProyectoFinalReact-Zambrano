import { Link } from 'react-router-dom'
import { CartWidget } from '../../common/cartWidget/CartWidget'
import './navbar.css'

export const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        🎮 GameTech
      </Link>
      
      <nav className="nav-links">
        <Link to="/category/teclados">Teclados</Link>
        <Link to="/category/mouses">Mouses</Link>
        <Link to="/category/audio">Audio</Link>
        <Link to="/category/monitores">Monitores</Link>
        <Link to="/category/accesorios">Accesorios</Link>
      </nav>

      <CartWidget />
    </header>
  )
}