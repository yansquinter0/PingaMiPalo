import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        role: '',
        imageUrl: ''
    });
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        username: '',
        imageUrl: ''
    });
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        const imageUrl = localStorage.getItem('imageUrl');

        setUserData({
            username: (username && username !== 'undefined') ? username : 'Guest',
            role: (role && role !== 'undefined') ? role : 'Invitado',
            imageUrl: (imageUrl && imageUrl !== 'undefined') ? imageUrl : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        });

        setEditForm({
            username: username || '',
            imageUrl: imageUrl || ''
        });

        if (role === 'ADMIN') {
            fetchUsers(token);
        }
    }, [navigate]);

    const fetchUsers = async (token) => {
        setLoadingUsers(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                const data = await response.json();

                // Update localStorage
                if (data.token) localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('imageUrl', data.imageUrl);

                // Update state
                setUserData({
                    ...userData,
                    username: data.username,
                    imageUrl: data.imageUrl
                });

                setIsEditing(false);
                alert('Perfil actualizado exitosamente');
            } else {
                const error = await response.json();
                alert(error.message || 'Error al actualizar perfil');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error al actualizar perfil');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
            {/* Profile Card */}
            <div className="glass-panel" style={{
                maxWidth: '600px',
                margin: '0 auto 2rem',
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '150px',
                    background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(255, 0, 153, 0.1))',
                    zIndex: 0
                }}></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Avatar */}
                    <div style={{
                        width: '150px',
                        height: '150px',
                        margin: '0 auto 2rem',
                        borderRadius: '50%',
                        border: '4px solid var(--accent-primary)',
                        padding: '6px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0, 243, 255, 0.4)',
                        animation: 'pulse 3s ease-in-out infinite'
                    }}>
                        <img
                            src={userData.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '3px solid #000'
                            }}
                            onError={(e) => {
                                e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                            }}
                        />
                    </div>

                    {/* Edit Mode */}
                    {isEditing ? (
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left' }}>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left' }}>
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={editForm.imageUrl}
                                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        background: 'linear-gradient(135deg, #00f3ff, #0099ff)',
                                        border: '2px solid var(--accent-primary)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: saving ? 'not-allowed' : 'pointer',
                                        opacity: saving ? 0.6 : 1
                                    }}
                                >
                                    {saving ? 'Saving...' : '✓ Save'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditForm({
                                            username: userData.username,
                                            imageUrl: userData.imageUrl
                                        });
                                    }}
                                    style={{
                                        padding: '0.8rem 2rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* User Info */}
                            <h2 className="gradient-text" style={{
                                fontSize: '2.5rem',
                                marginBottom: '0.5rem',
                                fontWeight: 'bold',
                                letterSpacing: '1px'
                            }}>
                                {userData.username}
                            </h2>

                            {/* Role Badge */}
                            <div style={{ marginBottom: '2rem' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.6rem 1.5rem',
                                    background: userData.role === 'ADMIN'
                                        ? 'linear-gradient(135deg, rgba(255, 0, 153, 0.3), rgba(255, 0, 153, 0.1))'
                                        : 'linear-gradient(135deg, rgba(0, 243, 255, 0.3), rgba(0, 243, 255, 0.1))',
                                    borderRadius: '25px',
                                    color: userData.role === 'ADMIN' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                                    border: `2px solid ${userData.role === 'ADMIN' ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    boxShadow: userData.role === 'ADMIN'
                                        ? '0 4px 15px rgba(255, 0, 153, 0.3)'
                                        : '0 4px 15px rgba(0, 243, 255, 0.3)'
                                }}>
                                    {userData.role === 'ADMIN' ? '👑 ' : '🎭 '}{userData.role}
                                </span>
                            </div>

                            {/* Edit Profile Button */}
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    width: '100%',
                                    maxWidth: '300px',
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #00f3ff, #0099ff)',
                                    border: '2px solid var(--accent-primary)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(0, 243, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '1rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(0, 243, 255, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(0, 243, 255, 0.4)';
                                }}
                            >
                                ✏️ Edit Profile
                            </button>
                        </>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #ff0099, #ff4466)',
                            border: '2px solid var(--accent-secondary)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(255, 0, 153, 0.4)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(255, 0, 153, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(255, 0, 153, 0.4)';
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Admin Section - Guest List */}
            {userData.role === 'ADMIN' && (
                <div className="glass-panel" style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '2.5rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <h3 className="gradient-text" style={{
                        fontSize: '2rem',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}>
                        📋 Registered Guests
                    </h3>
                    {loadingUsers ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading guests...</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'separate',
                                borderSpacing: '0 10px'
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>User</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>Email</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>Role</th>
                                        <th style={{
                                            padding: '1rem',
                                            textAlign: 'right',
                                            color: 'var(--accent-primary)',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(u => u.role !== 'ADMIN').map(user => (
                                        <tr key={user.id} style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            transition: 'all 0.3s ease'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                                                e.currentTarget.style.transform = 'scale(1.01)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}>
                                            <td style={{ padding: '1.2rem', borderRadius: '8px 0 0 8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden',
                                                        border: '2px solid var(--accent-primary)'
                                                    }}>
                                                        <img
                                                            src={user.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                                            alt=""
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <span style={{ fontWeight: '500' }}>{user.username}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                                            <td style={{ padding: '1.2rem', textAlign: 'center' }}>
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    background: 'rgba(0, 243, 255, 0.15)',
                                                    border: '1px solid rgba(0, 243, 255, 0.3)',
                                                    color: 'var(--accent-primary)',
                                                    fontWeight: '600'
                                                }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td style={{
                                                padding: '1.2rem',
                                                textAlign: 'right',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.9rem',
                                                borderRadius: '0 8px 8px 0'
                                            }}>
                                                {new Date(user.createdAt).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.filter(u => u.role !== 'ADMIN').length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{
                                                padding: '3rem',
                                                textAlign: 'center',
                                                color: 'var(--text-secondary)',
                                                fontSize: '1.1rem'
                                            }}>
                                                No guests registered yet. 👥
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
