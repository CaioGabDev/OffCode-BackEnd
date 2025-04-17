const LikeModel = require('../models/LikeModel');

const getAllLikes = async (req, res) => {
    try {
        const {name} = req.query;
        const likes = await LikeModel.getLikes(name);
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

const deleteLike = async (req, res) => {
    try {
        const result = await LikeModel.deleteLikes(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
}

const createLike = async (req, res) => {
    try {
        const { } = req.body;
        const like = await LikeModel.createLikes(nome, Likename, email, senha, tipo_conta, foto_perfil, descricao, especializacoes);
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar o usuário." });
    }
}


module.exports = {getAllLikes, deleteLike, createLike};