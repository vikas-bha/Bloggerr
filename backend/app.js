require('dotenv').config()

const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const PORT = process.env.PORT || 3000;


const UserRoutes = require("./routes/User")
const BlogRoutes = require("./routes/Blog")
const  connectDB  = require('./connection/connet');



app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/blogs", BlogRoutes);


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });