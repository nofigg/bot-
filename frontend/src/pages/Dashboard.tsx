"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Dashboard: React.FC = () => {
  const [botConfig, setBotConfig] = useState({
    name: "",
    welcomeMessage: "",
    faqResponses: [{ question: "", answer: "" }],
  })
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
    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:5000/bot/configure", botConfig, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Bot configuration saved successfully!")
      navigate("/qr")
    } catch (error) {
      console.error("Error saving bot configuration:", error)
      alert("Failed to save bot configuration. Please try again.")
    }
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
          <button
            type="button"
            onClick={handleAddFAQ}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Add FAQ
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Configuration
        </button>
      </form>
    </div>
  )
}

export default Dashboard

