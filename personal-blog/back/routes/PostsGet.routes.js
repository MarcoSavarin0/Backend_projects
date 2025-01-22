import { Router } from 'express';
import { getAllPost, getPostById } from '../controller/PostsGet.controller.js'
const router = Router();


router.get("/", getAllPost)

router.get("/:id", getPostById)

export default router;