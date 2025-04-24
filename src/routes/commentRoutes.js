const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');
const upload = require("../config/upload.js");


/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Gerenciamento de comentários
 */

/**
 * @swagger
 * /api/comment:
 *   get:
 *     summary: Lista todos os comentários
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentários
 */
router.get('/comment', CommentController.getAllComments);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Buscar um comentários por ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentários encontrado
 *       404:
 *         description: Comentários não encontrado
 */
router.get('/comment/:id', CommentController.getCommentById);

/**
 * @swagger
 * /api/post:
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
 *               name:
 *                 type: string
 *               house_id:
 *                 type: integer
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso!
 */
router.post('/comment', CommentController.createComment);

module.exports = router;