import express from "express"
// import { configDotenv } from "dotenv"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))


import UserRouter from "./routes/User.Routes.js"

app.use("/user",UserRouter)
app.get("/user",(req,res)=>{
    res.send({
        message:"Working tll here"
    })
})
export {app}