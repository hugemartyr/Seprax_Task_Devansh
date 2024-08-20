import React, { useEffect } from 'react';
import Body from './components/Body(main)/Body';

import ConnectWallet1 from './components/ConnectWallet/ConnectWallet1';
import TokenWatchlist from './components/TokenWatchlist/Tokenwatchlist';
import TokenBalanceViewer from './components/TokenWatchlist(discard)/TokenBalanceViewer';
import SimpleTransfer from './components/SimpleTransfer/SimpleTransfer';
import { usdPrice, getEthPriceInUSD } from './components/GetTokenBalance/GetTokenBalance';
import GetTokenBalance from './components/GetTokenBalance/GetTokenBalance';
import WalletBalance from './components/WalletBalance/WalletBalance';
import TokenGraphsandCards from './components/TokenGraphsandCards(discard)/TokenGraphsandCards';
import HistoricalData from './components/TokenHistory/TokenHistory';
import TokenHistory from './components/TokenHistory/TokenHistory';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenWatchlist1 from './components/TokenWatchlist/TokenWatchlist1';
import CryptoDashboard from './components/CryptoDashboard/CryptoDashboard';


function App() {
  document.title = "MyCryptoPortfolio";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/TokenHistory" element={<TokenHistory />} />
        <Route path="/WalletBalance" element={<WalletBalance />} />
        <Route path="/SimpleTransfer" element={<SimpleTransfer />} />
        <Route path="/ConnectWallet1" element={<ConnectWallet1 />} />
        <Route path="/TokenBalanceViewer" element={<TokenBalanceViewer />} />
        <Route path="/TokenWatchlist" element={<TokenWatchlist />} />
        <Route path="/HistoricalData" element={<HistoricalData />} />
        <Route path="/GetTokenBalance" element={<GetTokenBalance />} />
        <Route path="/CryptoDashboard" element={<CryptoDashboard />} />

        <Route path="/SimpleTransfer" element={<SimpleTransfer />} />
        <Route path="/TokenWatchlist1" element={<TokenWatchlist1 />} />
        <Route path="" element={<Body />} />

      </Routes>
    </BrowserRouter>
  );
}















// function App() {


//   return (

//     <div>


//       <Body />
//       <ConnectWallet1 />
//       <TokenBalanceViewer/> 

//       <WalletBalance />
//       <TokenWatchlist />
//       <GetTokenBalance />
//       <HistoricalData />
//       <TokenGraphsandCards />

//       <SimpleTransfer />
//       <TokenHistory />
//     </div>
//   );
// }

export default App;
