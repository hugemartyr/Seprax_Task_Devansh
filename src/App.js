import React, { useEffect } from 'react';
import Body from './components/Body/Body';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import ConnectWallet1 from './components/ConnectWallet/ConnectWallet1';
import TokenWatchlist from './components/TokenWatchlist/Tokenwatchlist';
// import TokenBalanceViewer from './components/TokenBalanceViewer/TokenBalanceViewer';
import SimpleTransfer from './components/SimpleTransfer/SimpleTransfer';
import { usdPrice, getEthPriceInUSD } from './components/GetTokenBalance/GetTokenBalance';
import GetTokenBalance from './components/GetTokenBalance/GetTokenBalance';
import WalletBalance from './components/WalletBalance/WalletBalance';
import TokenGraphsandCards from './components/TokenGraphsandCards/TokenGraphsandCards';
import HistoricalData from './components/TokenHistory/TokenHistory';
import TokenHistory from './components/TokenHistory/TokenHistory';


function App() {

  // let a;

  // async function fetchPrice() {
  //   await getEthPriceInUSD();
  //   a = usdPrice;
  //   console.log(a);
  // }
  return (
    <div>

      {/* <svg className="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>

      <svg className="triangle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="50,15 90,85 10,85" />
      </svg>

      <svg className="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10">
        <rect width="100" height="10" />
      </svg>

      <h1 className="heading">My Crypto Portfolio</h1> */}



      {/* <Body /> */}
      {/* <ConnectWallet1 /> */}
      {/* <TokenBalanceViewer/> */}

      <WalletBalance />
      <TokenWatchlist />
      <GetTokenBalance />
      {/* <HistoricalData/> */}
      {/* <TokenGraphsandCards/> */}
      {/* <button onClick={fetchPrice}> Click Me </button> */}
      <SimpleTransfer />
      <TokenHistory />
    </div>
  );
}

export default App;
