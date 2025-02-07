"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const QRPage: React.FC = () => {
  const [qrCode, setQRCode] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }
        const response = await axios.get("http://localhost:5000/qr/generate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setQRCode(response.data.qrCode)
      } catch (error) {
        console.error("Error fetching QR code:", error)
        alert("Failed to generate QR code. Please try again.")
      }
    }

    fetchQRCode()
  }, [navigate])

  return (
    <div className="container mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Bot's QR Code</h2>
      {qrCode ? (
        <div>
          <img src={qrCode || "/placeholder.svg"} alt="Bot QR Code" className="mx-auto mb-4" />
          <p className="text-lg">Scan this QR code to access your bot's chat interface.</p>
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  )
}

export default QRPage

