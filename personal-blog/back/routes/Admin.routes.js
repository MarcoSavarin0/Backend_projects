import { Router } from 'express';
import { basicAuthMiddleware } from '../middleware/Admin.middleware.js';
import { createPost, editPost, deletePost } from '../controller/Admin.controller.js'
const router = Router();

router.get("/protegida", basicAuthMiddleware, (req, res) => {
    res.send("hola")
})

router.post("/", basicAuthMiddleware, createPost)
router.put("/edit/:id", basicAuthMiddleware, editPost)
router.delete("/delete/:id", basicAuthMiddleware, deletePost)

export default router;