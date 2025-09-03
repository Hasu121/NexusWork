const CommentModel = require('../models/comment');
const PostModel = require('../models/post');
const NotificationModel = require('../models/notification');


exports.createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.user._id;

        const postExist = await PostModel.findById(postId).populate('user');
        if (!postExist) {
            return res.status(404).json({ error: "Post not found" });
        }

        postExist.comments = (postExist.comments || 0) + 1;
        await postExist.save();

        const newComment = new CommentModel({ user: userId, post: postId, comment });
        await newComment.save();

        const populateComment = await CommentModel.findById(newComment._id).populate('user', 'f_name headline profile_pic');

        const content = `${req.user.f_name} has commented on your post`;
        const notification = new NotificationModel({sender:userId, receiver:postExist.user._id, content,type:'comment', postId: postId.toString()});
        await notification.save();

        return res.status(201).json({
            message: 'Comment created successfully',
            comment: populateComment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating comment" });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const isPostExist = await PostModel.findById(postId);

        if (!isPostExist) {
            return res.status(404).json({ message: "No such post found" });
        }
        const comments = await CommentModel.find({ post: postId }).sort({ createdAt: -1 }).populate('user', 'f_name headline profile_pic');
        return res.status(200).json({
            message: 'Comments fetched successfully',
            comments: comments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching comments" });
    }
};

// Edit a comment by its owner
exports.editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const commentDoc = await CommentModel.findById(commentId);
        if (!commentDoc) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        // Only comment owner can edit
        if (commentDoc.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: Only comment owner can edit' });
        }
        commentDoc.comment = comment;
        await commentDoc.save();
        return res.status(200).json({ message: 'Comment updated successfully', comment: commentDoc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }
        await comment.deleteOne();
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting comment" });
    }
};