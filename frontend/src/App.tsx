import type React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import QRPage from "./pages/QRPage"

const App: React.FC = () => {
  console.log('Front End is running!');
  console.log('Front End is running!');
  console.log('Front End is running!');
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/qr" element={<QRPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
