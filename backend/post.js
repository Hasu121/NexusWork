const PostModel = require('../models/post');

// Add a new post
exports.addPost = async (req, res) => {
    try {
        const { desc, imageLink } = req.body;
        const newPost = new PostModel({
            user: req.user._id, // assuming Authentication middleware sets req.user
            desc,
            imageLink,
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
};

// Like or dislike a post
exports.likeDislikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user._id;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const index = post.likes.indexOf(userId);
        let action;
        if (index === -1) {
            post.likes.push(userId);
            action = 'liked';
        } else {
            post.likes.splice(index, 1);
            action = 'disliked';
        }
        await post.save();

        // Recalculate totalPostLikes for post owner
        const PostOwner = require('../models/user');
        const owner = await PostOwner.findById(post.user);
        if (owner) {
            const allPosts = await PostModel.find({ user: owner._id });
            owner.totalPostLikes = allPosts.reduce((acc, p) => acc + (Array.isArray(p.likes) ? p.likes.length : 0), 0);
            await owner.save();
        }

        return res.json({ message: `Post ${action}` });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        let posts = await PostModel.find().sort({createdAt: -1}).populate('user', '-password');
        res.status(200).json({
            message: 'Fetched Data Successfully',
            posts:posts
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
};


exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).populate('user', '-password');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({
            message: 'Fetched Data Successfully',
            post:post
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message:err.message});
    }
}


exports.getTop5Posts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId }).sort({ createdAt: -1 }).populate('user').limit(5);
        return res.status(200).json({
            message: 'Fetched Data Successfully',
            posts: posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};


exports.getAllPostsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId }).sort({ createdAt: -1 }).populate('user');
        return res.status(200).json({
            message: 'Fetched Data Successfully',
            posts: posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};


exports.deletePost = async (req, res) => {
    try {
        const db = require('../utils/DatabaseConnection');
        const { postId } = req.params;
        await db.connect();
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Only post owner can delete
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: Only post owner can delete' });
        }
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

// Edit post text by post owner
exports.editPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { desc } = req.body;
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Only post owner can edit
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: Only post owner can edit' });
        }
        post.desc = desc;
        await post.save();
        return res.status(200).json({ message: 'Post updated successfully', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};