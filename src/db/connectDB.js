import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connectDB = async ()=>{
    try {
      await  mongoose.connect(process.env.MONGODB_URL)
      console.log("Connected to MongoDb Successfully")
    } catch (error) {
        console.log("Connection to mo goDb Faile !!:",error)
        process.exit(1)
    }
}

export default connectDB
