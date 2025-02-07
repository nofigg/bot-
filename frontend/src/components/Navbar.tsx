import type React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Digital Business Bot Platform
        </Link>
        <div>
          <Link to="/login" className="text-white mr-4">
            Login
          </Link>
          <Link to="/register" className="text-white">
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

