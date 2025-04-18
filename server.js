require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const likeRoutes = require("./src/routes/likeRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", likeRoutes );
app.use("/api", postRoutes);
app.use("/api", commentRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});