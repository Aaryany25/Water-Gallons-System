import express from "express"
// import { configDotenv } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))
app.use(cookieParser())

import UserRouter from "./routes/User.Routes.js"


app.use("/user",UserRouter)

export {app}