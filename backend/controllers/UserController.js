const User = require("../models/User")
 
const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs")

//  const createUser = async(req,res)=>{
//     try {
//         const { fullName, email, password, profileImageURL } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    
//         const user = new User({ fullName, email, password: hashedPassword, profileImageURL });
//         await user.save();
    
//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//         res.status(201).json({ message: 'User created successfully', user, token });
//       } catch (error) {
//         res.status(500).json({ message: 'Failed to create user', error: error.message });
//       }
// }

//  const loginUser = async(req, res)=>{

//     try {
//         const { email, password } = req.body;
    
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//         }
    
//         // Compare the provided password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//           return res.status(401).json({ message: 'Invalid email or password' });
//         }
    
//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//         res.status(200).cookie("token", token).json({ message: 'Login successful', user });
//       } catch (error) {
//         res.status(500).json({ message: 'Failed to login', error: error.message });
//       }
 
    
// }


const createUser = async (req, res) => {
  try {
      const { fullName, email, password, profileImageURL } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  
      const user = new User({ fullName, email, password: hashedPassword, profileImageURL });
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      console.log(email,password);
      console.log("login user reached");
      // Find the user by email
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
     
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error.message });
  }
}



 const getUser = async(req, res)=>{

 try {
  const {id} = req.params;
  const user = await User.findById(id);
  res.status(200).json({message : "user retrieved successfully", user});
 } catch (error) {
  
  res.status(404).json({message : "user doesn't exist", error : error.message});
 }



}

// const logoutUser = async (req, res) => {
//   try {
//     // Clear the token cookie by setting an expired date
//     res.cookie('token', '', { expires: new Date(0) });
//     jwt
//     res.status(200).json({ message: 'Logout successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to logout', error: error.message });
//   }
// };

const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie by setting an expired date
    // res.cookie('token', '', { expires: new Date(0) });
    // Since you're not using cookies, you can just send an empty response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to logout', error: error.message });
  }
};


module.exports= {createUser, loginUser, getUser, logoutUser}