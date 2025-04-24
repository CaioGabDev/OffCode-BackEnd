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


module.exports = router;