import { useEffect, useMemo, useState } from "react";
import "./App.css";
import TweetComposer from "./components/TweetComposer";
import TweetList from "./components/TweetList";
import { loadTweets, saveTweets } from "./lib/storage";

export default function App() {
  const [tweets, setTweets] = useState(() => loadTweets());
  const sortedTweets = useMemo(
    () =>
      [...tweets].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [tweets]
  );

  useEffect(() => {
    saveTweets(sortedTweets);
  }, [sortedTweets]);

  function handleAdd(tweet) {
    setTweets((prev) => [tweet, ...prev]);
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="brand">Tweeter 2.0</h1>
      </header>

      <main className="column">
        <TweetComposer onAdd={handleAdd} />
        <TweetList tweets={sortedTweets} />
      </main>
    </div>
  );
}
