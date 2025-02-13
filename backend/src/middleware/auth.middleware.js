import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookie.jwt;
        if (!token) {
            return res.status(401).json({message:"Unauthroized -- No token provided"});
        }

        const decoded = jwt.verify(process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({message:"Unauthroized -- Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({message:"Unauthroized -- User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("Error in protected middleware",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}