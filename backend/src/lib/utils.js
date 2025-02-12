
import jwt from 'jsonwebtoken';

export const generateToken = (userId,res)=>{
 const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: '7d',
 });

 res.cookie("jwt",token,{
    httpOnly:true, // prevent xss attack
    maxAge: 7 * 24 * 60 * 60 * 1000, //Ms
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== "devlopment", // only works on https
 });
 return token
}