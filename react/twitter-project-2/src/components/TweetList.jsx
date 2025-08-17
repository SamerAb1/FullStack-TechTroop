// src/components/TweetList.jsx
import Tweet from "./Tweet";

export default function TweetList({
  tweets,
  currentUser,
  onDelete,
  deletingKey,
}) {
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
            canDelete={t.userName === currentUser}
            isDeleting={deletingKey === k}
            onDelete={() => onDelete(t)}
          />
        );
      })}
    </section>
  );
}
