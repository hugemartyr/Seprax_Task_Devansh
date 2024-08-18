import React from 'react';
import './Body.css';


const Body = () => {
  return (
    <div className="container">
      <div className="shapes">
        {/* Minimalistic Shapes */}
        <svg className="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>

        <svg className="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <polygon points="50,15 90,85 10,85" />
        </svg>

        <svg className="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10">
          <rect width="100" height="10" />
        </svg>
        
      </div>

      <h1 className="heading">My Crypto Portfolio</h1>
      
    </div>
  );
};


export default Body;
