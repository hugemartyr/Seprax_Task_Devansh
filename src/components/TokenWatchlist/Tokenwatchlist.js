import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TokenWatchlistABI from './TokenWatchlistABI.json'; // Import ABI
import './TokenWatchlist.css';
import "../../App.css"
import {Link} from "react-router-dom"

const TokenWatchlist = () => {
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [tokenAddress, setTokenAddress] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [balances, setBalances] = useState({});

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

            // Initialize contract instance
            const contractInstance = new web3.eth.Contract(
                TokenWatchlistABI,
                '0x871Ada68c2155CaAd7309ab75d2821e41382E40E' // Replace with your deployed contract address
            );
            setContract(contractInstance);
            fetchWatchlist(contractInstance, accounts[0]);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    const addTokenToWatchlist = async () => {
        if (contract && account) {
            try {
                await contract.methods.addTokenToWatchlist(tokenAddress).send({ from: account });
                alert('Token added to watchlist successfully!');
                fetchWatchlist(contract, account);


                // const a = await contract.methods.balanceOf(account).call();
                // console.log(a);

            } catch (error) {
                console.error("Error adding token to watchlist:", error);
            }
        }
    };

    const fetchWatchlist = async (contractInstance, userAccount) => {
        if (contractInstance && userAccount) {
            try {
                const tokens = await contractInstance.methods.getWatchlist().call({ from: userAccount });
                setWatchlist(tokens);

                // Fetch balances for each token

                // const balancePromises = tokens.map(token =>
                //     web3.eth.getBalance(userAccount).call()

                // );
                // const balances = await Promise.all(balancePromises);

                // // Map tokens to their balances
                // const balanceMap = tokens.reduce((map, token, index) => {
                //     map[token] = balances[index];
                //     return map;
                // }, {});
                // setBalances(balanceMap);
                console.log(web3);
                //const a = web3.eth.getBalance(userAccount).call()
                //console.log(a);

            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        }
    };

    const removeTokenFromWatchlist = async (token) => {
        if (contract && account) {
            try {
                await contract.methods.removeTokenFromWatchlist(token).send({ from: account });
                alert('Token removed from watchlist successfully!');
                fetchWatchlist(contract, account);
            } catch (error) {
                console.error("Error removing token from watchlist:", error);
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
                            <li key={index}>
                                {token}
                                <span>Balance: {balances[token] || 'Loading...'}</span>
                                <button className="remove-button" onClick={() => removeTokenFromWatchlist(token)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
                   <Link to="/" className="nav-button">Go Back to Home</Link>
        </div>
    );
};

export default TokenWatchlist;



// Ethereum : 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
// AAVE Token : 0xD6DF932A45C0f255f85145f286eA0b292B21C90B
// Sepolia : 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43