const { Schema, model } = require('mongoose');
const replySchema = Schema({

  postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Blog', 
  },
  text: {
      type: String,
      required: true
  },

  username: {
      type: String
  },
  // Nested replies
  replies: [this]
});

const blogSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      coverImageURL: {
        type: String,
        required: false,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Use singular 'User' for model reference
      },
      comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      }],
      // replies : [replySchema]
  
    },
    { timestamps: true }
  );
  

  const Blog = model('Blog', blogSchema);
  
  module.exports = Blog;
  