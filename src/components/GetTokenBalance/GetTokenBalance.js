import { useState } from "react";
import { usdPrice, getEthPriceInUSD } from "./GetTokenBalance.jsx";
import "./GetTokenBalance.css"
import "../../App.css"

const GetTokenBalance = () => {

    // const [a, setA] = useState([]);

    const [ETH, setETH] = useState();
    const [LINK, setLINK] = useState();
    const [AAVE, setAAVE] = useState();
    const [UNI, setUNI] = useState();
    const [MATIC, setMATIC] = useState();

    async function fetchPrice() {
        let prices = await getEthPriceInUSD();
        console.log(prices);
        setETH(prices.ethPriceInUSD);
        setMATIC(prices.ethPriceInUSD2);
        setLINK(prices.ethPriceInUSD3);
        setAAVE(prices.ethPriceInUSD4);
        setUNI(prices.ethPriceInUSD5);
        console.log({ ETH });


        //return a;
    }


    return (
        <>
            <button className="connect-button" onClick={fetchPrice}> Fetch Real-Time Price </button>
            <br></br>
            <div style={{ padding: '20px', backgroundColor: '#f4f4f4', color: '#333' }} className="emphasized-text">
                <p><span className="token-name">Price of ETH:</span> <span className="token-value">{ETH} $ </span></p>
                <p><span className="token-name">Price of MATIC:</span> <span className="token-value">{MATIC} $</span></p>
                <p><span className="token-name">Price of LINK:</span> <span className="token-value">{LINK} $</span></p>
                <p><span className="token-name">Price of AAVE:</span> <span className="token-value">{AAVE} $</span></p>
                <p><span className="token-name">Price of UNI:</span> <span className="token-value">{UNI} $</span></p>
            </div>

            
        </>
    );

}

export default GetTokenBalance;