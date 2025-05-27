const pool = require("../config/database");

const createLikes = async (id_usuario, id_comentario, id_post) => {
    const result = await pool.query(
        `INSERT INTO curtidas (id_usuario, id_comentario, id_post) VALUES ($1, $2, $3) RETURNING *`,
        [id_usuario, id_comentario, id_post]
    );
    return result.rows[0];
};

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

const getLikeCountByPost = async (id_post) => {
    const result = await pool.query(
        `SELECT COUNT(*) AS total_curtidas FROM curtidas WHERE id_post = $1`,
        [id_post]
    );
    return result.rows[0];
};

const getLikeCountByCommentId = async (id_comentario) => {
    const result = await pool.query(
        `SELECT COUNT(*) AS total_curtidas FROM curtidas WHERE id_comentario = $1`,
        [id_comentario]
    );
    return result.rows[0];
};


const updateLikes = async (id_curtida, id_usuario, id_comentario, id_post) => {
    const result = await pool.query(
        `UPDATE curtidas SET id_usuario = $1, id_comentario = $2, id_post = $3 WHERE id_curtida = $4 RETURNING *`,
        [id_usuario, id_comentario, id_post, id_curtida]
    );
    return result.rows[0];
};

const deleteLikes = async (id) => {
    const result = await pool.query("DELETE FROM curtidas WHERE id_curtida = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Curtida não encontrada." };
    }
    return { message: "Curtida deletada com sucesso." };
};

module.exports = { getLikes, getLikesById, deleteLikes, updateLikes, createLikes, getLikeCountByPost, getLikeCountByCommentId };
