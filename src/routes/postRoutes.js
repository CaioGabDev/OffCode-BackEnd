const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");
const upload = require("../config/upload.js");
const apiKeyMiddleware = require("../config/apiKey"); // 🔐

router.use(apiKeyMiddleware); // 🔒 Protege todas as rotas

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
 *     summary: Lista todos os posts com possibilidade de filtrar pelo conteúdo
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: conteudo_post
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro para buscar posts que contêm um texto específico no conteúdo
 *     responses:
 *       200:
 *         description: Lista de posts (com ou sem filtro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   house_id:
 *                     type: integer
 *                   conteudo_post:
 *                     type: string
 *                   foto:
 *                     type: string
 *                   data_publicacao:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro interno ao buscar os posts
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

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Cria um novo Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               house_id:
 *                 type: integer
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post criado com sucesso!
 */
router.post("/post", upload.single("anexo"), postController.createPost);

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: Atualiza um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               house_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso!
 */
router.put("/post/:id", postController.updatePost);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Deleta um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deletado com sucesso!
 */
router.delete("/post/:id", postController.deletePost);

module.exports = router;
