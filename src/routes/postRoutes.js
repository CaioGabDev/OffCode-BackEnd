const express = require('express');

const router = express.Router();

const postController = require("../controllers/postControllers");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;