const express = require("express");

const {createUser, loginUser, getUser, logoutUser} = require("../controllers/UserController")
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


router.post("/create", upload.single('profileImage'),createUser);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)


module.exports= router