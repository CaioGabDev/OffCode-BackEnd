const express = require('express');

const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/", likeController.getAllLikes);
router.post("/", likeController.createLike);
router.delete("/:id", likeController.deleteLike);
router.put("/:id", likeController.updateLike);
router.get("/:id", likeController.getLikeById);

module.exports = router;