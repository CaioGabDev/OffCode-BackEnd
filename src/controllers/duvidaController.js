const DudvidaModel = require('../models/DuvidaModel');

const getAllDuvidas = async (req, res) => {
    try {
        const { conteudo } = req.query;
        const duvidas = await DudvidaModel.getDuvidas(conteudo);
        res.json(duvidas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dúvidas.' });
    }
};

const getById = async (req, res) => {
    try {
        const duvida = await DudvidaModel.getDuvidaById(req.params.id);
        if (!duvida) {
            return res.status(404).json({ error: 'Dúvida não encontrada.' });
        }
        res.json(duvida);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dúvida.' });
    }
};

const createDuvida = async (req, res) => {
    try {
        const { conteudo_duvida, id_usuario } = req.body;
        const anexo = req.file ? req.file.filename : null;
        const newDuvida = await DudvidaModel.createDuvida(conteudo_duvida, anexo, id_usuario);
        res.status(201).json(newDuvida);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar dúvida.' });
    }
};

const updateDuvida = async (req, res) => {
    try {
        const { conteudo_duvida, anexo } = req.body;
        const duvida = await DudvidaModel.updateDuvida(req.params.id, conteudo_duvida, anexo);
        if (!duvida) {
            return res.status(404).json({ error: 'Dúvida não encontrada.' });
        }
        res.json(duvida);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar dúvida.' });
    }
};

const deleteDuvida = async (req, res) => {
    try {
        const result = await DudvidaModel.deleteDuvida(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar dúvida.' });
    }
};

module.exports = { getAllDuvidas, getById, createDuvida, updateDuvida, deleteDuvida };
