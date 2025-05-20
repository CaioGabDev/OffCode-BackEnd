const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");
const upload = require("../config/upload.js");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de publicações (posts)
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todos os posts com possibilidade de filtro por título ou conteúdo
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrar posts que contenham esse título
 *       - in: query
 *         name: conteudo
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrar posts que contenham esse conteúdo
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
 *                   titulo:
 *                     type: string
 *                   conteudo:
 *                     type: string
 *                   anexo:
 *                     type: string
 *                     nullable: true
 *                   data_publicacao:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro interno ao buscar os posts
 */
router.get("/posts", postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Busca um post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser buscado
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
 *                 titulo:
 *                   type: string
 *                 conteudo:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno ao buscar o post
 */
router.get("/posts/:id", postController.getById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               conteudo_post:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Anexo opcional (imagem, vídeo, etc)
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
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar o post
 */
router.post("/posts", upload.single("anexo"), postController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               conteudo_post:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Novo anexo opcional
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
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao atualizar o post
 */
router.put("/posts/:id", upload.single("anexo"), postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Remove um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser removido
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro ao deletar o post
 */
router.delete("/posts/:id", postController.deletePost);


module.exports = router;