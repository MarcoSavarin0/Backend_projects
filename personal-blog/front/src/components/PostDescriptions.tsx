/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type MyObject = {
    title: string;
    fecha: string;
    descripcion: string;
    id: number;
    [key: string]: string | number;
}
type Params = {
    id: string;
}

const PostDescriptions = () => {
    const [data, setData] = useState<MyObject>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams<Params>();

    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://localhost:3000/posts/${id}`;
            try {
                const response = await fetch(url)
                if (!response) {
                    throw new Error("Error al obtener los datos");
                }
                const dataFetch: MyObject[] = await response.json();
                const outArrayData: MyObject = dataFetch.reduce((acc, obj) => ({ ...acc, ...obj }), {
                    title: '',
                    fecha: '',
                    descripcion: '',
                    id: 0,
                });
                setData(outArrayData)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        }
        fetchApi()
    }, [id])
    return (
        <div>
            
            {
                data &&
                <div>
                    <h1>{data.title}</h1>
                    <span>{data.fecha}</span>
                    <p>{data.descripcion}</p>
                </div>
            }
        </div>
    )
}

export default PostDescriptions