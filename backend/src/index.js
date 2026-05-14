import dotenv from "dotenv"
dotenv.config()
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB()
.then(()=>{
app.listen(process.env.PORT,()=>{
    console.log("Server Started !")
})
})
.catch((error)=>{
console.error("Connection to MongoDB Server Failed!",error)
})


