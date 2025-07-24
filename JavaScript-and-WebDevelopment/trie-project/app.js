import handleCommand, { trie } from "./commandHandler.js";

const txtInput = document.getElementsByClassName("word-input")[0];
const addBtn = document.getElementsByClassName("add-word-btn")[0];
const notification = document.getElementById("notification");
const countSpan = document.querySelector(".count");
const suggestionsInput = document.querySelector(".suggestions-input");
const suggestionsList = document.getElementById("suggestions-list");

let wordCounter = 0;
let notifTimeout = null;

function showNotification(result) {
  // result: {message, type}
  let { message, type } = result;
  let color = "#1d4525";
  let bg = "#c9f7cb";
  let icon = `<span class="checkmark">&#10003;</span>`;
  if (type === "fail") {
    color = "#9e1616";
    bg = "#ffdede";
    icon = `<span style="font-weight:bold;">&#10007;</span>`;
  } else if (type === "info") {
    color = "#2a3d88";
    bg = "#e4eaff";
    icon = `<span style="font-weight:bold;">&#9432;</span>`;
  }
  notification.innerHTML = `${icon} ${message}`;
  notification.style.display = "flex";
  notification.style.background = bg;
  notification.style.color = color;
  notification.style.opacity = "1";
  if (notifTimeout) clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.style.display = "none";
      notification.style.opacity = "1";
    }, 500);
  }, 10000);

  if (type === "success") {
    document.querySelector(".count").innerHTML = ++wordCounter;
  }
}

suggestionsInput.addEventListener("input", function () {
  const prefix = this.value.trim();
  if (!prefix) {
    suggestionsList.style.display = "none";
    return;
  }

  // Use your trie (imported from commandHandler or wherever)
  const words = trie.predictWords(prefix); // trie should be imported!

  if (words.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  // Render suggestions with the prefix highlighted
  suggestionsList.innerHTML = words
    .map((word) => {
      // Highlight only the matching prefix at the start
      const re = new RegExp(`^(${prefix})`, "i");
      const highlighted = word.replace(
        re,
        `<span class="suggestion-highlight">$1</span>`
      );
      return `<div class="suggestion-item">${highlighted}</div>`;
    })
    .join("");
  suggestionsList.style.display = "block";
});

// Hide suggestions when input loses focus (after short delay)
suggestionsInput.addEventListener("blur", () => {
  setTimeout(() => (suggestionsList.style.display = "none"), 150);
});

// Fill input on suggestion click
suggestionsList.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("suggestion-item")) {
    suggestionsInput.value = e.target.textContent;
    suggestionsList.style.display = "none";
  }
});

addBtn.onclick = () => {
  const word = txtInput.value.trim();
  if (!word) return;
  handleCommand("add", [word], showNotification);
};
