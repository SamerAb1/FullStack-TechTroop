import Tweet from "./Tweet";

export default function TweetList({ tweets }) {
  if (!tweets.length) {
    return <p className="empty">No tweets yet. Be the first!</p>;
  }

  return (
    <section className="list">
      {tweets.map((t) => (
        <Tweet key={t.id} tweet={t} />
      ))}
    </section>
  );
}
