const tweet = function () {
  const posts = [
    {
      text: "First post!",
      id: "p1",
      comments: [
        { id: "c1", text: "First comment on first post!" },
        { id: "c2", text: "Second comment on first post!!" },
        { id: "c3", text: "Third comment on first post!!!" },
      ],
    },
    {
      text: "Aw man, I wanted to be first",
      id: "p2",
      comments: [
        {
          id: "c4",
          text: "Don't worry second poster, you'll be first one day.",
        },
        { id: "c5", text: "Yeah, believe in yourself!" },
        { id: "c6", text: "Haha second place what a joke." },
      ],
    },
  ];

  let postIdCounter = 3;
  let commentIdCounter = 7;

  const getPosts = () => posts;

  const addPost = function (text) {
    const newPost = {
      text,
      id: `p${postIdCounter++}`,
      comments: [],
    };
    posts.push(newPost);
  };

  const removePost = function (postID) {
    posts = posts.filter((post) => post.id !== postID);
  };

  const addComment = function (postID, text) {
    const post = posts.find((p) => p.id === postID);
    if (post) {
      post.comments.push({
        id: `c${commentIdCounter++}`,
        text,
      });
    }
  };

  const removeComment = function (postID, commentID) {
    const post = posts.find((p) => p.id === postID);
    if (post) {
      post.comments = post.comments.filter(
        (comment) => comment.id !== commentID
      );
    }
  };

  return {
    getPosts,
    addPost,
    removePost,
    addComment,
    removeComment,
  };
};

const tweeter = Tweeter();

// Test adding a post
tweeter.addPost("This is my own post!");
console.log(tweeter.getPosts());
// Should add: {text: "This is my own post!", id: "p3", comments: []}

// Test removing a post
tweeter.removePost("p1");
console.log(tweeter.getPosts());
// Should only have two posts left

// Test adding comments
tweeter.addComment("p3", "Damn straight it is!");
tweeter.addComment("p2", "Second the best!");
console.log(tweeter.getPosts());

// Test removing comments
tweeter.removeComment("p2", "c6");
console.log(tweeter.getPosts());
