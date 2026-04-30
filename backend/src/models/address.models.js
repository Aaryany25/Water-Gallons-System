import mongoose,{Schema} from "mongoose";

const AddressSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index: true,
    },
    roomNo:{
        type:String,
        required:true,
        trim:true
    },
    building:{
        type:String,
        required:true,
        trim:true
    },
    street:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
},
pincode:{
   type: String,
  required: true,
  trim: true,
  
},
    isDefault:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

export const Address = mongoose.model("Address",AddressSchema)