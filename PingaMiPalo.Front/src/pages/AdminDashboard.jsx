import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'ADMIN') {
            navigate('/');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const [productsRes, usersRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/products`),
                fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (productsRes.ok) setProducts(await productsRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
                alert('Producto eliminado exitosamente');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error al eliminar producto');
        }
    };

    const handleUpdateProduct = async (product) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    stock: product.stock,
                    categoryId: product.categoryId
                })
            });

            if (response.ok) {
                setEditingProduct(null);
                fetchData();
                alert('Producto actualizado exitosamente');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error al actualizar producto');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setUsers(users.filter(u => u.id !== id));
                alert('Usuario eliminado exitosamente');
            } else {
                const data = await response.json();
                alert(data.message || 'Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error al eliminar usuario');
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.5rem' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                👑 Admin Dashboard
            </h1>

            {/* Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('products')}
                    style={{
                        padding: '1rem 2rem',
                        background: activeTab === 'products' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${activeTab === 'products' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    📦 Products
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '1rem 2rem',
                        background: activeTab === 'users' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${activeTab === 'users' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    👥 Users
                </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Product Management</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)' }}>Image</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)' }}>Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)' }}>Price</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>Stock</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        {editingProduct?.id === product.id ? (
                                            <>
                                                <td style={{ padding: '1rem' }}>
                                                    <input
                                                        type="text"
                                                        value={editingProduct.imageUrl}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                                                        style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'white' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <input
                                                        type="text"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                        style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'white' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.price}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                        style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'white' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.stock}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                                                        style={{ width: '80px', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'white', textAlign: 'center' }}
                                                    />
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button onClick={() => handleUpdateProduct(editingProduct)} style={{ padding: '0.5rem 1rem', background: 'rgba(0, 255, 0, 0.2)', border: '1px solid rgba(0, 255, 0, 0.5)', borderRadius: '4px', color: '#00ff00', cursor: 'pointer', marginRight: '0.5rem' }}>
                                                        ✓ Save
                                                    </button>
                                                    <button onClick={() => setEditingProduct(null)} style={{ padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#222' }}>
                                                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>{product.name}</td>
                                                <td style={{ padding: '1rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>${product.price}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>{product.stock}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button onClick={() => setEditingProduct(product)} style={{ padding: '0.5rem 1rem', background: 'rgba(0, 243, 255, 0.2)', border: '1px solid var(--accent-primary)', borderRadius: '4px', color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '0.5rem' }}>
                                                        ✏️ Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.5)', borderRadius: '4px', color: '#ff4444', cursor: 'pointer' }}>
                                                        🗑️ Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>User Management</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)' }}>User</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-primary)' }}>Email</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>Role</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>Joined</th>
                                    <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-primary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ background: 'rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)' }}>
                                                    <img src={user.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                {user.username}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                background: user.role === 'ADMIN' ? 'rgba(255, 0, 153, 0.2)' : 'rgba(0, 243, 255, 0.2)',
                                                border: `1px solid ${user.role === 'ADMIN' ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
                                                color: user.role === 'ADMIN' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            {new Date(user.createdAt).toLocaleDateString('es-ES')}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            {user.role !== 'ADMIN' ? (
                                                <button onClick={() => handleDeleteUser(user.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.5)', borderRadius: '4px', color: '#ff4444', cursor: 'pointer' }}>
                                                    🗑️ Delete
                                                </button>
                                            ) : (
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Protected</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
