const pool = require("../config/database");

const getComments = async (conteudo_comentario) => {
    if (!conteudo_comentario) {
        const result = await pool.query("SELECT * FROM comentarios WHERE id_post = $1", [`%${conteudo_comentario}`]);
        return result.rows;
} else {
        const result = await pool.query("SELECT * FROM comentarios");
        return result.rows;
}
};

const getCommentById = async (id) => {
    const result = await pool.query("SELECT * FROM comentarios WHERE id_comentario = $1", [id]);
    return result.rows[0];
};

const deleteComment = async (id) => {
    const result = await pool.query("DELETE FROM comentarios WHERE id_comentario = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Comentário não encontrado." };
    }
    return { message: "Comentário deletado com sucesso." };
};

const updateComment = async (id, data) => {
    const { conteudo_comentario, anexo, data_publicacao } = data;
    const result = await pool.query(
        `UPDATE comentarios 
         SET conteudo_comentario = $1, anexo = $2, data_publicacao = $3 
         WHERE id_comentario = $4 
         RETURNING *`,
        [conteudo_comentario, anexo, data_publicacao, id]
    );
    return result.rows[0];
};

const createComment = async (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) => {
    const result = await pool.query(
        `INSERT INTO comentarios 
         (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [id_usuario, id_post, conteudo_comentario, anexo, data_publicacao]
    );
    return result.rows[0];
};

module.exports = { getComments, getCommentById, deleteComment, updateComment, createComment };