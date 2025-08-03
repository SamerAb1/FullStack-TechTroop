import { Renderer } from "./ui.js";
const apiKey = "UGlpkOkaB118ZEpgk6J7BYbDcolSHuKU--";
const renderer = new Renderer();
const simplifiedStocks = [
  {
    symbol: "AAL",
    name: "American Airlines Group Inc.",
    currency: "USD",
    stockExchange: "NASDAQ Global Select",
  },
  {
    symbol: "AAXJ",
    name: "iShares MSCI All Country Asia ex Japan ETF",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
  {
    symbol: "AAWW",
    name: "Atlas Air Worldwide Holdings, Inc.",
    currency: "USD",
    stockExchange: "NASDAQ Global Select",
  },
  {
    symbol: "AAVM",
    name: "Alpha Architect Global Factor Equity ETF",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
  {
    symbol: "AARD",
    name: "Aardvark Therapeutics, Inc. Common Stock",
    currency: "USD",
    stockExchange: "NASDAQ Global Select",
  },
  {
    symbol: "AAPU",
    name: "Direxion Daily AAPL Bull 1.5X Shares",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currency: "USD",
    stockExchange: "NASDAQ Global Select",
  },
  {
    symbol: "AAPG",
    name: "Ascentage Pharma Group International",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
  {
    symbol: "AAPD",
    name: "Direxion Daily AAPL Bear 1X Shares",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
  {
    symbol: "AAPB",
    name: "GraniteShares ETF Trust - GraniteShares 2x Long Tilray Daily ETF",
    currency: "USD",
    stockExchange: "NASDAQ Global Market",
  },
];

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

async function generateData() {
  event.preventDefault();
  try {
    const query = searchInput.value;
    console.log(query);
    if (query) {
      // const stockResp = await fetch(
      //   `https://financialmodelingprep.com//api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
      // );
      const stockData = simplifiedStocks;
      if (stockData) {
        renderer.renderData(stockData);
      } else {
        throw new Error("No Company or Stock Found");
      }
    } else {
      throw new Error("No Company or Stock entered");
    }
  } catch (error) {
    console.log("Input Error", error.message);
    alert("Please Enter Valid Company or Stock");
  }
}

searchBtn.addEventListener("click", generateData);
