const LikeModel = require('../models/LikeModel');

const getAllLikes = async (req, res) => {
    try {
        const { id_usuario } = req.query;
        const likes = await LikeModel.getLikes(id_usuario);
        res.json(likes);
    } catch (error) {
        console.error('Erro ao buscar curtidas:', error);
        res.status(500).json({ error: 'Erro ao buscar curtidas.' });
    }
};

const getLikeById = async (req, res) => {
    const { id } = req.params;
    try {
        const like = await LikeModel.getLikesById(id);
        if (!like) {
            return res.status(404).json({ error: 'Curtida não encontrada.' });
        }
        res.json(like);
    } catch (error) {
        console.error('Erro ao buscar curtida:', error);
        res.status(500).json({ error: 'Erro ao buscar curtida.' });
    }
};

const createLike = async (req, res) => {
    try {
        const { id_usuario, id_comentario, id_post } = req.body;
        const like = await LikeModel.createLikes(id_usuario, id_comentario, id_post);
        res.status(201).json(like);
    } catch (error) {
        console.error('Erro ao criar a curtida:', error);
        res.status(500).json({ message: "Erro ao criar a curtida." });
    }
};

const getLikeCountByPost = async (req, res) => {
    try {
        const { id_post } = req.params;
        const count = await LikeModel.getLikeCountByPost(id_post);
        res.json(count);
    } catch (error) {
        console.error('Erro ao contar curtidas:', error);
        res.status(500).json({ error: 'Erro ao contar curtidas.' });
    }
};

const getLikeCountByCommentId = async (req, res) => {
    try {
        const { id_comentario } = req.params;
        const result = await LikeModel.getLikeCountByCommentId(id_comentario);

        if (!result || result.total_curtidas === undefined) {
            return res.status(404).json({ error: 'Curtidas não encontradas para este comentário.' });
        }

        res.status(200).json({ total_curtidas: parseInt(result.total_curtidas) });
    } catch (error) {
        console.error('Erro ao contar curtidas do comentário:', error);
        res.status(500).json({ error: 'Erro ao contar curtidas do comentário.' });
    }
};

const updateLike = async (req, res) => {
    try {
        const { id_usuario, id_comentario, id_post } = req.body;
        const { id } = req.params;
        const like = await LikeModel.updateLikes(id, id_usuario, id_comentario, id_post);
        if (!like) {
            return res.status(404).json({ message: "Curtida não encontrada para atualizar." });
        }
        res.status(200).json(like);
    } catch (error) {
        console.error('Erro ao atualizar a curtida:', error);
        res.status(500).json({ message: "Erro ao atualizar a curtida." });
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
        console.error('Erro ao deletar curtida:', error);
        res.status(500).json({ error: 'Erro ao deletar curtida.' });
    }
};

module.exports = { getAllLikes, getLikeById, createLike, getLikeCountByPost, getLikeCountByCommentId, updateLike, deleteLike };