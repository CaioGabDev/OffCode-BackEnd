const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');


router.get('/comment', CommentController.getAllComments);
router.get('/comment/:id', CommentController.getCommentById);
router.delete('/comment/:id', CommentController.deleteComment);
router.put('/comment/:id', CommentController.updateComment);
router.post('/comment', CommentController.createComment);

module.exports = router;