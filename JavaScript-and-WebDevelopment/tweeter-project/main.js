const tweeter = Tweeter();
const renderer = Renderer();

// Initial render
renderer.renderPosts(tweeter.getPosts());

// Handle Twit button (create post)
document.getElementById("post").addEventListener("click", () => {
  const input = document.getElementById("input");
  const text = input.value.trim();

  if (text) {
    tweeter.addPost(text);
    input.value = "";
    renderer.renderPosts(tweeter.getPosts());
  }
});

// Event delegation for dynamic elements inside #posts
document.getElementById("posts").addEventListener("click", (event) => {
  const target = event.target;

  // DELETE POST
  if (target.classList.contains("delete")) {
    const postId = target.getAttribute("data-id");
    tweeter.removePost(postId);
    renderer.renderPosts(tweeter.getPosts());
    return;
  }

  // DELETE COMMENT
  if (target.classList.contains("delete-comment")) {
    const commentId = target.getAttribute("data-id");
    const postDiv = target.closest(".post");
    const postId = postDiv.getAttribute("data-id");
    tweeter.removeComment(postId, commentId);
    renderer.renderPosts(tweeter.getPosts());
    return;
  }

  // ADD COMMENT
  if (target.classList.contains("comment-button")) {
    const postDiv = target.closest(".post");
    const postId = postDiv.getAttribute("data-id");
    const input = postDiv.querySelector(".comment-input");
    const text = input.value.trim();

    if (text) {
      tweeter.addComment(postId, text);
      input.value = "";
      renderer.renderPosts(tweeter.getPosts());
    }
  }
});
