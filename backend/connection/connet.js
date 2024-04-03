const mongoose = require("mongoose")

 const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "Blog",
}).then((c)=>console.log(`database connected wth ${c.connection.host}`))
  .catch((error)=>console.log("error"));
}

module.exports= connectDB;