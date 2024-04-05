const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const { getCommentById } = require("../controllers/CommentController");
const router = express.Router();

// isAuthenticated

router.get("/:commentId",  isAuthenticated,getCommentById);


module.exports = router;