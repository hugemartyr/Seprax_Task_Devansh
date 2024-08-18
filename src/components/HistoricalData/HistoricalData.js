import axios from "axios";
import Web3 from "web3";

const web3 = new Web3();

// API URLs for fetching historical data
const API_URLS = {
  ETH: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD",
  MATIC: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=MATIC&tsym=USD",
  LINK: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=LINK&tsym=USD",
  AAVE: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=AAVE&tsym=USD",
  UNI: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=UNI&tsym=USD",
};

export const getHistoricalPrices = async () => {
  try {
    const prices = {};

    // Get the timestamps for the last month and last year
    const endDate = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const startDateMonth = endDate - 30 * 24 * 60 * 60; // 30 days ago
    const startDateYear = endDate - 365 * 24 * 60 * 60; // 365 days ago

    // Fetch historical data for each token
    for (const [token, url] of Object.entries(API_URLS)) {
      const response = await axios.get(url, {
        params: {
          limit: 30, // Get daily data for the last 30 days
          toTs: endDate, // End date
        },
      });

      const responseYear = await axios.get(url, {
        params: {
          limit: 365, // Get daily data for the last 365 days
          toTs: endDate, // End date
        },
      });

      prices[token] = {
        lastMonth: response.data.Data.Data,
        lastYear: responseYear.data.Data.Data,
      };
    }

    return prices;
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    return null;
  }
};

// Conversion function remains the same
export const convertWeiToUSD = (wei) => {
  const etherValue = web3.utils.fromWei(wei, "ether");
  return etherValue;
};
