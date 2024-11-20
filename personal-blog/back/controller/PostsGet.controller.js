import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAllPost(req, res) {
    const filePath = path.join(__dirname, '../data/post.json');
    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileData);
        res.status(200).json(posts)
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Ups! ocurrio un error al buscar los posts" });
    }
}
export async function getPostById(req, res) {
    const id = req.params.id
    const filePath = path.join(__dirname, '../data/post.json');

    try {
        const fileData = await fs.promises.readFile(filePath, 'utf-8');
        const posts = JSON.parse(fileData);
        const postSearch = posts.filter(post => post.id == id)
        if(!postSearch){
            return res.status(400).json("No se encontro el post")
        }
        res.status(200).json(postSearch)

    }catch(err){
        console.error(err);
        res.status(500).json({ err: "Ups! ocurrio un error al buscar el post" });
    }
}