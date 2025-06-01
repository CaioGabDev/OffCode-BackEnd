const pool = require("../config/database");

const getComments = async (conteudo_comentario) => {
    if (conteudo_comentario) {
        const result = await pool.query(
            "SELECT * FROM comentarios WHERE conteudo_comentario ILIKE $1",
            [`%${conteudo_comentario}%`]
        );
        return result.rows.length ? result.rows : { message: 'Nenhum comentário encontrado com esse conteúdo.' };
    } else {
        const result = await pool.query("SELECT * FROM comentarios");
        return result.rows.length ? result.rows : { message: 'Nenhum comentário encontrado.' };
    }
};

const getCommentById = async (id) => {
    const result = await pool.query("SELECT * FROM comentarios WHERE id_comentario = $1", [id]);
    return result.rows.length ? result.rows[0] : { message: "Comentário não encontrado." };
};

const getCommentsByPostId = async (id_post) => {
  const result = await pool.query(`
    SELECT 
      c.id_comentario, c.id_usuario, c.id_post, c.conteudo_comentario, c.anexo, c.data_publicacao,
      u.username, u.foto_perfil
    FROM comentarios c
    JOIN usuarios u ON c.id_usuario = u.id_usuario
    WHERE c.id_post = $1
    ORDER BY c.data_publicacao ASC
  `, [id_post]);
  return result.rows.length ? result.rows : { message: 'Nenhum comentário encontrado para este post.' };
};

const updateComment = async (id, data) => {
    const { conteudo_comentario, anexo, data_publicacao } = data;
    const result = await pool.query(
        `UPDATE comentarios SET conteudo_comentario = $1, anexo = $2, data_publicacao = $3 WHERE id_comentario = $4 RETURNING *`,
        [conteudo_comentario, anexo || null, data_publicacao, id]
    );
    return result.rows[0];
};

const createComment = async (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) => {
    const result = await pool.query(
        `INSERT INTO comentarios (id_usuario, id_post, conteudo_comentario, anexo, data_publicacao) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [id_usuario, id_post, conteudo_comentario, anexo || null, data_publicacao]
    );
    return result.rows[0];
};

const deleteComment = async (id) => {
    const result = await pool.query("DELETE FROM comentarios WHERE id_comentario = $1 RETURNING *", [id]);
    return result.rowCount ? { message: "Comentário deletado com sucesso.", deleted: result.rows[0] } : { error: "Comentário não encontrado." };
};

module.exports = { getComments, getCommentById, getCommentsByPostId, deleteComment, updateComment, createComment };
