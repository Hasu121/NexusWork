const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const CommentController = require('../controller/comment');

router.delete('/:commentId', Authentication.auth, CommentController.deleteComment);

router.post('/', Authentication.auth, CommentController.createComment);
router.get('/:postId', CommentController.getComments);
router.put('/:commentId', Authentication.auth, CommentController.editComment);


module.exports = router;