import jwt from "jsonwebtoken"; 
import {APIerror} from "../utils/APIerror.js";
import {User} from "../models/user.models.js"
import {AsyncHandler} from "../utils/AsyncHandler.js"
export const VerifyToken = AsyncHandler(async (req,res,next)=>{
    try {
        
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new APIerror(401,"Unauthorised")
        }

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded._id).select("-password -refreshToken")

        if(!user){
            throw new APIerror(401,"Invalid user")
        }

        req.user = user
        next()
    } catch (error) {
        throw new APIerror(401,error.message)
    }
})