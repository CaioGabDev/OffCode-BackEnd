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
 *                   id_comentario:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   id_post:
 *                     type: integer
 *                   conteudo_comentario:
 *                     type: string
 *                   anexo:
 *                     type: string
 *                     nullable: true
 *                     description: Anexo opcional (imagem, arquivo, etc)
 *                   data_publicacao:
 *                     type: string
 *                     format: date
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
 *                 id_comentario:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno ao buscar o comentário
 */
router.get("/comments/:id", commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Busca comentário por ID incluindo dados do autor
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
 *         description: Comentário encontrado com dados do autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_comentario:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date-time
 *                 autor:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     foto_perfil:
 *                       type: string
 *                       nullable: true
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro interno ao buscar o comentário
 */
router.get("/comments/post/:id_post", commentController.getCommentByPostId);

/**
 * @swagger
 * /api/duvidas/{id}/comments:
 *   get:
 *     summary: Busca comentários da dúvida por ID da dúvida
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da dúvida (id_post da tabela duvidas)
 *     responses:
 *       200:
 *         description: Lista de comentários da dúvida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_comentario:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   id_post:
 *                     type: integer
 *                   conteudo_comentario:
 *                     type: string
 *                   anexo:
 *                     type: string
 *                     nullable: true
 *                   data_publicacao:
 *                     type: string
 *                     format: date-time
 *                   username:
 *                     type: string
 *                   foto_perfil:
 *                     type: string
 *                     nullable: true
 *       404:
 *         description: Nenhum comentário encontrado para esta dúvida
 *       500:
 *         description: Erro interno ao buscar os comentários
 */
router.get("/comments/duvida/:id_duvida", commentController.getCommentByDuvidaId);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_post:
 *                 type: integer
 *               conteudo_comentario:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Anexo opcional
 *     responses:
 *       201:
 *         description: Comentário criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_comentario:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar o comentário
 */
router.post("/comments", upload.single("anexo"), commentController.createComment);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_post:
 *                 type: integer
 *               conteudo_comentario:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Anexo opcional
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_comentario:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_comentario:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro ao atualizar o comentário
 */
router.put("/comments/:id", upload.single("anexo"), commentController.updateComment);

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