"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </form>
    </div>
  )
}

export default Login

