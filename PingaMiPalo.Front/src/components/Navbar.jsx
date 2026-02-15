import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const userAvatar = localStorage.getItem('imageUrl');
  const userRole = localStorage.getItem('role');
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      padding: '1rem 2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 className="gradient-text" style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>
        PINGAMIPALO
      </h1>
      <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <li><Link to="/" className="nav-link">HOME</Link></li>
        <li><Link to="/#shop" className="nav-link">SHOP</Link></li>
        <li><Link to="/#about" className="nav-link">ABOUT</Link></li>
        {userRole === 'ADMIN' && (
          <li><Link to="/admin" className="nav-link" style={{ color: 'var(--accent-secondary)' }}>⚙️ ADMIN</Link></li>
        )}
        <li>
          <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
            <span className="nav-link" style={{ fontSize: '1.5rem' }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                background: 'var(--accent-secondary)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                border: '2px solid #000'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--accent-primary)'
              }}>
                <img
                  src={userAvatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                  alt="U"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span className="nav-link" style={{ fontSize: '0.8rem' }}>PROFILE</span>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                LOGIN
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
