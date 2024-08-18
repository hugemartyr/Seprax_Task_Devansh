import React from 'react';
import './styles.css';
import { getEthPriceInUSD } from './GetTokenBalance';

const TableBalanceToken = () => {
    const historicalData = [
        { token: 'ETH', balance: '1.234', date: '2024-08-01' },
        { token: 'BTC', balance: '0.567', date: '2024-08-02' },
        { token: 'LINK', balance: '10.456', date: '2024-08-03' }
    ];

    return (
        <div className="table-container">
            <table>
                <caption>Historical Token Balances</caption>
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Balance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {historicalData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.token}</td>
                            <td>{item.balance}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableBalanceToken;
