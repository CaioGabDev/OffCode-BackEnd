const CommentModel = require('../models/CommentModel');

const getAllComments = async (req, res) => {
    try {
        const { conteudo_comentario } = req.query;
        const comments = await CommentModel.getComments(conteudo_comentario);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
};

const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentModel.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar comentário.' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const result = await CommentModel.deleteComment(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        res.status(500).json({ error: 'Erro ao deletar comentário.' });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await CommentModel.updateComment(req.params.id, req.body);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o comentário.' });
    }
};

const createComment = async (req, res) => {
    try {
        const { id_usuario, id_post, conteudo_comentario, data_publicacao } = req.body;
        const anexo = req.file ? req.file.filename : null;
        const comment = await CommentModel.createComment(
            id_usuario, id_post, conteudo_comentario, anexo, data_publicacao
        );
        res.status(201).json(comment);
    } catch (error) {
        console.error('Erro ao criar o comentário:', error);
        res.status(500).json({ message: 'Erro ao criar o comentário.' });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    deleteComment,
    updateComment,
    createComment
};