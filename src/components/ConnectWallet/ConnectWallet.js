// import React, { useState } from 'react';
// import './ConnectWallet.css';
// import { ethers } from 'ethers';

// const ConnectWallet = () => {
//   const [account, setAccount] = useState(null);
//   const [balance, setBalance] = useState(null);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         // Request account access
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setAccount(accounts[0]);

//         // Specify Sepolia network
//         const sepoliaProvider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.https://sepolia.infura.io/v3/3de1dfa83d77414f9e271ade5ca4f5d5/v3/YOUR_INFURA_PROJECT_ID');

//         // Fetch the balance
//         const balanceInWei = await sepoliaProvider.getBalance(accounts[0]);
//         const balanceInEther = ethers.utils.formatEther(balanceInWei);
//         setBalance(balanceInEther);
//       } catch (error) {
//         console.error("User rejected the request or an error occurred:", error);
//       }
//     } else {
//       alert('MetaMask is not installed. Please install it to use this feature.');
//     }
//   };

//   return (
//     <div className="wallet-container">
//       <button className="connect-button" onClick={connectWallet}>
//         {account ? `Connected: ${account}` : "Connect MetaMask"}
//       </button>
//       {account && (
//         <div className="wallet-info">
//           <p>Balance: {balance ? `${balance} ETH` : 'Fetching balance...'}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConnectWallet;


import Web3 from 'web3';

// Initialize Web3
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// ABI (Application Binary Interface) of the deployed contract
const abi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "walletAddress",
                "type": "address"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "walletAddress",
                "type": "address"
            }
        ],
        "name": "isContract",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Deployed contract address (replace with your actual contract address)
const contractAddress = '0x7792f822D5a5EB2AB04735471f3767CBfee34832';

// Create contract instance
const walletInfoContract = new web3.eth.Contract(abi, contractAddress);

// Example function to get the balance of an address
async function getWalletBalance(walletAddress) {
    try {
        const balance = await walletInfoContract.methods.getBalance(walletAddress).call();
        console.log('Balance in wei:', balance);
        console.log('Balance in ether:', web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Example usage
const addressToCheck = '0xAddressToCheck';
getWalletBalance(addressToCheck);
