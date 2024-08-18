import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TokenGraphsandCards.css';

const TokenGraphsandCards = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokenData = async () => {
      const tokenIds = ['ethereum', 'chainlink', 'uniswap', 'aave', 'matic-network']; // Updated tokens
      const tokenData = await Promise.all(
        tokenIds.map(async (id) => {
          const priceResponse = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
          );
          console.log({priceResponse})
          const chartResponse = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
          );
          return {
            id,
            price: priceResponse.data[id].usd,
            chartData: chartResponse.data.prices,
          };
        })
      );
      setTokens(tokenData);
    };

    fetchTokenData();
  }, []);

  return (
    <div className="token-container">
      {tokens.map((token) => (
        <div key={token.id} className="token-card">
          <h2>{token.id.charAt(0).toUpperCase() + token.id.slice(1)}</h2>
          <p>Price: ${token.price}</p>
          <div className="chart">
            <svg width="100%" height="100" viewBox="0 0 100 100">
              <polyline
                fill="none"
                stroke="#4CAF50"  /* Green color for the line */
                strokeWidth="2"
                points={token.chartData
                  .map((point, i) => `${(i * 100) / (token.chartData.length - 1)},${100 - (point[1] * 100) / Math.max(...token.chartData.map(p => p[1]))}`)
                  .join(' ')}
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenGraphsandCards;
