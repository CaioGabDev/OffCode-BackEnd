const pool = require("../config/database");

const getUsers = async (nome) => {
    const result = nome
        ? await pool.query("SELECT * FROM usuarios WHERE nome ILIKE $1", [`%${nome}%`])
        : await pool.query("SELECT * FROM usuarios");
    return result.rows;
};

const getUsersById = async (id) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
    return result.rows[0];
};

const updateUsers = async (id, data) => {
    const {
        nome,
        username,
        email,
        senha,
        tipo_conta,
        foto_perfil,
        foto_capa,
        descricao,
        especializacoes
    } = data;

    const result = await pool.query(`
        UPDATE usuarios
        SET nome = $1, username = $2, email = $3, senha = $4,
            tipo_conta = $5, foto_perfil = $6, foto_capa = $7,
            descricao = $8, especializacoes = $9
        WHERE id_usuario = $10
        RETURNING *
    `, [nome, username, email, senha, tipo_conta, foto_perfil, foto_capa, descricao, especializacoes, id]);

    return result.rows[0];
};

const createUsers = async (
    nome, username, email, senha, tipo_conta,
    foto_perfil, foto_capa, descricao, especializacoes
) => {
    const result = await pool.query(`
        INSERT INTO usuarios
        (nome, username, email, senha, tipo_conta,
        foto_perfil, foto_capa, descricao, especializacoes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
    `, [nome, username, email, senha, tipo_conta, foto_perfil, foto_capa, descricao, especializacoes]);

    return result.rows[0];
};

const deleteUsers = async (id) => {
    const result = await pool.query("DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    return { message: "Usuário deletado com sucesso." };
};


module.exports = { getUsers,getUsersById,deleteUsers, updateUsers, createUsers};
