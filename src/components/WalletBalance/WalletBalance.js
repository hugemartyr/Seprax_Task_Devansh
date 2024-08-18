import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const SepoliaBalance = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState('0');
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        // Initialize Web3
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            // Request account access
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setAccount(accounts[0]);
                    fetchBalance(web3Instance, accounts[0]);
                })
                .catch(error => {
                    console.error("Error connecting to MetaMask:", error);
                });
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    }, []);

    const fetchBalance = async (web3Instance, account) => {
        try {
            const balanceWei = await web3Instance.eth.getBalance(account);
            const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
            setBalance(balanceEth);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', color: '#333' }}>
            <h2 style={{ color: '#556b2f' }}>Wallent Balance</h2>
            {account ? (
                <div>
                    <p><strong>Account:</strong> {account}</p>
                    <p><strong>Balance:</strong> {balance} ETH</p>
                </div>
            ) : (
                <p>Connect your MetaMask wallet to see your Sepolia ETH balance.</p>
            )}
        </div>
    );
};

export default SepoliaBalance;
