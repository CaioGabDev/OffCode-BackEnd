const express = require('express');
const router = express.Router();
const likeController = require("../controllers/likeController");
const apiKeyMiddleware = require("../config/apiKey"); // 🔐

router.use(apiKeyMiddleware); // 🔒 Protege todas as rotas

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Gerenciamento de curtidas (likes)
 */

/**
 * @swagger
 * /api/like:
 *   get:
 *     summary: Lista todas as curtidas com possibilidade de filtrar pelo ID do usuário
 *     tags: [Likes]
 *     parameters:
 *       - in: query
 *         name: id_usuario
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filtro para buscar curtidas feitas por um usuário específico
 *     responses:
 *       200:
 *         description: Lista de curtidas (com ou sem filtro)
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
 *                   data_curtida:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro interno ao buscar as curtidas
 */
router.get("/like", likeController.getAllLikes);

/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Cria uma nova curtida
 *     tags: [Likes]
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
 *               data_curtida:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Curtida criada com sucesso
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
 *                 data_curtida:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar a curtida
 */
router.post("/like", likeController.createLike);

/**
 * @swagger
 * /api/like/{id}:
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
 *                 id:
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
router.get("/like/:id", likeController.getLikeById);

/**
 * @swagger
 * /api/like/{id}:
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_post:
 *                 type: integer
 *               data_curtida:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Curtida atualizada com sucesso
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
router.put("/like/:id", likeController.updateLike);


/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     summary: Deleta uma curtida
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da curtida a ser deletada
 *     responses:
 *       200:
 *         description: Curtida deletada com sucesso
 *       404:
 *         description: Curtida não encontrada
 *       500:
 *         description: Erro ao deletar a curtida
 */
router.delete("/like/:id", likeController.deleteLike);


module.exports = router;
