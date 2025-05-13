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


const deleteLike = async (req, res) => {
    try {
        const result = await LikeModel.deleteLikes(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.error('Erro ao buscar curtidas:', error);
        res.status(500).json({ error: 'Erro ao deletar curtida.' });
    }
};

const createLike = async (req, res) => {
    try {
        const { id_usuario, id_comentario, id_post, quantidade_curtidas } = req.body;
        const like = await LikeModel.createLikes(id_usuario, id_comentario, id_post, quantidade_curtidas);
        res.status(201).json(like);
    } catch (error) {
        console.error('Erro ao criar o comentário:', error);
        res.status(500).json({ message: "Erro ao criar a curtida." });
    }
}

const updateLike = async (req, res) => {
    try {
        const { id_usuario, id_comentario, id_post, quantidade_curtidas } = req.body;
        const like = await LikeModel.updateLikes(id_usuario, id_comentario, id_post, quantidade_curtidas);
        res.status(201).json(like);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a curtida." });
    }
}   

const getLikeById = async (req, res) => {
    const { id } = req.params;
    try {
        const like = await LikeModel.getLikesById(id);

        if (!like || (Array.isArray(like) && like.length === 0)) {
            return res.status(404).json({ error: 'Curtida não encontrada.' });
        }

        res.json(like);
    } catch (error) {
        console.error('Erro ao buscar curtida:', error);
        res.status(500).json({ error: 'Erro ao buscar curtida.' });
    }
};


module.exports = {getAllLikes, deleteLike, createLike, updateLike, getLikeById};