import mongoose from "mongoose"
const connectDB = async ()=>{
    try {
      await  mongoose.connect(process.env.MONGODB_URL)
      console.log("Connected to MongoDb Successfully")
    } catch (error) {
        console.log("Connection to mongoDb Faile !!:",error)
        process.exit(1)
    }
}

export default connectDB
