const express = require('express');

const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/like", likeController.getAllLikes);
router.post("/like", likeController.createLike);
router.delete("/like/:id", likeController.deleteLike);
router.put("/like/:id", likeController.updateLike);
router.get("/like/:id", likeController.getLikeById);

module.exports = router;