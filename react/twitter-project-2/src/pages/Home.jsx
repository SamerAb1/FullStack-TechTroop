import TweetComposer from "../components/TweetComposer";
import TweetList from "../components/TweetList";
import { useTweets } from "../context/TweetsContext";

export default function Home() {
  const { loading, error } = useTweets();

  return (
    <>
      {error && <div className="error-box">{error}</div>}
      <TweetComposer />
      {loading && <p>Loading...</p>}
      <TweetList />
    </>
  );
}
