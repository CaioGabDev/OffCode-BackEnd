const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const upload = require("../config/upload.js");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/user', UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Buscar usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario não encontrado
 */
router.get('/user/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_conta:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *               descricao:
 *                 type: string
 *               especializacoes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criado
 */
router.post('/user', upload.single("foto_perfil"), UserController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_conta:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *               descricao:
 *                 type: string
 *               especializacoes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario atualizado
 */
router.put('/user/:id', UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario deletado
 */
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;