import express from "express"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/configure", authenticateToken, async (req, res) => {
  try {
    const { name, welcomeMessage, faqResponses } = req.body
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    user.botConfig = { name, welcomeMessage, faqResponses }
    await user.save()
    res.json({ message: "Bot configuration saved successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error saving bot configuration" })
  }
})

export default router

