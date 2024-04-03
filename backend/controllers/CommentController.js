const Comment = require('../models/Comment');

 const createComment = async (req, res) => {
    try {
      const { blogId,parentCommentId } = req.params;

      const { text } = req.body;
      const postedBy = req.userId; // Get user ID from decoded token
  
     
      const comment = new Comment({ text, blogId, parentComment: parentCommentId, postedBy });

      await comment.save();

      const parentCommentUpdate =  await Comment.findOne(parentCommentId);
      parentCommentUpdate.replies.push(comment._id);
      await parentCommentUpdate.save();
      res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
  };





  const getAllReplies = async (req, res) => {
    try {
      const { commentId } = req.params;
  
      // Function to recursively retrieve replies and nested replies
      const getReplies = async (commentId) => {
        const comment = await Comment.findById(commentId).populate('replies');
        if (!comment) {
          return null;
        }
        const nestedReplies = await Promise.all(comment.replies.map(replyId => getReplies(replyId)));
        return {
          _id: comment._id,
          text: comment.text,
          postedBy: comment.postedBy,
          commentedAt: comment.commentedAt,
          replies: nestedReplies.filter(reply => reply !== null)
        };
      };
  
      const replies = await getReplies(commentId);
      res.status(200).json({ message: 'Replies retrieved successfully', replies });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve replies', error: error.message });
    }
  };
  
  module.exports = getAllReplies;
  
module.exports = {createComment, getAllReplies};