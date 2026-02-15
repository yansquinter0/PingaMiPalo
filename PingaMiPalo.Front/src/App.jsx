import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import './App.css';

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToHash />
        <div className="app-container">
          <Navbar />
          <div style={{ paddingTop: '100px' }}>
            <Routes>
              <Route path="/" element={
                <>
                  <section className="hero container animate-fade-in" style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                      Elevate Your <span className="gradient-text">Pleasure</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
                      Experience the future of intimacy with our premium selection of toys and accessories. Designed for the modern era.
                    </p>
                    <button className="btn-primary" onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
                      Explore Collection
                    </button>
                  </section>
                  <ProductList />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
