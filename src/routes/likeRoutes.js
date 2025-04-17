const express = require('express');

const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/like", likeController.getAllLikes);
router.post("/like", likeController.createLike);
router.delete("/like/:id", likeController.deleteLike);

module.exports = router;