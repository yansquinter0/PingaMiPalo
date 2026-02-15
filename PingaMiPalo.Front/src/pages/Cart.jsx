import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    Your Cart is Empty
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Add some products to get started!
                </p>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/#shop')}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                Shopping Cart
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cartItems.map(item => (
                        <div key={item.id} className="glass-panel" style={{
                            padding: '1.5rem',
                            display: 'grid',
                            gridTemplateColumns: '120px 1fr auto',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}>
                            {/* Product Image */}
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                background: '#222'
                            }}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Product Info */}
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    {item.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                        ${item.price.toFixed(2)}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '4px',
                                                color: 'white',
                                                width: '30px',
                                                height: '30px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            -
                                        </button>
                                        <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '4px',
                                                color: 'white',
                                                width: '30px',
                                                height: '30px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Remove Button */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        background: 'rgba(255, 0, 0, 0.2)',
                                        border: '1px solid rgba(255, 0, 0, 0.5)',
                                        borderRadius: '4px',
                                        color: '#ff4444',
                                        padding: '0.5rem 1rem',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="glass-panel" style={{
                    padding: '2rem',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '120px'
                }}>
                    <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        Order Summary
                    </h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Tax (0%):</span>
                            <span>$0.00</span>
                        </div>
                        <div style={{
                            borderTop: '1px solid var(--glass-border)',
                            marginTop: '1rem',
                            paddingTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.3rem',
                            fontWeight: 'bold'
                        }}>
                            <span>Total:</span>
                            <span style={{ color: 'var(--accent-primary)' }}>${getCartTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className="btn-primary"
                        style={{ width: '100%', marginBottom: '1rem' }}
                        onClick={() => navigate('/invoice')}
                    >
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={clearCart}
                        style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: 'var(--text-secondary)',
                            padding: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
