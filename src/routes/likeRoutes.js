const express = require('express');

const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/", likeController.getAllLikes);
router.post("/", likeController.createLike);
router.delete("/:id", likeController.deleteLike);

module.exports = router;