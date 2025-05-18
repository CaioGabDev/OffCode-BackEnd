const UserModel = require('../models/UserModel');

const createUser = async (req, res) => {
    try {
        const {nome,username,email,senha,tipo_conta,descricao,especializacoes} = req.body;
        const foto_perfil = req.files?.foto_perfil?.[0]?.filename || null;
        const foto_capa = req.files?.foto_capa?.[0]?.filename || null;
        const user = await UserModel.createUsers( nome ,username,email ,senha ,tipo_conta ,foto_capa , foto_perfil ,descricao ,especializacoes );
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o usuário.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { nome } = req.query;
        const users = await UserModel.getUsers(nome);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
        }
        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await UserModel.getUsersById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const foto_perfil = req.files?.foto_perfil?.[0]?.filename || null;
        const foto_capa = req.files?.foto_capa?.[0]?.filename || null;

        const user = await UserModel.updateUsers(req.params.id, {...req.body, foto_perfil, foto_capa
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await UserModel.deleteUsers(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
};

module.exports = { getAllUsers, getUserById, deleteUser, updateUser, createUser };
