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
        if (index === -1) {
            post.likes.push(userId);
            await post.save();
            return res.json({ message: 'Post liked' });
        } else {
            post.likes.splice(index, 1);
            await post.save();
            return res.json({ message: 'Post disliked' });
        }
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