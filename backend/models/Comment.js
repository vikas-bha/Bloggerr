const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  blogId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Blog', 
  },
  text: {
    type: String,
    required: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  commentedAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

commentSchema.pre('find', function (next) {
  this.populate({
    path: 'replies',
    populate: {
      path: 'postedBy',
    },
  });
  next();
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
