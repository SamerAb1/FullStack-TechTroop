import Tweet from "./Tweet";
import { useTweets } from "../context/TweetsContext";
import { useUser } from "../context/UserContext";

export default function TweetList() {
  const { tweets, deletingKey, deleteTweet } = useTweets();
  const { userName } = useUser();

  if (!tweets.length)
    return <p className="empty">No tweets yet. Be the first!</p>;

  const keyFor = (t) => `${t.userName}__${t.date}`;

  return (
    <section className="list">
      {tweets.map((t) => {
        const k = keyFor(t);
        return (
          <Tweet
            key={t.id ?? k}
            tweet={t}
            canDelete={t.userName === userName}
            isDeleting={deletingKey === k}
            onDelete={() => deleteTweet(t)}
          />
        );
      })}
    </section>
  );
}
