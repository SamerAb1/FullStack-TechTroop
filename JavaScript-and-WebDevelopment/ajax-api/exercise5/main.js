const apiKey = "API_key";
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("gif-container");
const fetch = function (queryValue, apiKey) {
  $.ajax({
    method: "GET",
    url: `https://api.giphy.com/v1/gifs/search?q=${queryValue}&api_key=${apiKey}`,
    success: function (result) {
      if (result.data && result.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * result.data.length);
        let url = result.data[randomIndex].embed_url;
        console.log(result);

        // Clear previous content
        $("#gif-container").empty();
        // add a new gif to the container
        const gif = $("<iframe>").attr("src", url);
        $("#gif-container").append(gif);
      }
    },
    error: function (xhr, text, error) {
      console.log(text);
    },
  });
};
searchBtn.onclick = () => {
  const query = input.value.trim();
  if (query) fetch(query, apiKey);
};
