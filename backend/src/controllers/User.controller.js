import { User } from "../models/user.models.js"
import { APIerror } from "../utils/APIerror.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { APIresponse } from "../utils/APIresponse.js"
import { userLoginSchema, userRegisterSchema } from "../validators/user.schema.js"

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
}

const generateTokens = async(userId)=>{

    try {
        const user = await User.findById(userId)
        const accesstoken = await user.generateAccesstoken()
        const refreshtoken = await user.generateRefreshToken()
        user.refreshToken = refreshtoken
        await user.save({validateBeforeSave: false })
 return {accesstoken, refreshtoken}
    } catch (error) {
       throw new APIerror(500,error.message) 
    }
}
const registerUser = AsyncHandler(async(req,res)=>{
    const validation = userRegisterSchema.safeParse(req.body);
    
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const {name, email, password, phone} = validation.data;

    const existUser = await User.findOne({email})

    if(existUser){
        throw new APIerror(409,"User Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,
        phone
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
         throw new APIerror(500,"Cant Registed the User")
    }

    return res.status(201).json(
        new APIresponse(201,createdUser,"User Created Successfully !")
    )
})


const loginUser = AsyncHandler( async(req,res)=>{
    const validation = userLoginSchema.safeParse(req.body);
    
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const {email, password} = validation.data;

    const existUser = await User.findOne({email})
    if(!existUser){
        throw new APIerror(404,"User not found")
    }

    const correctPassword =  await existUser.isPasswordCorrect(password)

    if(!correctPassword){
        throw new APIerror(401,"Enter Correct Password")
    }

    const {accesstoken,refreshtoken} = await generateTokens(existUser._id)
    const loggedInUser = await User.findById(existUser._id).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accesstoken",accesstoken,cookieOptions)
    .cookie("refreshtoken",refreshtoken,cookieOptions)
    .json(
        new APIresponse(200,{
            user:loggedInUser,accesstoken,refreshtoken
        },"User LoggedIn Successfully")
    )
})

const logoutUser = AsyncHandler(async(req,res)=>{
    const userId = req.user._id
    await User.findByIdAndUpdate(userId,{
        $set:{
            refreshToken:undefined
        }
    })

    res.status(200)
    .clearCookie("accesstoken",cookieOptions)
    .clearCookie("refreshtoken",cookieOptions)
    .json(
        new APIresponse(200,"user LoggedOut Successfully 1")
    )
})

const getCurrentUser = AsyncHandler(async(req,res)=>{
    if(!req?.user){
        throw new APIerror(401,"You are logged out")
    }
    res.status(200).json(
        new APIresponse(200,req?.user)
    )
})

const updateUser = AsyncHandler(async(req,res)=>{
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        throw new APIerror(400,"Name, email, and phone number are required")
    }

    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            name,
            email,
            phone
        }
    },{
        new:true
    })
    res.status(200).json(
        new APIresponse(200,"User details updated successfully")
    )
})
const getAllUser = AsyncHandler(async(req,res)=>{
    const users = await User.find().select("-password -refreshToken")
    res.status(200).json(
        new APIresponse(200,users,"All users fetched successfully")
    )
})
export {registerUser, loginUser, logoutUser, getCurrentUser, updateUser,getAllUser}
