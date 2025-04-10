const pool = require("../config/database");


const getLikes = async () => {
    const result = await pool.query("SELECT * FROM curtidas");
    return result.rows;
};

const deleteUsers = async (id) => {
    const result = await pool.query("DELETE FROM curtidas WHERE id_curtidas = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    return { message: "Usuário deletado com sucesso." };
};


const createUsers = async (id_usuario, id_comentario, id_post, quantidade_curtidas ) => {
    const result = await pool.query("INSERT INTO curtidas VALUES ($1, $2, $3, $4) RETURNING *", [id_usuario, id_comentario, id_post, quantidade_curtidas]);
    return result.rows[0];
};