const Renderer = function () {
  // Helper: generates the HTML for a single comment
  const createCommentHTML = (comment) => {
    return `
    <div class="comment-container">
      <span class="delete-comment" data-id="${comment.id}">x</span>
      <span class="comment" data-id="${comment.id}">${comment.text}</span>
    </div>
  `;
  };

  // Helper: generates the HTML for a single post including all its comments
  const createPostHTML = (post) => {
    const commentsHTML = post.comments.map(createCommentHTML).join("");

    return `
      <div class="post" data-id="${post.id}">
        <div class="post-text">${post.text}</div>
        
        <div class="comments">
          ${commentsHTML}
        </div>
        <input type="text" placeholder="Got something to say?" class="comment-input">
        <button class="comment-button">Comment</button>
        <div class="delete" data-id="${post.id}">Delete Post</div>
      </div>
    `;
  };

  // Main rendering function
  const renderPosts = function (posts) {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear all existing posts

    for (const post of posts) {
      const postHTML = createPostHTML(post);
      postsContainer.insertAdjacentHTML("beforeend", postHTML);
    }
  };

  return { renderPosts };
};
