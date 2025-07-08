const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res.status(400).json({ message: "Please enter your full name" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please enter your email address" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter your password" });
  }
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({ error: true, message: "User already exist" });
  }
  const user = new User({ fullName, email, password });
  await user.save();
  
  const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
  return res.json({ error: false, user, accessToken, message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter email address" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please enter password" });
  }
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const accessToken = jwt.sign({user:userInfo}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });
    return res.json({ error: false, message: "Login Succesful", email, accessToken });
  } else {
    return res.status(400).json({ message: "Invalid Credentials", error: true });
  }
}; 