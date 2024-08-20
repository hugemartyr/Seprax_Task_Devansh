import React from 'react';
import './Body.css';
import WalletBalance from '../WalletBalance/WalletBalance';
import { Link } from 'react-router-dom';
import "../../App.css"

const Body = () => {
  return (
    <div className="shapes-container">
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

      <WalletBalance/>

      <div className="button-container">
        <Link to="/TokenHistory" className="nav-button">Token History</Link>
        <Link to="/TokenWatchlist" className="nav-button"> Saved Address </Link>
        <Link to="/SimpleTransfer" className="nav-button">Token Transfer</Link>
        <Link to="/CryptoDashboard" className="nav-button">Token Watchlist </Link>
        
      </div>
      
    </div>
  );
};


export default Body;
