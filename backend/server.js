import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import botRoutes from "./routes/bot.js"
import qrRoutes from "./routes/qr.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error))

app.use("/auth", authRoutes)
app.use("/bot", botRoutes)
app.use("/qr", qrRoutes)

app.listen(PORT, () => {
  console.log(`Back End is running on port ${PORT}!`);
  console.log('Back end is running');
})
