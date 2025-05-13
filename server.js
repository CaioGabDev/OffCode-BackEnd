require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const likeRoutes = require("./src/routes/likeRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const setupSwagger = require('./src/config/swagger');
const upload = require("./src/config/upload");
const path = require("path");



const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post('/uploads', upload.single("anexo"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
    res.status(200).json({ message: "Arquivo enviado com sucesso", file: req.file });
});
app.use("/api", userRoutes);
app.use("/api", likeRoutes );
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", reportRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});