const fetch = function (queryValue, apiKey) {
  $.ajax({
    method: "GET",
    url: `https://api.giphy.com/v1/gifs/search?q=${queryValue}&api_key=${apiKey}`,
    success: function (result) {
      if (result.data && result.data.length > 0) {
        let url = result.data[1].embed_url;
        console.log(result);

        // Create and append an <img> element to the body
        const gif = $("<iframe>").attr("src", url);
        $("body").append(gif);
      }
    },
    error: function (xhr, text, error) {
      console.log(text);
    },
  });
};

fetch("cats", "API_Key");
