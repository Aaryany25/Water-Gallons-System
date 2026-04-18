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
import AddressRouter from "./routes/Address.Routes.js"

app.use("/api/v1/user",UserRouter)
app.use("/api/v1/address",AddressRouter)
export {app}