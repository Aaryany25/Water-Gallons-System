import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema = new Schema({
    Name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Schema.Types.ObjectId,
        ref:"Address"
    },
    orders:{
        type:Schema.Types.ObjectId,
        ref:"Order"
    }
},{timestamps:true})

UserSchema.pre("save",async function(){
if(!this.isModified("password")) return next(); 
// Hashing the password
this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, password )
}

export const User = mongoose.model("User",UserSchema)