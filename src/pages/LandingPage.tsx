import type React from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Chatbot from "../components/Chatbot"

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Create Your Own AI Business Bot Today!</h1>
        <p className="text-xl mb-8">Enhance customer service and automate responses with ease.</p>
        <div className="space-x-4">
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Bot Preview</h2>
        <Chatbot />
      </div>
    </div>
  )
}

export default LandingPage

