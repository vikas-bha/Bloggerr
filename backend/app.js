require('dotenv').config()

const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const PORT = process.env.PORT || 3000;


const UserRoutes = require("./routes/User")
const BlogRoutes = require("./routes/Blog")
const CommentRoutes = require("./routes/Comment")
const  connectDB  = require('./connection/connet');



app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/blogs", BlogRoutes);
app.use("/api/v1/comments",CommentRoutes);


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });