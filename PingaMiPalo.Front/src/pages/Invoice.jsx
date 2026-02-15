import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Invoice = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Guest';
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
                    No Items to Invoice
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Your cart is empty. Add some products first!
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

    const subtotal = getCartTotal();
    const tax = 0; // 0% tax for now
    const total = subtotal + tax;

    const handleConfirmOrder = () => {
        alert('¡Orden confirmada! Gracias por tu compra.');
        clearCart();
        navigate('/');
    };

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
            <div className="glass-panel" style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '3rem'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1.5rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        PINGAMIPALO
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pre-Factura / Invoice</p>
                </div>

                {/* Customer & Date Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Cliente:</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{username}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Fecha:</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currentDate}</p>
                    </div>
                </div>

                {/* Items Table */}
                <div style={{ marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)' }}>Producto</th>
                                <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Cantidad</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>Precio Unit.</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                                background: '#222'
                                            }}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div style={{ borderTop: '2px solid var(--glass-border)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                        <div style={{ width: '300px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>IVA (0%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '1rem',
                                borderTop: '1px solid var(--glass-border)',
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}>
                                <span>Total:</span>
                                <span style={{ color: 'var(--accent-primary)' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/cart')}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: 'white',
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        ← Volver al Carrito
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleConfirmOrder}
                        style={{ padding: '1rem 2rem', fontSize: '1rem' }}
                    >
                        Confirmar Orden
                    </button>
                    <button
                        onClick={() => window.print()}
                        style={{
                            background: 'rgba(0, 243, 255, 0.1)',
                            border: '1px solid var(--accent-primary)',
                            borderRadius: '8px',
                            color: 'var(--accent-primary)',
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        🖨️ Imprimir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
