const Blog = require('../models/Blog');
const User = require("../models/User")
const Comment = require('../models/Comment');

 const createComment = async (req, res) => {
    try {
      const { blogId,commentId } = req.params;
      console.log(req.params);
      const { text } = req.body;
      console.log(req.body);
      console.log(text);
      const postedBy = req.userId; // Get user ID from decoded token
      console.log("these are the two ID's of the request ",blogId, commentId);
  
     
      const comment = new Comment({ text, blogId, parentComment: commentId, postedBy });

      await comment.save();

      const blog = await Blog.findById(blogId);
      console.log(blog)
      blog.comments.push(comment._id);
      await blog.save();
      console.log(blog)

      const parentCommentUpdate =  await Comment.findById(commentId);
      console.log(" this is the parentCommentUpdate",parentCommentUpdate)
      parentCommentUpdate.replies?.push(comment._id);
      await parentCommentUpdate.save();
      res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
  };

//   const getCommentById = async (req, res) => {
//     try {
//         const { commentId } = req.params;
//           console.log(commentId);
//         const comment = await Comment.findById(commentId);
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found' });
//         }

//         res.status(200).json({ message: 'Comment found', comment });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch comment', error: error.message });
//     }
// };


const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await fetchCommentWithReplies(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment found', comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comment', error: error.message });
  }
};

const fetchCommentWithReplies = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return null;
  }
  const replies = await Promise.all(comment.replies.map(replyId => fetchCommentWithReplies(replyId)));
  return { ...comment.toJSON(), replies };
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
  
  
  
module.exports = { getAllReplies, createComment, getCommentById};