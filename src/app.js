import express from "express"
// import { configDotenv } from "dotenv"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
origin:process.env.CORS_ORIGIN,
credentials:true
}))


import UserRoute from "./routes/User.Routes.js"

app.use("/api/v1/auth",UserRoute)
export {app}