export default function Tweet({ tweet }) {
  const { user, text, createdAt } = tweet;
  return (
    <article className="tweet">
      <header className="tweet__header">
        <span className="tweet__user">{user}</span>
        <time className="tweet__time">{createdAt}</time>
      </header>
      <p className="tweet__text">{text}</p>
    </article>
  );
}
