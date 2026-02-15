import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
            {/* Hero Section */}
            <div className="glass-panel" style={{
                maxWidth: '900px',
                margin: '0 auto 2rem',
                padding: '3rem',
                textAlign: 'center'
            }}>
                <h1 className="gradient-text" style={{
                    fontSize: '3.5rem',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                }}>
                    About PingaMiPalo
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.3rem',
                    lineHeight: '1.8',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Your premier destination for modern intimacy products. We believe in empowering individuals to explore their desires with confidence and discretion.
                </p>
            </div>

            {/* Mission Section */}
            <div className="glass-panel" style={{
                maxWidth: '900px',
                margin: '0 auto 2rem',
                padding: '2.5rem'
            }}>
                <h2 className="gradient-text" style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    🎯 Our Mission
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                    To provide a safe, judgment-free space where everyone can discover high-quality products designed to enhance pleasure and intimacy.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {/* Feature Cards */}
                    <div style={{
                        padding: '2rem',
                        background: 'rgba(0, 243, 255, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                            Discreet Shipping
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            All orders arrive in unmarked, secure packaging to protect your privacy.
                        </p>
                    </div>

                    <div style={{
                        padding: '2rem',
                        background: 'rgba(255, 0, 153, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 0, 153, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
                            Premium Quality
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            We curate only the finest products made from body-safe materials.
                        </p>
                    </div>

                    <div style={{
                        padding: '2rem',
                        background: 'rgba(0, 243, 255, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                            Expert Support
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Our knowledgeable team is here to help you find exactly what you need.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="glass-panel" style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '2.5rem'
            }}>
                <h2 className="gradient-text" style={{
                    fontSize: '2.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    💎 Our Values
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--accent-primary)'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                            🌈 Inclusivity
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            We celebrate diversity and welcome everyone, regardless of gender, orientation, or experience level.
                        </p>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--accent-secondary)'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
                            🛡️ Safety First
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            All products are rigorously tested and made from non-toxic, body-safe materials.
                        </p>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--accent-primary)'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                            📚 Education
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            We provide resources and guidance to help you make informed decisions about your pleasure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
