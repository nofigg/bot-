import type React from "react"
import { Link } from "react-router-dom"

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Digital Business Bot Platform</h1>
      <p className="text-xl mb-8">Create your own AI-powered customer service bot in minutes!</p>
      <Link
        to="/register"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}

export default LandingPage

