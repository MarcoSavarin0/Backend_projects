import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Params = {
    id: string;
}
type MyObject = {
    title: string;
    fecha: string;
    descripcion: string;
}
const EditPost = () => {
    const [data, setData] = useState<MyObject>({ title: "", fecha: "", descripcion: "" });
    const [redirect, setRedirect] = useState<boolean>(false);
    const { id } = useParams<Params>();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const base64Auth = localStorage.getItem('auth');
            const response = await fetch(`http://localhost:3000/admin/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64Auth}`,

                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al crear el post');
            }
            setRedirect(true);
            return response.json();
        } catch (error) {
            console.error(error)
            return null;
        }
    }
    useEffect(() => {
        if (redirect) {
            navigate(`/post/${id}`)
        }
    }, [redirect, id, navigate])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                <label htmlFor="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha" value={data.fecha} onChange={(e) => setData({ ...data, fecha: e.target.value })} />
                <label htmlFor="descripcion">Descripcion</label>
                <textarea id="descripcion" name="descripcion" value={data.descripcion} onChange={(e) => setData({ ...data, descripcion: e.target.value })} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditPost