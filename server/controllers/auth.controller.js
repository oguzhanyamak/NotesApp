const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const {fullName, email, password} = req.body;
    if (!fullName) {
        return res.status(400).json({error: true, message: "Full name is required."});
    }
    if (!email) {
        return res.status(400).json({error: true, message: "Email address is required."});
    }
    if (!password) {
        return res.status(400).json({error: true, message: "Password is required."});
    }
    try {
        const isUser = await User.findOne({email: email});
        if (isUser) {
            return res.status(409).json({error: true, message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({fullName, email, password: hashedPassword});
        await user.save();

        const payload = { _id: user._id, email: user.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10h"});
        return res.status(201).json({error: false, user: payload, accessToken, message: "User created successfully."});
    } catch (err) {
        return res.status(500).json({error: true, message: "Internal server error.", details: err.message});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email) {
        return res.status(400).json({error: true, message: "Email address is required."});
    }
    if (!password) {
        return res.status(400).json({error: true, message: "Password is required."});
    }
    try {
        const userInfo = await User.findOne({email: email});
        if (!userInfo) {
            return res.status(404).json({error: true, message: "User not found."});
        }
        const isMatch = await bcrypt.compare(password, userInfo.password);
        if (isMatch) {
            const payload = { _id: userInfo._id, email: userInfo.email };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10h"});
            return res.status(200).json({error: false, message: "Login successful.", email, accessToken});
        } else {
            return res.status(401).json({error: true, message: "Invalid credentials."});
        }
    } catch (err) {
        return res.status(500).json({error: true, message: "Internal server error.", details: err.message});
    }
};