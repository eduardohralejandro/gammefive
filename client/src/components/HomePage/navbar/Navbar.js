import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  
  return (
      <div>
          <nav className="brand-navbar">
          <img src="https://i.ibb.co/B4LBD8f/tetris.png"/>
          <Link className="router-links" to="/">Home</Link>
          </nav>
          
    </div>
  );
};

export default Navbar;