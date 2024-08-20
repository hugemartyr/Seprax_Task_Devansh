import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoDashboard.css'; // Create this CSS file for styling
import { Link } from "react-router-dom";

const CryptoDashboard = () => {
    const [coins, setCoins] = useState([]);
    const [userToken, setUserToken] = useState('');
    const [additionalCoins, setAdditionalCoins] = useState([]);

    const initialCoins = [
        'ETH', // Ethereum
        'LINK', // Chainlink
        'UNI', // Uniswap
        'AAVE', // Aave
        'MATIC', // Matic
        'BTC', // Bitcoin
        'LTC', // Litecoin
        'XRP', // Ripple
        'DOGE', // Dogecoin
        'DOT', // Polkadot
        'BNB', // Binance Coin
        'SOL' // Solana
    ];

    useEffect(() => {
        fetchCoinData(initialCoins.slice(0, 4)); // Fetch only the first four coins
    }, []);

    const fetchCoinData = async (symbols) => {
        try {
            const responses = await Promise.all(
                symbols.map(symbol =>
                    axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD`)
                )
            );

            const coinsData = responses.map((response, index) => {
                const symbol = symbols[index];
                return {
                    name: symbol, // Placeholder for name
                    symbol,
                    logo: `https://www.cryptocompare.com/media/19682/${symbol.toLowerCase()}.png`, // Use a default logo URL (you can change it)
                    price: response.data[symbol].USD,
                    marketCap: 'N/A' // Market cap can be fetched if needed
                };
            });

            setCoins(coinsData);
        } catch (error) {
            console.error('Error fetching coin data:', error);
        }
    };

    const addToken = async () => {
        if (userToken && !additionalCoins.includes(userToken)) {
            setAdditionalCoins([...additionalCoins, userToken.toUpperCase()]);
            setUserToken('');
            await fetchCoinData([userToken.toUpperCase()]);
        }
    };

    return (
        <div className="crypto-dashboard">
            <h2>Crypto Dashboard</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={userToken}
                    onChange={(e) => setUserToken(e.target.value)}
                    placeholder="Enter token symbol (e.g., BTC)"
                />
                <button onClick={addToken}>Add Token</button>
            </div>
            <div className="coins-container">
                {coins.map((coin, index) => (
                    <div className="coin" key={index}>
                        <img src={coin.logo} alt={coin.name} />
                        <h3>{coin.name}</h3>
                        <p>Symbol: {coin.symbol}</p>
                        <p>Current Price: ${coin.price}</p>
                        <p>Market Cap: {coin.marketCap}</p>
                    </div>
                ))}
                {additionalCoins.map((token, index) => (
                    <div className="coin" key={index}>
                        <img src={`https://www.cryptocompare.com/media/19682/${token.toLowerCase()}.png`} alt={token} />
                        <h3>{token}</h3>
                        <p>Symbol: {token}</p>
                        <p>Current Price: Loading...</p>
                        <p>Market Cap: Loading...</p>
                    </div>
                ))}
            </div>
            <Link to="/" className="nav-button">Go Back to Home</Link>
        </div>
    );
};

export default CryptoDashboard;

