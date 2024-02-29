const jwt = require('jsonwebtoken');
const { verifyToken } = require('./jwt'); 
const profileSchema  = require("../models/userSchema")

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message:"Invalid or expired session, please login"});
    }

    try {

        const decoded = verifyToken(token);

        // Check the database for the user
        const user = await profileSchema.findOne({ email: decoded.email });

        if (!user) {
           return res.status(401).json({message:"Invalid or expired session, please login"});
        }

        // Validate token expiration
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp <= currentTimestamp) {
             return res.status(401).json({message:"Invalid or expired session, please login"});
        }

        
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return  res.status(403).json({message:"Something went wrong, please try again"});
    }
};

module.exports =  authenticateToken 
