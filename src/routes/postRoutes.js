const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");
const upload = require('../config/upload');
const apiKeyMiddleware = require("../config/apiKey");

// Protege todas as rotas com middleware de API Key
router.use(apiKeyMiddleware);

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
 *         description: Filtro para buscar posts que contêm um texto específico
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_post:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   conteudo_post:
 *                     type: string
 *                   anexo_url:
 *                     type: string
 *                     format: uri
 *                   data_criacao:
 *                     type: string
 *                     format: date-time
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_post:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 conteudo_post:
 *                   type: string
 *                 anexo_url:
 *                   type: string
 *                   format: uri
 *                 data_criacao:
 *                   type: string
 *                   format: date-time
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
 *             required:
 *               - id_usuario
 *               - conteudo_post
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID do usuário que cria o post
 *               conteudo_post:
 *                 type: string
 *                 description: Texto do post
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo anexo opcional
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_post:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 conteudo_post:
 *                   type: string
 *                 anexo_url:
 *                   type: string
 *                   format: uri
 *                 data_criacao:
 *                   type: string
 *                   format: date-time
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               conteudo_post:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo anexo opcional para atualizar
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_post:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 conteudo_post:
 *                   type: string
 *                 anexo_url:
 *                   type: string
 *                   format: uri
 *                 data_atualizacao:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Post não encontrado
 */
router.put("/post/:id", upload.single("anexo"), postController.updatePost);

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
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete("/post/:id", postController.deletePost);

module.exports = router;
