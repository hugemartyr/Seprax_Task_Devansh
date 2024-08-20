// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import Chainlink Aggregator Interface
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenPriceFetcher {
    
    // Define addresses for Chainlink price feeds for top tokens
    AggregatorV3Interface internal ethPriceFeed;
    AggregatorV3Interface internal btcPriceFeed;
    AggregatorV3Interface internal linkPriceFeed;
    AggregatorV3Interface internal aavePriceFeed;
    AggregatorV3Interface internal uniPriceFeed;
    
    constructor() {
        // Initialize Chainlink data feeds
        // ethPriceFeed = AggregatorV3Interface(0xSomeEthPriceFeedAddress);
        // btcPriceFeed = AggregatorV3Interface(0xSomeBtcPriceFeedAddress);
        linkPriceFeed = AggregatorV3Interface("0x514910771af9ca656af840dff83e8264ecf986ca");
        aavePriceFeed = AggregatorV3Interface(0x7fc66500c84a76ad7e4667301300fa1b5390bdc6);
        uniPriceFeed = AggregatorV3Interface(0x1f98431c80d040d4b0adf1acd700da6062c32b5c);
    }
    
    // // Get latest ETH price
    // function getEthPrice() public view returns (int) {
    //     (,int price,,,) = ethPriceFeed.latestRoundData();
    //     return price;
    // }
    
    // // Get latest BTC price
    // function getBtcPrice() public view returns (int) {
    //     (,int price,,,) = btcPriceFeed.latestRoundData();
    //     return price;
    // }
    
    // Get latest LINK price
    function getLinkPrice() public view returns (int) {
        (,int price,,,) = linkPriceFeed.latestRoundData();
        return price;
    }
    
    // Get latest AAVE price
    function getAavePrice() public view returns (int) {
        (,int price,,,) = aavePriceFeed.latestRoundData();
        return price;
    }
    
    // Get latest UNI price
    function getUniPrice() public view returns (int) {
        (,int price,,,) = uniPriceFeed.latestRoundData();
        return price;
    }
    
    // Get all prices at once
    function getAllPrices() public view returns (int, int, int) {
        return (
            // getEthPrice(),
            // getBtcPrice(),
            getLinkPrice(),
            getAavePrice(),
            getUniPrice()
        );
    }
}