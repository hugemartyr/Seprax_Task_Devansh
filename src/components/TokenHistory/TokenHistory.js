import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './TokenHistory.css';

const TokenHistory = () => {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tokens = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'LTC', name: 'Litecoin' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'UNI', name: 'Uniswap' },
    { symbol: 'AAVE', name: 'Aave' },
    { symbol: 'SOL', name: 'Solana' },
  ];

  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!startDate || !endDate) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/v2/histoday`,
          {
            params: {
              fsym: selectedToken,
              tsym: 'USD',
              limit: 2000, // Set a high limit to handle large date ranges
              toTs: Math.floor(new Date(endDate).getTime() / 1000),
              api_key: 'your_cryptocompare_api_key',
            },
          }
        );

        const prices = response.data.Data.Data.filter(
          (entry) => new Date(entry.time * 1000) >= new Date(startDate)
        ).map((entry) => ({
          time: new Date(entry.time * 1000).toLocaleDateString(),
          price: entry.close,
        }));

        setPriceHistory(prices);
      } catch (error) {
        console.error('Error fetching price history:', error);
      }
      setLoading(false);
    };

    fetchPriceHistory();
  }, [selectedToken, startDate, endDate]);

  const data = {
    labels: priceHistory.map((entry) => entry.time),
    datasets: [
      {
        label: `${selectedToken} Price (USD)`,
        data: priceHistory.map((entry) => entry.price),
        fill: false,
        backgroundColor: '#556B2F',
        borderColor: '#4CAF50',
      },
    ],
  };

  return (
    <div className="token-history-container">
      <h1>Select a Token</h1>
      <select
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value)}
        className="dropdown"
      >
        {tokens.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.name} ({token.symbol})
          </option>
        ))}
      </select>

      <div className="date-picker-container">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="chart-container">
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default TokenHistory;
