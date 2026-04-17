import mongoose,{Schema} from "mongoose";

const OrderSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    address:{
        type:Schema.Types.ObjectId,
        ref:"Address"
    },
    gallons:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["pending", "confirmed", "delivered", "cancelled"],
        default:"pending"
    },
     deliveryTime: {
      type: Date,
      required: true,
    },

    note: {
      type: String,
      trim: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },
},{timestamps:true})

export const Order = mongoose.model("Order",OrderSchema)