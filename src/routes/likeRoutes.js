const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController.js");
const upload = require("../config/upload.js");

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Gerenciamento de curtidas (likes)
 */

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Lista todas as curtidas com possibilidade de filtrar por ID de usuário ou post
 *     tags: [Likes]
 *     parameters:
 *       - in: query
 *         name: id_usuario
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filtro por ID do usuário
 *       - in: query
 *         name: id_post
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filtro por ID do post
 *     responses:
 *       200:
 *         description: Lista de curtidas (com ou sem filtros)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_like:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   id_post:
 *                     type: integer
 *                   data_curtida:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro interno ao buscar as curtidas
 */
router.get("/likes", likeController.getAllLikes);

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Busca uma curtida por ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da curtida a ser buscada
 *     responses:
 *       200:
 *         description: Curtida encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_like:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 data_curtida:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Curtida não encontrada
 *       500:
 *         description: Erro interno ao buscar a curtida
 */
router.get("/likes/:id", likeController.getLikeById);

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Cria uma nova curtida
 *     tags: [Likes]
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
 *     responses:
 *       201:
 *         description: Curtida criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_like:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 data_curtida:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar a curtida
 */
router.post("/likes", upload.single("anexo"), likeController.createLike);

/**
 * @swagger
 * /api/likes/{id}:
 *   put:
 *     summary: Atualiza uma curtida
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da curtida a ser atualizada
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
 *     responses:
 *       200:
 *         description: Curtida atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_like:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 data_curtida:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Curtida não encontrada
 *       500:
 *         description: Erro ao atualizar a curtida
 */
router.put("/likes/:id", upload.single("anexo"), likeController.updateLike);

/**
 * @swagger
 * /api/likes/{id}:
 *   delete:
 *     summary: Remove uma curtida
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da curtida a ser removida
 *     responses:
 *       200:
 *         description: Curtida removida com sucesso
 *       404:
 *         description: Curtida não encontrada
 *       500:
 *         description: Erro ao remover a curtida
 */
router.delete("/likes/:id", likeController.deleteLike);




module.exports = router;