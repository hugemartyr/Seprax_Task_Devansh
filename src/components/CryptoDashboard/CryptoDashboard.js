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
        'BTC', // Bitcoin
        'LINK', // Chainlink
        'UNI', // Uniswap
        'AAVE', // Aave
        'MATIC', // Matic
        'LTC', // Litecoin
        'XRP', // Ripple
        'DOGE', // Dogecoin
        'DOT', // Polkadot
        'BNB', // Binance Coin
        'SOL', // Solana
        'ADA', // Cardano
        'TRX', // TRON
        'EOS', // EOS
        'XLM', // Stellar
        'XMR', // Monero
        'BCH', // Bitcoin Cash
        'ETC', // Ethereum Classic
        'VET', // VeChain
        'FIL', // Filecoin
        'THETA', // Theta
        'XTZ', // Tezos
        'ATOM', // Cosmos
        'AVAX', // Avalanche

    ];

    useEffect(() => {
        fetchCoinData(initialCoins.slice(2,4)); // Fetch only the first four coins
    }, []);

    // const fetchCoinData = async (symbols) => {
    //     try {
    //         const responses = await Promise.all(
    //             symbols.map(symbol =>
    //                 axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD`)
    //             )
    //         );

    //         const coinsData = responses.map((response, index) => {
    //             const symbol = symbols[index];
    //             return {
    //                 name: symbol, // Placeholder for name
    //                 symbol,
    //                 logo: `https://www.cryptocompare.com/media/19682/${symbol.toLowerCase()}.png`, // Use a default logo URL (you can change it)
    //                 price: response.data[symbol].USD,
    //                 marketCap: 'N/A' // Market cap can be fetched if needed
    //             };
    //         });

    //         setCoins(coinsData);
    //     } catch (error) {
    //         console.error('Error fetching coin data:', error);
    //     }
    // };

    // const addToken = async () => {
    //     if (userToken && !additionalCoins.includes(userToken)) {
    //         setAdditionalCoins([...additionalCoins, userToken.toUpperCase()]);
    //         setUserToken('');
    //         await fetchCoinData([userToken.toUpperCase()]);
    //     }
    // };





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

            // Merge the new data with the existing coins
            setCoins(prevCoins => [...prevCoins, ...coinsData]);
        } catch (error) {
            console.error('Error fetching coin data:', error);
        }
    };

    const addToken = async () => {
        if (userToken && !additionalCoins.includes(userToken.toUpperCase())) {
            setAdditionalCoins([...additionalCoins, userToken.toUpperCase()]);
            setUserToken('');
            await fetchCoinData([userToken.toUpperCase()]);
        }
    };

    const removeToken = (symbol) => {
        // Remove the token from the coins state
        setCoins(prevCoins => prevCoins.filter(coin => coin.symbol !== symbol));
        // Also remove it from the additionalCoins state
        setAdditionalCoins(prevAdditionalCoins => prevAdditionalCoins.filter(token => token !== symbol));

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
                    {/* <p>Symbol: {coin.symbol}</p> */}
                    <p>Current Price: ${coin.price}</p>
                    <p>Market Cap: {coin.marketCap}</p>
                    <button className= "connect-button" onClick={() => removeToken(coin.symbol)}>Remove</button>
                </div>
            ))}
        </div>
        <Link to="/" className="nav-button">Go Back to Home</Link>
    </div>
);
};






export default CryptoDashboard;

