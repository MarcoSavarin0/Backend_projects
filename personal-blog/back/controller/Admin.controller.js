import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createPost(req, res) {
    const { title, fecha, descripcion } = req.body;
    const newPost = {
        title,
        fecha,
        descripcion,
        id: Date.now()
    };
    const filePath = path.join(__dirname, '../data/post.json');

    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileData);
        posts.push(newPost);
        await fs.promises.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8');
        res.status(201).json(newPost)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ups! ocurrio un error al crear el post" });
    }
}

export async function editPost(req, res) {
    const { title, fecha, descripcion } = req.body;
    const id = req.params.id
    const filePath = path.join(__dirname, '../data/post.json');
    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileData);
        const findPost = posts.find(post => post.id == id);
        if (!findPost) {
            return res.status(400).json("No se encontro el post")
        }

        findPost.title = title ?? findPost.title;
        findPost.fecha = fecha ?? findPost.fecha;
        findPost.descripcion = descripcion ?? findPost.descripcion;

        await fs.promises.writeFile(filePath, JSON.stringify(posts, null, 2));
        res.status(200).json({ message: "Post actualizado con éxito", post: findPost });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ups! ocurrio un error al editar el post" });
    }
}

export async function deletePost(req, res) {
    const id = req.params.id
    const filePath = path.join(__dirname, '../data/post.json');
    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileData);
        const updatePost = posts.filter(post => post.id != id)
        if (updatePost.length === posts.length) {
            return res.status(404).json({ message: "No se encontró el post con el id especificado." });
        }
        await fs.promises.writeFile(filePath, JSON.stringify(updatePost, null, 2));
        res.status(200).json({ message: "Post eliminado con éxito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ups! ocurrio un error al eliminar el post" });
    }
}