// src/components/Tweet.jsx
import { useTimeAgo } from "../lib/time";

export default function Tweet({ tweet, canDelete, onDelete, isDeleting }) {
  const { userName, content, date } = tweet;
  const rel = useTimeAgo(date);

  return (
    <article className="tweet">
      <header className="tweet__header">
        <span className="tweet__user">{userName}</span>
        <div className="tweet__meta">
          <time className="tweet__time" dateTime={date} title={date}>
            {rel}
          </time>
          {canDelete && (
            <button
              className="btn btn--danger btn--sm"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </header>
      <p className="tweet__text">{content}</p>
    </article>
  );
}
