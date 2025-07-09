const User = require("../models/user.model");

exports.getUser = async (req, res) => {
    const user = req.user;
    try {
        const isUser = await User.findOne({_id: user._id});
        if (!isUser) return res.status(404).json({error: true, message: "User not found."});
        return res.status(200).json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn
            },
            message: "User retrieved successfully.",
            error: false
        });
    } catch (err) {
        return res.status(500).json({error: true, message: "Internal server error.", details: err.message});
    }
}; 