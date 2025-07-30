// Starter code structure:
async function getUserWithPosts(userId) {
  try {
    const responseUser = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!responseUser.ok) {
      throw new Error("User not found");
    }
    const user = await responseUser.json();
    const responsePosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!responsePosts.ok) {
      throw new Error("No Posts found");
    }
    const posts = await responsePosts.json();
    return { user: user, posts: posts };
  } catch (error) {
    console.error("Error fetching: ", error.message);
  }
  // Your implementation here
  // 1. Fetch user from: https://jsonplaceholder.typicode.com/users/${userId}
  // 2. Fetch posts from: https://jsonplaceholder.typicode.com/posts?userId=${userId}
  // 3. Return combined data
}
const userObj = getUserWithPosts(1);
getUserWithPosts(1).then((userObj) => {
  if (userObj) {
    console.log(userObj.user);
    console.log(userObj.posts);
  }
});
