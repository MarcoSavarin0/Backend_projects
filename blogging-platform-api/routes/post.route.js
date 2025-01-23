import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost, getPost, getPostsByTag } from '../controller/post.controller.js';
const router = Router();

router.get('/', getPosts)

router.get('/filter', getPostsByTag)

router.post('/', createPost)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

router.get('/:id', getPost)





export default router; 