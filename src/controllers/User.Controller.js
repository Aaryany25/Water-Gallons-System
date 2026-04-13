import { User } from "../models/user.models.js"
import { APIerror } from "../utils/APIerror.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { APIresponse } from "../utils/APIresponse.js"
const RegisterUser = async (req,res) =>{
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

}

export {RegisterUser}