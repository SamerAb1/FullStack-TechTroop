// Starter code structure:
async function getDashboard() {
  try {
    const responseUsers = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    );
    if (!responseUsers.ok) {
      throw new Error("Users not found");
    }
    const users = await responseUsers.json();

    const responsePosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts`
    );
    if (!responsePosts.ok) {
      throw new Error("Posts not found");
    }
    const posts = await responsePosts.json();

    const responseComments = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    );
    if (!responseComments.ok) {
      throw new Error("comments not found");
    }
    const comments = await responseComments.json();

    const totalUsers = users.length;
    const totalPosts = posts.length;
    const totalComments = comments.length;

    // Count posts per user
    const postCounts = {};
    posts.forEach((post) => {
      postCounts[post.userId] = (postCounts[post.userId] || 0) + 1;
    });

    // Count comments per post
    const commentCounts = {};
    comments.forEach((comment) => {
      commentCounts[comment.postId] = (commentCounts[comment.postId] || 0) + 1;
    });

    // Top users
    const topUsers = users
      .map((user) => {
        const userPosts = posts.filter((p) => p.userId === user.id);
        const postCount = userPosts.length;
        const commentCount = userPosts.reduce((sum, post) => {
          return sum + (commentCounts[post.id] || 0);
        }, 0);
        return {
          name: user.name,
          postCount,
          commentCount,
        };
      })
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 3);

    // Last 5 posts by highest ID
    const recentPosts = [...posts].sort((a, b) => b.id - a.id).slice(0, 5);

    return {
      summary: {
        totalUsers,
        totalPosts,
        totalComments,
        avgPostsPerUser: Math.floor(totalPosts / totalUsers),
        avgCommentsPerPost: Math.floor(totalComments / totalPosts),
      },
      topUsers,
      recentPosts,
    };
  } catch (error) {
    console.error("Error fetching: ", error.message);
    return null;
  }
}

const userObj = getDashboard();
getDashboard().then((userObj) => {
  if (userObj) {
    console.log(userObj);
  }
});
