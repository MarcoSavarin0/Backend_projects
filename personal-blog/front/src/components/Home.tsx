import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type MyObject = {
    title: string;
    fecha: string;
    descripcion: string;
    id: number;
}

const Home = () => {
    const [data, setData] = useState<MyObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApi = async () => {
            const url = "http://localhost:3000/posts/";
            try {
                const response = await fetch(url)
                if (!response) {
                    throw new Error("Error al obtener los datos");
                }
                const dataFetch: MyObject[] = await response.json();
                setData(dataFetch)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        }
        fetchApi()
    }, [])

    return (
        <div>
            <h1>Posts</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {data.map((post) => (
                    <li key={post.id}>
                        <h2>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <span>{post.fecha}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home