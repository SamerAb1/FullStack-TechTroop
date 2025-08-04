export class Renderer {
  renderData(stockData) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    stockData.forEach((stock) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.gap = "14px";

      const img = document.createElement("img");
      img.src = stock.profile?.image || "default-logo.png";
      img.alt = stock.name;
      img.className = "result-logo";

      const a = document.createElement("a");
      a.href = `company.html?symbol=${encodeURIComponent(stock.symbol)}`;
      a.textContent = stock.name;

      const symbolSpan = document.createElement("span");
      symbolSpan.textContent = `(${stock.symbol})`;

      const percentSpan = document.createElement("span");
      let changes = stock.profile.changes;
      if (changes) {
        const value = parseFloat(changes);
        percentSpan.textContent = `(${value > 0 ? "+" : ""}${value.toFixed(
          2
        )}%)`;
        percentSpan.className = value > 0 ? "positive" : "negative";
      }

      li.appendChild(img);
      li.appendChild(a);
      li.appendChild(symbolSpan);
      if (percentSpan.textContent) li.appendChild(percentSpan);
      resultsList.appendChild(li);
    });
  }
}
