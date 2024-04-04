const jwt = require("jsonwebtoken");
const User = require("../models/User")

const isAuthenticated = async (req, res, next) => {
  console.log(req.headers);
    let token = req.headers.token;
  
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // If token is not in cookies, check headers (e.g., for API clients)
        
        token = req.headers.authorization.split(' ')[1];
      }
    

    
    if (!token)
      return res.status(404).json({
        success: false,
        message: "Login First",
      });
  
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decoded.userId);
    req.userId = decoded.userId
    // we are saving the trying logged in user inside the req.user  and after that it gives us the profile of the logged in user when we call the next() function
    next();
  };

  module.exports= isAuthenticated