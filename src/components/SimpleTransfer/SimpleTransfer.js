import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleTransferABI from './SimpleTransferABI.json'; // Import ABI
import './SimpleTransfer.css'; // Create this CSS file for styling
import "../../App.css"
import { Link } from "react-router-dom"

const SimpleTransfer = () => {
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const contractInstance = new web3Instance.eth.Contract(
                SimpleTransferABI,
                '0x9e940683A95D955D261A66559008cb6D6c7edeb8' // Replace with your deployed contract address
            );
            setContract(contractInstance);
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    }, []);

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    const handleTransfer = async () => {
        if (contract && account) {
            try {
                const _value = web3.utils.toWei(amount, 'ether'); // Convert amount to Wei
                //console.log(recipientAddress);
                //console.log(contract);
                // const gasPrice = await web3.eth.getGasPrice();
                // const gasLimit = await contract.methods
                //     .transferEther(recipientAddress)
                //     .estimateGas({
                //         from: account,
                //         value: _value.toString(),

                //     });
                const txn = await contract.methods.transferEther(recipientAddress).send({ from: account, value: _value.toString() });
                console.log("The Transaction Hash is : ", txn.transactionHash);

                setMessage("Transfer successful! ");
            } catch (error) {
                console.error("Error during transfer:", error);
                setMessage(`Transfer failed! `);
            }
        }
    };

    return (
        <div className="transfer-container">
            <button className="connect-button" onClick={connectWallet}>
                {account ? `Connected: ${account}` : 'Connect Wallet'}
            </button>
            {account && (
                <div className="transfer-form">
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Amount (ETH)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field"
                    />
                    <button className="transfer-button" onClick={handleTransfer}>Transfer Ether</button>
                    {message && <p className="message">{message}</p>}
                </div>
            )}
            <Link to="/" className="nav-button">Go Back to Home</Link>

        </div>
    );
};

export default SimpleTransfer;


//Original contract : 0x9e940683A95D955D261A66559008cb6D6c7edeb8