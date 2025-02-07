"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import Button from "./Button"
import Spinner from "./Spinner"

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { text: input, isUser: true }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        message: input,
      })
      const botMessage = { text: response.data.message, isUser: false }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = { text: "Sorry, there was an error processing your request.", isUser: false }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.isUser ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <Button type="submit" disabled={isLoading} className="rounded-l-none">
          {isLoading ? <Spinner /> : "Send"}
        </Button>
      </form>
    </div>
  )
}

export default Chatbot

