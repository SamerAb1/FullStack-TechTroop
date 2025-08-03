export class Renderer {
  renderData(stockData) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    stockData.forEach((stock) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `company.html?symbol=${encodeURIComponent(stock.symbol)}`;
      a.textContent = `${stock.name} (${stock.symbol})`;

      li.appendChild(a);
      resultsList.appendChild(li);
    });
  }
}
