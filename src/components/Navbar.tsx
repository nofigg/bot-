import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Digital Business Bot
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-white hover:text-blue-200">
              Dashboard
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-blue-200">
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

