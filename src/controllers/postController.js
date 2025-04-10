const PostModel = require('../models/PostModel');

const getAllPosts = async (req, res) => {
    try {
        const { conteudo } = req.query;
        const posts = await PostModel.getPosts(conteudo);
        res.json(posts); 
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: 'Erro ao buscar posts.' });
    }
};

const getById = async (req, res) => {
    try {
        const post = await PostModel.getPostById(req.params.id);
        if (!post || post.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        res.json(post[0]); // Retorna o primeiro (e único) item da lista
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar post.' });
    }
};

const createPost = async (req, res) => {
    try {
        const { conteudo_post, anexo, id_usuario } = req.body;
        const newPost = await PostModel.createPost(conteudo_post, anexo, id_usuario);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar post.' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { conteudo_post, anexo } = req.body;
        const post = await PostModel.updatePost(req.params.id, conteudo_post, anexo);
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar post.' });
    }
};

const deletePost = async (req, res) => {
    try {
        const result = await PostModel.deletePost(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar post.' });
    }
};

module.exports = { getAllPosts, getById, createPost, updatePost, deletePost };