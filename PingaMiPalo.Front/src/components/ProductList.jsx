import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addedProduct, setAddedProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products
                const productsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                if (!productsResponse.ok) throw new Error('Failed to fetch products');
                const productsData = await productsResponse.json();
                setProducts(productsData);

                // Fetch categories
                const categoriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
                if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedProduct(product.id);
        setTimeout(() => setAddedProduct(null), 1000);
    };

    const filteredProducts = selectedCategory
        ? products.filter(p => p.categoryId === selectedCategory)
        : products;

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;
    }

    return (
        <section id="shop" className="container" style={{ padding: '4rem 0' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                Latest Arrivals
            </h2>

            {/* Categories Filter */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap'
            }}>
                <button
                    className={selectedCategory === null ? 'btn-primary' : 'glass-panel'}
                    style={{
                        padding: '0.75rem 1.5rem',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        background: selectedCategory === null ? undefined : 'rgba(255, 255, 255, 0.05)',
                        border: selectedCategory === null ? undefined : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => setSelectedCategory(null)}
                >
                    🌟 Todos
                </button>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={selectedCategory === category.id ? 'btn-primary' : 'glass-panel'}
                        style={{
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            transition: 'var(--transition-fast)',
                            background: selectedCategory === category.id ? undefined : 'rgba(255, 255, 255, 0.05)',
                            border: selectedCategory === category.id ? undefined : '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
            }}>
                {filteredProducts.length === 0 ? (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No products found in this category.</p>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} className="glass-panel" style={{
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'var(--transition-fast)'
                        }}>
                            <div style={{
                                height: '200px',
                                backgroundColor: '#222',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                backgroundImage: `url(${product.imageUrl || 'https://via.placeholder.com/300'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>

                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                                {product.description && product.description.substring(0, 60)}...
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>${product.price}</span>
                                <button
                                    className="btn-primary"
                                    style={{
                                        padding: '0.5rem',
                                        fontSize: '0.8rem',
                                        background: addedProduct === product.id ? 'rgba(0, 255, 0, 0.3)' : undefined,
                                        border: addedProduct === product.id ? '1px solid rgba(0, 255, 0, 0.5)' : undefined
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {addedProduct === product.id ? '✓ Added!' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductList;
