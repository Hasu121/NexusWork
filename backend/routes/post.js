const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const PostController = require('../controller/post');

router.post('/', Authentication.auth, PostController.addPost);
router.post('/likeDislike', Authentication.auth, PostController.likeDislikePost);
router.get('/getAllPost', PostController.getAllPosts);

router.get('/getPostById/:postId', PostController.getPostById);

router.get('/getTop5Post/:userId', PostController.getTop5Posts);

router.get('/getAllPostsForUser/:userId', PostController.getAllPostsForUser);

module.exports = router;