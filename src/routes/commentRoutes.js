const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController.js");
const upload = require("../config/upload.js");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gerenciamento de comentários
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Lista todos os comentários com possibilidade de filtrar pelo conteúdo
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: conteudo_comentario
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro para buscar comentários que contêm o texto especificado
 *     responses:
 *       200:
 *         description: Lista de comentários (com ou sem filtro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   id_post:
 *                     type: integer
 *                   conteudo_comentario:
 *                     type: string
 *       500:
 *         description: Erro interno ao buscar os comentários
 */
router.get("/comments", commentController.getAllComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Busca comentário por ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser buscado
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno ao buscar o comentário
 */
router.get("/comments/:id", commentController.getCommentById);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_post:
 *                 type: integer
 *               conteudo_comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentário criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar o comentário
 */
router.post("/comments",upload.single("anexo"), commentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Atualiza um comentário
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_post:
 *                 type: integer
 *               conteudo_comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro ao atualizar o comentário
 */
router.put("/comments/:id", commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Deleta um comentário
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser deletado
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro ao deletar o comentário
 */
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;