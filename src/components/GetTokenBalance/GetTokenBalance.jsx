import axios from "axios";
import Web3 from "web3";

//implemented chainLinks price feeds but didn't work well at end

const web3 = new Web3();
const COINGECKO_API_URL1 =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
const COINGECKO_API_URL2 =
  "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD";
const COINGECKO_API_URL3 =
  "https://min-api.cryptocompare.com/data/price?fsym=LINK&tsyms=USD";
const COINGECKO_API_URL4 =
  "https://min-api.cryptocompare.com/data/price?fsym=AAVE&tsyms=USD";
const COINGECKO_API_URL5 =
  "https://min-api.cryptocompare.com/data/price?fsym=UNI&tsyms=USD";

export let usdPrice = 0;

export const getEthPriceInUSD = async () => {
  try {
    // let price;

    const response = await axios.get(COINGECKO_API_URL1, {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    });
    const response2 = await axios.get(COINGECKO_API_URL2, {
      params: {
        ids: "matic",
        vs_currencies: "usd",
      },
    });
    const response3 = await axios.get(COINGECKO_API_URL3, {
      params: {
        ids: "link",
        vs_currencies: "usd",
      },
    });
    const response4 = await axios.get(COINGECKO_API_URL4, {
      params: {
        ids: "aav",
        vs_currencies: "usd",
      },
    });
    const response5 = await axios.get(COINGECKO_API_URL5, {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    });

    const ethPriceInUSD = response.data.USD;
    const ethPriceInUSD2 = response2.data.USD;
    const ethPriceInUSD3 = response3.data.USD;
    const ethPriceInUSD4 = response4.data.USD;
    const ethPriceInUSD5 = response5.data.USD;

    return {
      ethPriceInUSD,
      ethPriceInUSD2,
      ethPriceInUSD3,
      ethPriceInUSD4,
      ethPriceInUSD5,
    };
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
    return null;
  }
};

export const convertWeiToUSD = (wei) => {
  const etherValue = web3.utils.fromWei(wei, "ether");
  return etherValue;
};
