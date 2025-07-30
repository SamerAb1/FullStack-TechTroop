  const fetch = function (queryType, queryValue){
      $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${queryType}:${queryValue}`,
        success: function (data) {
            data.items.forEach(item => {
              console.log(`Book title: ${item.volumeInfo.title}`);
              console.log(`Book author: ${item.volumeInfo.authors[0]}`);
              console.log(`Book ISBN: ${item.volumeInfo.industryIdentifiers[0].identifier}`);
            });
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
  }
  
fetch("isbn", 9789814561778)
fetch("title", "How to Win Friends and Influence People")