import { Renderer } from "./ui.js";
const apiKey = "UGlpkOkaB118ZEpgk6J7BYbDcolSHuKU";
const renderer = new Renderer();

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

async function fetchProfilesForResults(results) {
  return Promise.all(
    results.map(async (stock) => {
      const url = `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=${apiKey}`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        return { ...stock, profile: data[0] || {} };
      } catch {
        return { ...stock, profile: {} };
      }
    })
  );
}

async function generateData(event) {
  try {
    const query = searchInput.value;
    if (query) {
      const stockResp = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
      );
      const stockData = await stockResp.json();

      if (stockData) {
        console.log(stockData);
        const enriched = await fetchProfilesForResults(stockData);
        localStorage.setItem("stockResults", JSON.stringify(enriched));
        renderer.renderData(enriched);
      } else {
        throw new Error("No Company or Stock Found");
      }
    } else {
      throw new Error("No Company or Stock entered");
    }
  } catch (err) {
    console.log("Error:", err.message);
    alert("Please Enter Valid Company or Stock");
  }
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  generateData(event);
});
export { apiKey };
