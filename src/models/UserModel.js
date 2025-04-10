const pool = require("../config/database");

const getUsers = async () => {
    const result = await pool.query("SELECT * FROM usuarios ");
    return result.rows;
};

const getUsersById = async (id) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
    return result.rows[0];
};

const deleteUsers = async (id) => {
    const result = await pool.query("DELETE FROM usuarios WHERE id_usuarios = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    return { message: "Usuário deletado com sucesso." };
};
const updateUsers = async (id, data) => {
    const { nome, username, email, senha, tipo_conta, foto_perfil, descricao, especializacoes} = data;
    const result = await pool.query("UPDATE usuarios SET nome = $1, username = $2, email = $3, tipo_conta = $4, foto_perfil = $5, descricao = %6, especializacoes = %7, senha = %8  WHERE id = $9 RETURNING *", [nome, username, email, senha, tipo_conta, foto_perfil, descricao, especializacoes, id]);
    return result.rows[0];
};

const createUsers = async (nome, username, email, senha, tipo_conta, foto_perfil, descricao, especializacoes) => {
    const result = await pool.query("INSERT INTO usuarios (nome, username, email, senha, tipo_conta, foto_perfil, descricao, especializacoes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [nome, username, email, senha, tipo_conta, foto_perfil, descricao, especializacoes]);
    return result.rows[0];
};


module.exports = { getUsers, getUsersById, deleteUsers, updateUsers, createUsers };