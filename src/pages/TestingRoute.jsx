import React from 'react'
import "../styles/TestingRoute.css"
const TestingRoute = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
      <div className="auth-links">
        <a href="#" className="login">Login</a>
        <select className="dropdown">
          <a href="#" className="signup">Sign Up</a>
          <ul className="dropdown-links">
            <li><a href="#">Option 1</a></li>
            <li><a href="#">Option 2</a></li>
            <li><a href="#">Option 3</a></li>
          </ul>
        </select>
      </div>
      <div className="mobile-nav">
        <button className="mobile-nav-btn">
          <i className="fas fa-bars"></i>
        </button>
        <ul className="mobile-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#" className="login">Login</a></li>
          <li><a href="#" className="signup">Sign Up</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default TestingRoute
