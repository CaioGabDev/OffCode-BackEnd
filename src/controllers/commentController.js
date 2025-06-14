const CommentModel = require('../models/CommentModel');

const getAllComments = async (req, res) => {
    try {
        const { conteudo_comentario } = req.query;
        const comments = await CommentModel.getComments(conteudo_comentario);
        res.json(comments);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
};

const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentModel.getCommentById(id);
        if (!comment || comment.message) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }
        res.json(comment);
    } catch {
        res.status(500).json({ error: 'Erro ao buscar comentário.' });
    }
};

const getCommentByPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const comentarios = await CommentModel.getCommentsByPostId(id);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
};

const getCommentByDuvidaId = async (req, res) => {
  try {
    const { id } = req.params;
    const comentarios = await CommentModel.getCommentsByDuvidaId(id);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar comentários da dúvida' });
  }
};

const deleteComment = async (req, res) => {
    try {
        const result = await CommentModel.deleteComment(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error)  {
        console.error("Erro ao deletar comentário:", error);
        return res.status(500).json({ error: "Erro ao deletar comentário.", details: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await CommentModel.updateComment(req.params.id, req.body);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }
        res.json(comment);
    } catch {
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
    } catch {
        res.status(500).json({ message: 'Erro ao criar o comentário.' });
    }
};

module.exports = { getAllComments, getCommentById, getCommentByPostId, getCommentByDuvidaId ,deleteComment, updateComment, createComment };
