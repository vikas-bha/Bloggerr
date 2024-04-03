const User = require("../models/User")
 
const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs")

 const createUser = async(req,res)=>{
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

 const loginUser = async(req, res)=>{

    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
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
    
        res.status(200).cookie("token", token).json({ message: 'Login successful', user });
      } catch (error) {
        res.status(500).json({ message: 'Failed to login', error: error.message });
      }
 
    
}

 const getUser = async()=>{

}

module.exports= {createUser, loginUser, getUser}