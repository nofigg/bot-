"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

const Dashboard: React.FC = () => {
  const [botConfig, setBotConfig] = useState({
    name: "",
    welcomeMessage: "",
    faqResponses: [{ question: "", answer: "" }],
  })
  const [qrCode, setQRCode] = useState("")
  const [embedCode, setEmbedCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }
  }, [navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBotConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }))
  }

  const handleFAQChange = (index: number, field: "question" | "answer", value: string) => {
    setBotConfig((prevConfig) => {
      const newFAQResponses = [...prevConfig.faqResponses]
      newFAQResponses[index][field] = value
      return { ...prevConfig, faqResponses: newFAQResponses }
    })
  }

  const handleAddFAQ = () => {
    setBotConfig((prevConfig) => ({
      ...prevConfig,
      faqResponses: [...prevConfig.faqResponses, { question: "", answer: "" }],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:5000/bot/configure", botConfig, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Bot configuration saved successfully!")
    } catch (error) {
      console.error("Error saving bot configuration:", error)
      alert("Failed to save bot configuration. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateQRCode = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/qr/generate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setQRCode(response.data.qrCode)
    } catch (error) {
      console.error("Error generating QR code:", error)
      alert("Failed to generate QR code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateEmbedCode = () => {
    const embedCode = `<iframe src="http://localhost:3000/chatbot/${botConfig.name}" width="300" height="500"></iframe>`
    setEmbedCode(embedCode)
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode)
    alert("Embed code copied to clipboard!")
  }

  return (
    <div className="container mx-auto mt-10 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Configure Your Bot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Bot Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={botConfig.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="welcomeMessage" className="block mb-1">
            Welcome Message
          </label>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            value={botConfig.welcomeMessage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">FAQ Responses</h3>
          {botConfig.faqResponses.map((faq, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          ))}
          <Button type="button" onClick={handleAddFAQ} variant="secondary">
            Add FAQ
          </Button>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner /> : "Save Configuration"}
        </Button>
      </form>
      <div className="mt-8 space-y-4">
        <Button onClick={generateQRCode} disabled={isLoading} className="w-full">
          {isLoading ? <Spinner /> : "Generate QR Code"}
        </Button>
        {qrCode && (
          <div className="text-center">
            <img src={qrCode || "/placeholder.svg"} alt="Bot QR Code" className="mx-auto mb-4" />
            <p>Scan this QR code to access your bot's chat interface.</p>
          </div>
        )}
        <Button onClick={generateEmbedCode} className="w-full">
          Generate Embed Code
        </Button>
        {embedCode && (
          <div>
            <textarea value={embedCode} readOnly className="w-full px-3 py-2 border rounded-lg mb-2" rows={3} />
            <Button onClick={copyEmbedCode} variant="secondary" className="w-full">
              Copy Embed Code
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

