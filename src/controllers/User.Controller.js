import { User } from "../models/user.models.js"
import { APIerror } from "../utils/APIerror.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { APIresponse } from "../utils/APIresponse.js"

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
const RegisterUser = AsyncHandler(async(req,res)=>{
// taking the Name and Email from the frontend 
// Check if email or name is empy or not 
// Check if user exist with email id or not 
// create an object in the db 
// Check if the user is created 
// remove the password and send the response to the user 

const {name,email,password} = req.body
if(
    [name,email,password].some((field)=>field?.trim()==="")
){
    throw new APIerror(400,"All field Required"
    )
}
const ExistUser = await User.findOne({email})

if(ExistUser){
    throw new APIerror(409,"User Already Exist")
}

const user = await User.create({
    name,
    email,
    password
})
const CreatedUser = await User.findById(user._id).select("-password -refreshToken")

if(!CreatedUser){
     throw new APIerror(500,"Cant Registed the User")
}
return res.status(201).json(
    new APIresponse(201,CreatedUser,"User Created Successfully !")
)

})


const LoginUser =AsyncHandler( async(req,res)=>{
// Take email and password from frontend
const {email,password} = req.body
if(!email){
    throw new APIerror(409,"Email is Required")
}
// Check if the User exist in db or not 
const existUser = await User.findOne({email})
if(!existUser){
    throw new APIerror(404,"User not found")
}
// Check if the password user provided is correct or not 
const CorrectPassword =  await existUser.isPasswordCorrect(password)

if(!CorrectPassword){
    throw new APIerror(401,"Enter Correct Password")
}
// generate accesstoken and refreshtoken
 const {accesstoken,refreshtoken} = await generateTokens(existUser._id)
// Fetching the updatded User from the Model 
const LoggedInUser = await User.findById(existUser._id).select("-password -refreshToken")


// Setting up the cookies 
const options={
    httpOnly:true,
    secure:true
} //This will not allow cookies to be modified from Client side
return res
.status(200)
.cookie("accesstoken",accesstoken,options)
.cookie("refreshtoken",refreshtoken,options)
.json(
    new APIresponse(200,{
        user:LoggedInUser,accesstoken,refreshtoken
    },"User LoggedIn Successfully")
)
})

const LogoutUser=AsyncHandler(async(req,res)=>{
    // Get the UserId from req.user
const userId = req.user._id
    // Update the DB by Removing the refreshToken
    await User.findByIdAndUpdate(userId,{
        $set:{
            refreshToken:undefined
        }
    })

    const options={
        httpOnly:true,
        secure:true
    }
    res.status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(
        new APIresponse(200,"user LoggedOut Successfully 1")
    )

// Unset the Cookies

})

const CurrentUser = AsyncHandler(async(req,res)=>{
    if(!req?.user || !req.headers){
        throw new APIerror(401,"You are Logout")
    }
    res.status(200).json(
        new APIresponse(200,req?.user)
    )
})

const UpdateUser = AsyncHandler(async(req,res)=>{
    const {name,email}= req.body
    if(!name || !email){
        throw new APIerror(401,"Field is Required")
    }
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            name,
            email
        }
    },{
        new:true
    })
    res.status(200).json(
        new APIresponse(200,"User Detials Updated Successfully")
    )
})
export {RegisterUser,LoginUser,LogoutUser,CurrentUser,UpdateUser}