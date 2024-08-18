import React, { useEffect } from 'react';
import Body from './components/Body/Body';
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import ConnectWallet1 from './components/ConnectWallet/ConnectWallet1';
import TokenWatchlist from './components/TokenWatchlist/Tokenwatchlist';
// import TokenBalanceViewer from './components/TokenBalanceViewer/TokenBalanceViewer';
import SimpleTransfer from './components/SimpleTransfer/SimpleTransfer';
import SepoliaBalance from './components/WalletBalance/WalletBalance';
import { usdPrice, getEthPriceInUSD } from './components/GetTokenBalance/GetTokenBalance';
import GetTokenBalance from './components/GetTokenBalance/GetTokenBalance';


function App() {

  // let a;

  // async function fetchPrice() {
  //   await getEthPriceInUSD();
  //   a = usdPrice;
  //   console.log(a);
  // }
  return (
    <div className="App">
      {/* <Body/> */}
      {/* <ConnectWallet1 /> */}
      {/* <TokenBalanceViewer/> */}

      <SepoliaBalance />
      {/* <TokenWatchlist /> */} 
      <GetTokenBalance/>

      {/* <button onClick={fetchPrice}> Click Me </button> */}
      {/* <SimpleTransfer /> */}
    </div>
  );
}

export default App;
