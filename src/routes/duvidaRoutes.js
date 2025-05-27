const express = require("express");
const router = express.Router();
const duvidaController = require("../controllers/duvidaController.js");
const upload = require("../config/upload.js");

/**
 * @swagger
 * tags:
 *   name: Duvidas
 *   description: Gerenciamento de dúvidas
 */

/**
 * @swagger
 * /api/duvidas:
 *   get:
 *     summary: Lista todas as dúvidas com possibilidade de filtrar pelo conteúdo
 *     tags: [Duvidas]
 *     parameters:
 *       - in: query
 *         name: conteudo_duvida
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro para buscar dúvidas que contêm o texto especificado
 *     responses:
 *       200:
 *         description: Lista de dúvidas (com ou sem filtro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_duvida:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   id_post:
 *                     type: integer
 *                   conteudo_duvida:
 *                     type: string
 *                   anexo:
 *                     type: string
 *                     nullable: true
 *                     description: Anexo opcional (imagem, arquivo, etc)
 *                   data_publicacao:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Erro interno ao buscar as dúvidas
 */
router.get("/duvidas", duvidaController.getAllDuvidas);

/**
 * @swagger
 * /api/duvidas/{id}:
 *   get:
 *     summary: Busca dúvida por ID
 *     tags: [Duvidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da dúvida a ser buscada
 *     responses:
 *       200:
 *         description: Dúvida encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_duvida:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_duvida:
 *                   type: string
 *                 anexo:
 *                   type: string
 *                   nullable: true
 *                 data_publicacao:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Dúvida não encontrada
 *       500:
 *         description: Erro interno ao buscar a dúvida
 */
router.get("/duvidas/:id", duvidaController.getById);

/**
 * @swagger
 * /api/duvidas:
 *   post:
 *     summary: Cria uma nova dúvida
 *     tags: [Duvidas]
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
 *               conteudo_duvida:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Anexo opcional
 *     responses:
 *       201:
 *         description: Dúvida criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_duvida:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_duvida:
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
 *         description: Erro ao criar a dúvida
 */
router.post("/duvidas", upload.single("anexo"), duvidaController.createDuvida);

/**
 * @swagger
 * /api/duvidas/{id}:
 *   put:
 *     summary: Atualiza uma dúvida
 *     tags: [Duvidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da dúvida a ser atualizada
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
 *               conteudo_duvida:
 *                 type: string
 *               anexo:
 *                 type: string
 *                 format: binary
 *                 description: Anexo opcional
 *     responses:
 *       200:
 *         description: Dúvida atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_duvida:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 id_post:
 *                   type: integer
 *                 conteudo_duvida:
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
 *         description: Dúvida não encontrada
 *       500:
 *         description: Erro ao atualizar a dúvida
 */
router.put("/duvidas/:id", upload.single("anexo"), duvidaController.updateDuvida);

/**
 * @swagger
 * /api/duvidas/{id}:
 *   delete:
 *     summary: Deleta uma dúvida
 *     tags: [Duvidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da dúvida a ser deletada
 *     responses:
 *       200:
 *         description: Dúvida deletada com sucesso
 *       404:
 *         description: Dúvida não encontrada
 *       500:
 *         description: Erro ao deletar a dúvida
 */
router.delete("/duvidas/:id", duvidaController.deleteDuvida);

module.exports = router;
