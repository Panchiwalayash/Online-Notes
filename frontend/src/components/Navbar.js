import React from 'react'
import {
  Link
} from "react-router-dom";
import "../css/Navbar.css"
import logo from "./logo.png"

const Navbar = () => {

  return (
    <>
      <div >
        
        <nav >
          <img  id="img" src={logo} alt="logo" />
          <ul >
            <li >
              <Link to="/" className="home">Home</Link></li>
          </ul>
          <button className="btn" id="btn1" ><Link to="/register">Register</Link></button>
          <button className="btn" id="btn2" ><Link to="/signup">Signup</Link></button>
        </nav>
      </div>
    </>
  )
}

export default Navbar