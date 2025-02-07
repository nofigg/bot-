import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import botRoutes from "./routes/bot.js"
import qrRoutes from "./routes/qr.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
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
  console.log(`Server is running on port ${PORT}`)
})

