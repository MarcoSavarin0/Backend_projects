import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import { Link } from 'react-router-dom';
type MyObject = {
    title: string;
    fecha: string;
    descripcion: string;
    id: number;
}
const DashboardAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<MyObject[]>([]);

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
            setIsAuthenticated(true);
            fetchLogin(savedAuth);
            fetchPost()
        }
    }, []);

    const handleLogin = (username: string, password: string) => {
        const authValue = `${username}:${password}`;
        const base64Auth = btoa(authValue);
        localStorage.setItem('auth', base64Auth);
        setIsAuthenticated(true);
        setError(null);
        fetchLogin(base64Auth);
    };

    const fetchLogin = async (base64Auth: string) => {
        try {
            const response = await fetch('http://localhost:3000/admin/protegida', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${base64Auth}`,
                },
            });
            if (!response.ok) {
                throw new Error('CONTRASEÑA O USUARIO INVALIDO');
            }
        } catch (err) {
            setError('Error al obtener los datos: ' + (err instanceof Error ? err.message : 'Desconocido'));
        }
    };

    const fetchPost = async () => {
        try {
            const response = await fetch('http://localhost:3000/posts/')
            if (!response.ok) {
                throw new Error('Error al encontrar los post');
            }
            const data: MyObject[] = await response.json();
            setPosts(data)
        } catch (err) {
            setError('Error al obtener los datos: ' + (err instanceof Error ? err.message : 'Desconocido'));
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
        setPosts([]);
    };

    const handleDelete = async (id : number) => {
        try {
            const base64Auth = localStorage.getItem('auth');
            const response = await fetch(`http://localhost:3000/admin/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${base64Auth}`,
                },
            });
            if (!response.ok) {
                console.log("error");
            }
            const data = await response.json();
            setPosts(data.new)
        } catch (err) {
            console.log(err)
        }
    }

    if (error) {
        return (
            <div>
                <Auth onLogin={handleLogin} />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            {!isAuthenticated ? (
                <Auth onLogin={handleLogin} />
            ) : (
                <div>
                    <h2>Posts</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to='/admin/add'>Añadir post</Link>
                    {posts.length > 0 ? (
                        <ul>
                            {posts.map((post, index) => (
                                <li key={index}>
                                    <h3>{post.title}</h3>
                                    <p>{post.descripcion}</p>
                                    <Link to={`/admin/editar/${post.id}`}>EDITAR</Link>
                                    <button onClick={() => handleDelete(post.id)}>BORRAR</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardAdmin;
