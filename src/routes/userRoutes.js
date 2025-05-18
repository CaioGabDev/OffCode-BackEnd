const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const upload = require('../config/upload');
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Lista todos os usuários com possibilidade de filtrar pelo nome
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro para buscar usuários pelo nome
 *     responses:
 *       200:
 *         description: Lista de usuários (com ou sem filtro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tipo_conta:
 *                     type: string
 *                   foto_perfil:
 *                     type: string
 *                     nullable: true
 *                   foto_capa:
 *                     type: string
 *                     nullable: true
 *                   descricao:
 *                     type: string
 *                     nullable: true
 *                   especializacoes:
 *                     type: string
 *                     nullable: true
 *       500:
 *         description: Erro interno ao buscar os usuários
 */
router.get('/user', UserController.getAllUsers);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tipo_conta:
 *                   type: string
 *                 foto_perfil:
 *                   type: string
 *                   nullable: true
 *                 foto_capa:
 *                   type: string
 *                   nullable: true
 *                 descricao:
 *                   type: string
 *                   nullable: true
 *                 especializacoes:
 *                   type: string
 *                   nullable: true
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:id', UserController.getUserById);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Cria um novo usuário
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
 *                 nullable: true
 *               foto_capa:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *               descricao:
 *                 type: string
 *                 nullable: true
 *               especializacoes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post('/user', upload.fields([{ name: "foto_perfil", maxCount: 1 }, { name: "foto_capa", maxCount: 1 }]), UserController.createUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *               username:
 *                 type: string
 *                 nullable: true
 *               email:
 *                 type: string
 *                 nullable: true
 *               senha:
 *                 type: string
 *                 nullable: true
 *               tipo_conta:
 *                 type: string
 *                 nullable: true
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *               foto_capa:
 *                 type: string
 *                 format: binary
 *                 nullable: true
 *               descricao:
 *                 type: string
 *                 nullable: true
 *               especializacoes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put('/user/:id', upload.fields([{ name: "foto_perfil", maxCount: 1 }, { name: "foto_capa", maxCount: 1 }]), UserController.updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado
 */
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
