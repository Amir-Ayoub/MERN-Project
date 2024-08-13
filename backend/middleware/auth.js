import { response } from "express"
import jwt from "jsonwebtoken"

const authMiddleware =async(req,response,next) => {
   const {token} =req.headers;
   if(!token){
    return response.json({success:false,message:"Not Authorized Login Again"})
   }
   try {
    const token_decode =jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId =token_decode.id;
    next();
   } catch (error) {
      console.log(error);    
      response.json({success:false,message:"Error"})
   }
}


export default authMiddleware;

