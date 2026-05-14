import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

import UserRouter from "./routes/User.Routes.js"
import AddressRouter from "./routes/Address.Routes.js"
import OrderRouter from "./routes/Order.Routes.js"

app.use("/api/v1/user", UserRouter)
app.use("/api/v1/address", AddressRouter)
app.use("/api/v1/order", OrderRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.error || [];

  // Handle Mongoose/MongoDB specific errors
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map(e => e.message);
  } else if (err.code === 11000) {
    status = 409;
    message = "User already exists with this email";
  }

  res.status(status).json({
    success: false,
    status,
    message,
    errors,
  });
});

export { app }
