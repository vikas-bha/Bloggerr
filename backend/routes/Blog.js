const express = require("express");

const {createBlog, getAllBlogs, getBlogById} = require("../controllers/BlogController")
const isAuthenticated = require("../middlewares/auth")
const {createComment , getAllReplies, addReply} = require("../controllers/CommentController");


const router = express.Router();


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.', 400), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });



router.post("/add", isAuthenticated, upload.single("coverImage"),createBlog);
router.get("/bulk", isAuthenticated,getAllBlogs);
router.get("/:id",isAuthenticated, getBlogById );
router.post("/comment/:blogId", isAuthenticated, createComment);

router.post("/:blogId/reply/:commentId", isAuthenticated, createComment)
router.get("/:blogId/replies", isAuthenticated, getAllReplies);

module.exports= router