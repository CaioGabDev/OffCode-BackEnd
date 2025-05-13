const pool = require("../config/database");


const getLikes = async (id_usuario) => {
    if (id_usuario) {
        const result = await pool.query(
            "SELECT * FROM curtidas WHERE CAST(id_usuario AS TEXT) ILIKE $1", 
            [`%${id_usuario}%`]
        );
        return result.rows;
    } else {
        const result = await pool.query("SELECT * FROM curtidas");
        return result.rows;
    }
};

const getLikesById = async (id) => {
    const result = await pool.query("SELECT * FROM curtidas WHERE id_curtida = $1", [id]);
    return result.rows[0];
};

const deleteLikes = async (id) => {
    const result = await pool.query("DELETE FROM curtidas WHERE id_curtida = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    return { message: "Usuário deletado com sucesso." };
};

const updateLikes = async (id_usuario, id_comentario, id_post, quantidade_curtidas ) => {
    const result = await pool.query("INSERT INTO curtidas VALUES ($1, $2, $3, $4) RETURNING *", [id_usuario, id_comentario, id_post, quantidade_curtidas]);
    return result.rows[0];
};

const createLikes = async (id_usuario, id_comentario, id_post, quantidade_curtidas ) => {
    const result = await pool.query(
        `INSERT INTO curtidas (id_usuario, id_comentario, id_post, quantidade_curtidas) VALUES ($1, $2, $3, $4) RETURNING *`,
        [id_usuario, id_comentario, id_post, quantidade_curtidas]
    );
    return result.rows[0];
};

module.exports = { getLikes, getLikesById, deleteLikes, updateLikes, createLikes };