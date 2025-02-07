import express from "express"
import QRCode from "qrcode"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/generate", authenticateToken, async (req, res) => {
  try {
    const botUrl = `https://yourdomain.com/chat/${req.userId}`
    const qrCode = await QRCode.toDataURL(botUrl)
    res.json({ qrCode })
  } catch (error) {
    res.status(500).json({ message: "Error generating QR code" })
  }
})

export default router

