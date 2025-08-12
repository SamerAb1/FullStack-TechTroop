import { useState, useEffect } from "react";
import getData from "./dataService";

export default function Exercise2() {
  const [posts, setPosts] = useState([]);

  const setPostsArray = (data) => {
    let newPosts = [];
    for (let i = 0; i < 10; i++) {
      newPosts.push(data[Math.floor(Math.random() * data.length)]);
    }
    setPosts(newPosts);
  };

  useEffect(() => {
    const getPostsData = async function () {
      const data = await getData();

      setPostsArray(data);
    };
    getPostsData();
  }, []);

  console.log(`test: ${posts}`);
  return (
    <div>
      <h1>Top Posts</h1>
      <div className="grid">
        {posts.map((post, idx) => (
          <article key={post?.id ?? idx} className="card">
            <h2 className="card__title">{post?.title}</h2>
            <p className="card__body">{post?.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
