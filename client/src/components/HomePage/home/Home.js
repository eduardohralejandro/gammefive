import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  
  return (
    <div>
      <div className='box-home-gamelist'>
      <div style={{color:"white"}}>
      <Link className="router-links" to="/start">
      <div className="games-home-list"></div>
      </Link>
       memory game
      </div>
      </div>
    </div>
  );
};

export default Home;