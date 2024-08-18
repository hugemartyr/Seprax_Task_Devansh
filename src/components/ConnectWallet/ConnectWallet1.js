import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleStorageABI from './SimpleStorageABI.json'; // Import ABI
import './ConnectWallet.css';

const ConnectWallet1 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState('');
  const [storedValue, setStoredValue] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Get the balance of the connected account
      const accountBalance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(accountBalance, 'ether')); // Convert balance from Wei to Ether

      // Initialize contract instance
      const contractInstance = new web3.eth.Contract(
        SimpleStorageABI,
        '0xf1D37Af665F597b88Da0858883240555453D65Fc' // Your deployed contract address
      );
      setContract(contractInstance);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const storeValue = async () => {
    if (contract && account) {
      try {
        // Trigger MetaMask to send a transaction
        await contract.methods.set(value).send({ from: account });
        alert('Value stored successfully!');
      } catch (error) {
        console.error("Error storing value:", error);
      }
    }
  };

  const fetchStoredValue = async () => {
    if (contract) {
      try {
        // Make a call to the contract to get the stored value
        console.log("Fetching the stored value...");
        const storedValue = await contract.methods.get().call();
        console.log("Fetched value:", storedValue);
        alert('Value stored = ' + storedValue);

        setStoredValue(storedValue);
      } catch (error) {
        console.error("Error fetching stored value:", error.message || error);
      }
    } else {
      console.error("Contract is not initialized");
    }
  };

  return (
    
    <div>
        <h1 className="heading"> My Crypto Portfolio </h1>
      <button className="connect-button" onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet1'}
      </button>
      {account && (
        <div>
          <p>Account Balance: {balance} ETH</p>
          <input 
            type="number" 
            placeholder="Enter value to store" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="connect-button" onClick={storeValue}>Store Value</button>
          <button className="connect-button" onClick={fetchStoredValue}>Fetch Stored Value</button>
          {storedValue !== null && (
            <div className="stored-value">
              <p>Stored Value: {storedValue} </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet1;






