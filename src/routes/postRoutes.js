const express = require('express');

const router = express.Router();

const postController = require("../controllers/postController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get("/post", postController.getAllPosts);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Buscar um post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get("/post/:id", postController.getById);


router.post("/post", postController.createPost);


router.put("/post/:id", postController.updatePost);


router.delete("/post/:id", postController.deletePost);

module.exports = router;