import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenWatchlistABI from './TokenWatchlistABI.json'; // Import ABI
// import './TokenWatchlist.css';

const TokenWatchlist = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(providerInstance);
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signerInstance = provider.getSigner();
      setSigner(signerInstance);

      const accountAddress = await signerInstance.getAddress();
      setAccount(accountAddress);

      // Initialize contract instance
      const contractInstance = new ethers.Contract(
        '0xe3b9D8589563D85195a819278E79275891AA60bd', // Replace with your deployed contract address
        TokenWatchlistABI,
        signerInstance
      );
      setContract(contractInstance);
      fetchWatchlist();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const addTokenToWatchlist = async () => {
    if (contract && signer) {
      try {
        const tx = await contract.addTokenToWatchlist(tokenAddress);
        await tx.wait();
        alert('Token added to watchlist successfully!');
        fetchWatchlist();
      } catch (error) {
        console.error("Error adding token to watchlist:", error);
      }
    }
  };

  const fetchWatchlist = async () => {
    if (contract) {
      try {
        const watchlist = await contract.getWatchlist();
        setWatchlist(watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    }
  };

  return (
    <div>
      <button className="connect-button" onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      {account && (
        <div>
          <input 
            type="text" 
            placeholder="Enter token address" 
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <button className="connect-button" onClick={addTokenToWatchlist}>Add Token to Watchlist</button>
          <h3>Watchlist:</h3>
          <ul>
            {watchlist.map((token, index) => (
              <li key={index}>{token}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TokenWatchlist;

