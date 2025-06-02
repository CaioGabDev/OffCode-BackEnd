const pool = require("../config/database");

const getPosts = async (conteudo) => {
    if (!conteudo) {
        const result = await pool.query(`
            SELECT posts.*, usuarios.nome AS usuario_nome, usuarios.foto_perfil,
            COUNT(curtidas.id_curtida) AS quantidade_curtidas
            FROM posts 
            LEFT JOIN usuarios ON posts.id_usuario = usuarios.id_usuario
            LEFT JOIN curtidas ON posts.id_post = curtidas.id_post
            GROUP BY posts.id_post, usuarios.nome, usuarios.foto_perfil
            ORDER BY posts.id_post ASC
        `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT posts.*, usuarios.nome AS usuario_nome, usuarios.foto_perfil,
            COUNT(curtidas.id_curtida) AS quantidade_curtidas
            FROM posts 
            LEFT JOIN usuarios ON posts.id_usuario = usuarios.id_usuario
            LEFT JOIN curtidas ON posts.id_post = curtidas.id_post
            WHERE posts.conteudo_post ILIKE $1
            GROUP BY posts.id_post, usuarios.nome, usuarios.foto_perfil
            ORDER BY posts.id_post DESC
        `, [`%${conteudo}%`]);
        return result.rows;
    }
};

const getPostById = async (id) => {
    const result = await pool.query(`
        SELECT posts.*, usuarios.nome AS usuario_nome, usuarios.foto_perfil,
        COUNT(curtidas.id_curtida) AS quantidade_curtidas
        FROM posts 
        LEFT JOIN usuarios ON posts.id_usuario = usuarios.id_usuario
        LEFT JOIN curtidas ON posts.id_post = curtidas.id_post
        WHERE posts.id_post = $1
        GROUP BY posts.id_post, usuarios.nome, usuarios.foto_perfil
        ORDER BY posts.id_post ASC
    `, [id]);
    return result.rows[0];
};

const createPost = async (conteudo_post, anexo, id_usuario) => {
    const result = await pool.query(`
        INSERT INTO posts (conteudo_post, anexo, data_publicacao, id_usuario) 
        VALUES ($1, $2, CURRENT_DATE, $3) 
        RETURNING *
    `, [conteudo_post, anexo, id_usuario]);
    return result.rows[0];
};

const updatePost = async (id_post, conteudo_post, anexo) => {
    const result = await pool.query(`
        UPDATE posts SET conteudo_post = $1, anexo = $2 
        WHERE id_post = $3 
        RETURNING *
    `, [conteudo_post, anexo, id_post]);
    return result.rows[0];
};

const deletePost = async (id_post) => {
    const result = await pool.query(`
        DELETE FROM posts WHERE id_post = $1 
        RETURNING *
    `, [id_post]);
    if (result.rowCount === 0) {
        return { error: "Post não encontrado." };
    }
    return { message: "Post deletado com sucesso." };
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
