const { format } = require("@fast-csv/format");

const UserModel = require("../models/UserModel");

const exportClientesCSV = async (req, res) => {
    try {
        const users = await UserModel.getUsers();

        res.setHeader("Content-Disposition", "attachment; filename=users.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        users.forEach((user) => {
            csvStream.write({
                id: user.id,
                name: user.name,
                idade: user.idade,
                foto: user.foto,
            });
        });
        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV" });
    }
};

module.exports = { exportClientesCSV };