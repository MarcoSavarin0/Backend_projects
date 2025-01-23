import { PrismaClient } from '@prisma/client'

export async function getPosts(req, res) {
    try {
        const prisma = new PrismaClient()
        const posts = await prisma.post.findMany()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Error getting posts', error: error.message })
    }
}

export async function createPost(req, res) {
    try {
        const prisma = new PrismaClient()
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags || []
            }
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message })
    }
}


export async function updatePost(req, res) {
    try {

        const prisma = new PrismaClient()
        const post = await prisma.post.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags || []
            }
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message })
    }
}

export async function deletePost(req, res) {
    try {
        const prisma = new PrismaClient()
        const post = await prisma.post.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message })
    }
}

export async function getPost(req, res) {
    try {
        const prisma = new PrismaClient()
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: 'Error getting post', error: error.message })
    }
}

export async function getPostsByTag(req, res) {
    try {
        const { term } = req.query;
        console.log(term);
        if (!term) {
            return res.status(400).json({ message: 'Tag is required' });
        }

        const prisma = new PrismaClient();

        const posts = await prisma.post.findMany({
            where: {
                tags: {
                    hasSome: [term],
                },
            },
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting posts by tag', error: error.message });
    }
}