const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários com a possibilidade de filtro por nome
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
 *         description: Lista de usuários (com ou sem filtros)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
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
 *                   data_criacao:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erro interno ao buscar os usuários
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
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
 *                 data_criacao:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao buscar o usuário
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /api/users:
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
 *                 enum: [Empresa, Pessoal]
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil opcional
 *               foto_capa:
 *                 type: string
 *                 format: binary
 *                 description: Foto de capa opcional
 *               descricao:
 *                 type: string
 *               especializacoes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
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
 *                 data_criacao:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar o usuário
 */
router.post("/users", upload.fields([
    { name: 'foto_perfil', maxCount: 1 },
    { name: 'foto_capa', maxCount: 1 }
]), userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo_conta:
 *                 type: string
 *                 enum: [Empresa, Pessoal]
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *                 description: Nova foto de perfil opcional
 *               foto_capa:
 *                 type: string
 *                 format: binary
 *                 description: Nova foto de capa opcional
 *               descricao:
 *                 type: string
 *               especializacoes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
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
 *                 data_criacao:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put("/users/:id", upload.fields([
    { name: 'foto_perfil', maxCount: 1 },
    { name: 'foto_capa', maxCount: 1 }
]), userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao remover o usuário
 */
router.delete("/users/:id", userController.deleteUser);


module.exports = router;
