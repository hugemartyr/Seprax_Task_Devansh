import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TokenWatchlistABI from './TokenWatchlistABI.json'; // Import ABI
import './TokenWatchlist.css';
import "../../App.css"
import { Link } from "react-router-dom"

const TokenWatchlist1 = () => {
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenName, setTokenName] = useState(''); // New state for token name
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
                '0xc746eA8fA115D37fC3C7Bf847287Bd066Fa66326' // Replace with your deployed contract address
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
                await contract.methods.addTokenToWatchlist(tokenAddress, tokenName).send({ from: account });
                alert('Token added to watchlist successfully!');
                fetchWatchlist(contract, account);
            } catch (error) {
                console.error("Error adding token to watchlist:", error);
            }
        }
    };




    // const fetchWatchlist = async (contractInstance, userAccount) => {
    //     if (contractInstance && userAccount) {
    //         try {
    //             const result = await contractInstance.methods.getWatchlist().call({ from: userAccount });
    //             console.log("Watchlist data:", result);

    //             // Adjust if result is not an array
    //             const tokens = result[0]; // Example adjustment
    //             const names = result[1];  // Example adjustment
    //             console.log(names)

    //             const watchlist = tokens.map((token, index) => ({
    //                 address: token,
    //                 name: names[index]
    //             }));

    //             setWatchlist(watchlist);
    //         } catch (error) {
    //             console.error("Error fetching watchlist:", error);
    //         }
    //     }
    // };





    // const fetchWatchlist = async (contractInstance, userAccount) => {
    //     if (contractInstance && userAccount) {
    //         try {
    //             // Call the contract's getWatchlist method
    //             const [tokens, names] = await contractInstance.methods.getWatchlist().call({ from: userAccount });

    //             // Map the tokens and names into a watchlist array
    //             const watchlist = tokens.map((token, index) => ({
    //                 address: token,
    //                 name: names[index]
    //             }));

    //             // Update the state with the watchlist
    //             setWatchlist(watchlist);
    //         } catch (error) {
    //             console.error("Error fetching watchlist:", error);
    //         }
    //     }
    // };


    const fetchWatchlist = async (contractInstance, userAccount) => {
        if (contractInstance && userAccount) {
            try {
                // Call the contract's getWatchlist method
                const result = await contractInstance.methods.getWatchlist().call({ from: userAccount });

                const tokens = result[0]; // Array of token addresses
                const names = result[4]; // Array of token names
                console.log(tokens);
                console.log(names);
                console.log(result);


                // Check if tokens and names are arrays and have the same length
                if (Array.isArray(tokens) && Array.isArray(names) && tokens.length === names.length) {
                    // Map the tokens and names into a watchlist array
                    const watchlist = tokens.map((token, index) => ({
                        address: token,
                        name: names[index]
                    }));

                    // Update the state with the watchlist
                    setWatchlist(watchlist);
                } else {
                    console.error("Tokens and names do not match in length or are not arrays.");
                }
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        }
    };






    const removeTokenFromWatchlist = async (token) => {
        if (contract && account) {
            try {
                await contract.methods.removeTokenFromWatchlist(token.address).send({ from: account });
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
                    <input
                        type="text"
                        placeholder="Enter token name"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                    />
                    <button className="connect-button" onClick={addTokenToWatchlist}>Add Token to Watchlist</button>
                    <h3>Watchlist:</h3>
                    <ul>
                        {watchlist.map((token, index) => (
                            <li key={index}>
                                {token.name} ({token.address})
                                <span> Balance: {balances[token.address] || 'Loading...'}</span>
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

export default TokenWatchlist1;
