const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');


const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json({ message: 'Blogs retrieved successfully', blogs });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve blogs', error: error.message });
    }
  };

  const getBlogById = async (req, res) => {
    // try {
    //   const blog = await Blog.findById(req.params.id);
    //   if (!blog) {
    //     return res.status(404).json({ message: 'Blog not found' });
    //   }
    //   res.status(200).json({ message: 'Blog retrieved successfully', blog });
    // } catch (error) {
    //   res.status(500).json({ message: 'Failed to retrieve blog', error: error.message });
    // }
    try {
      const blog = await Blog.findById(req.params.id).populate({
        path: 'comments',
        populate: {
          path: 'replies',
          // populate: {
          //   path: 'replies',
          //   populate: {
          //     path: 'replies',
          //     // Add more nested populate calls as needed for deeper nesting
          //   }
          // }
        }
      }).exec();
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog retrieved successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve blog', error: error.message });
    }

  };


  const createBlog = async (req, res) => {
    try {
      const { title, body, coverImageURL } = req.body;
      
      const createdBy = req.userId; // Get user ID from decoded token
  
      const blog = new Blog({ title, body, coverImageURL, createdBy });
      await blog.save();
  
      res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog', error: error.message });
    }
  };
  
module.exports={getAllBlogs, getBlogById, createBlog}


