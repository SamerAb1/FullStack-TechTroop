import { useTimeAgo } from "../lib/time";

export default function Tweet({ tweet }) {
  const { userName, content, date } = tweet;

  const rel = useTimeAgo(date);
  return (
    <article className="tweet">
      <header className="tweet__header">
        <span className="tweet__user">{userName}</span>
        <time className="tweet__time" dateTime={date} title={date}>
          {rel}
        </time>
      </header>
      <p className="tweet__text">{content}</p>
    </article>
  );
}
