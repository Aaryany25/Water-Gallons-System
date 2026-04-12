import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./src/db/connectDB.js";
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


// app.get("/",(req,res)=>{
//     res.json("Server chal rha hai ")
// })
// app.post("/signin"(req,res)=>{
//     const{username,email,password} = req.body;

//     res.status(200).json({
//         message:"User account created"
//     })
// })