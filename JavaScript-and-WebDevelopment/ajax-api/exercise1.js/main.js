  const fetch = function (ISBAN){
      $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBAN}`,
        success: function (data) {
            console.log(data)
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
  }
  
fetch(9780575087057);