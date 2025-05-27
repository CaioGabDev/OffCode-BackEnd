const pool = require("../config/database");

const getDuvidas = async (conteudo) => {
    if (!conteudo) {
        const result = await pool.query(`
            SELECT duvidas.*, usuarios.nome AS usuario_nome 
            FROM duvidas 
            LEFT JOIN usuarios ON duvidas.id_usuario = usuarios.id_usuario
        `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT duvidas.*, usuarios.nome AS usuario_nome 
            FROM duvidas 
            LEFT JOIN usuarios ON duvidas.id_usuario = usuarios.id_usuario 
            WHERE duvidas.conteudo_duvida ILIKE $1
        `, [`%${conteudo}%`]);
        return result.rows;
    }
};

const getDuvidaById = async (id) => {
    const result = await pool.query(`
        SELECT duvidas.*, usuarios.nome AS usuario_nome 
        FROM duvidas 
        LEFT JOIN usuarios ON duvidas.id_usuario = usuarios.id_usuario 
        WHERE duvidas.id_duvida = $1
    `, [id]);
    return result.rows[0];
};

const createDuvida = async (conteudo_duvida, anexo, id_usuario) => {
    const result = await pool.query(`
        INSERT INTO duvidas (conteudo_duvida, anexo, data_publicacao, id_usuario) 
        VALUES ($1, $2, CURRENT_DATE, $3) 
        RETURNING *
    `, [conteudo_duvida, anexo, id_usuario]);
    return result.rows[0];
};

const updateDuvida = async (id_duvida, conteudo_duvida, anexo) => {
    const result = await pool.query(`
        UPDATE duvidas SET conteudo_duvida = $1, anexo = $2 
        WHERE id_duvida = $3 
        RETURNING *
    `, [conteudo_duvida, anexo, id_duvida]);
    return result.rows[0];
};

const deleteDuvida = async (id_duvida) => {
    const result = await pool.query(`
        DELETE FROM duvidas WHERE id_duvida = $1 
        RETURNING *
    `, [id_duvida]);
    if (result.rowCount === 0) {
        return { error: "Dúvida não encontrada." };
    }
    return { message: "Dúvida deletada com sucesso." };
};

module.exports = { getDuvidas, getDuvidaById, createDuvida, updateDuvida, deleteDuvida };
