import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
dotenv.config()

connectDB()
.then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("Server Started !")
})
})
.catch((error)=>{
console.log("Connection to MongoDB Server Failed!",error)
})


