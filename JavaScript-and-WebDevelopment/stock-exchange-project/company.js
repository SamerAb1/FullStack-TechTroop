const apiKey = "UGlpkOkaB118ZEpgk6J7BYbDcolSHuKU";
const params = new URLSearchParams(window.location.search);
const symbol = params.get("symbol");

function renderProfile(profile, symbol) {
  document.getElementById("company-logo").src = profile.image || "";
  document.getElementById("company-logo").alt = profile.companyName || "";
  document.getElementById("company-name").textContent =
    profile.companyName || symbol;
  document.getElementById("company-description").textContent =
    profile.description || "No description available.";
  document.getElementById("stock-price").textContent = `Stock price: $${Number(
    profile.price
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const changeSpan = document.getElementById("stock-change");
  let changes = profile.changes;
  if (changes) {
    const value = parseFloat(changes);
    changeSpan.textContent = ` (${value > 0 ? "+" : ""}${value.toFixed(2)}%)`;
    changeSpan.className = value > 0 ? "positive" : "negative";
  } else {
    changeSpan.textContent = "";
    changeSpan.className = "";
  }
}

async function fetchProfileFromAPI(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch company profile.");
  const data = await resp.json();
  if (!data[0]) throw new Error("No company profile found.");
  return data[0];
}

async function showCompanyProfile(symbol) {
  document.getElementById("loading-indicator").hidden = false;
  let profile = null;

  const saved = localStorage.getItem("stockResults");
  if (saved) {
    const arr = JSON.parse(saved);
    console.log(arr);
    const found = arr.find((item) => item.symbol === symbol && item.profile);
    if (found && found.profile) profile = found.profile;
  }

  if (!profile) profile = await fetchProfileFromAPI(symbol);

  renderProfile(profile, symbol);
  document.getElementById("loading-indicator").hidden = true;
  fetchAndRenderChart(symbol);
}

async function fetchAndRenderChart(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Failed to fetch price history.");
    const data = await resp.json();
    if (!data || !data.historical || !data.historical.length) {
      throw new Error("No price history found.");
    }
    const labels = data.historical.map((item) => item.date).reverse();
    const prices = data.historical.map((item) => item.close).reverse();
    const ctx = document.getElementById("price-chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Stock Price History",
            data: prices,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.18)",
            borderColor: "#ff4081",
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.15,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: { color: "#222" },
          },
        },
        scales: {
          x: {
            display: true,
            ticks: { color: "#222" },
          },
          y: {
            display: true,
            ticks: { color: "#222" },
          },
        },
      },
    });
  } catch (err) {
    document.getElementById(
      "chart-section"
    ).innerHTML = `<p style="color:red">${err.message}</p>`;
  }
}

if (!symbol) {
  document.getElementById("company-container").innerHTML = `
    <p style="color: #e23d4a; font-size: 1.3rem;">
      Error: No company symbol provided in the URL.<br>
      <a href="index.html" style="color:#5353fd">Go back to search</a>
    </p>
  `;
}
showCompanyProfile(symbol).catch((err) => {
  document.getElementById("loading-indicator").hidden = true;
  document.getElementById(
    "company-container"
  ).innerHTML = `<p style="color:red">${err.message}</p>`;
});
