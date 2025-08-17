import { useState, useMemo } from "react";
const USERNAME = "Samer";

export default function TweetComposer({ onAdd }) {
  const [text, setText] = useState("");
  const length = text.length;
  const overLimit = length > 140;
  const canTweet = text.trim() !== "" && !overLimit;
  const remaining = useMemo(() => 140 - length, [length]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canTweet) return;
    const tweet = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      user: USERNAME,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    onAdd(tweet);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="composer">
      <textarea
        className={`composer__input ${
          overLimit ? "composer__input--error" : ""
        }`}
        placeholder="What you have in mind..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <div className="composer__footer">
        <button type="submit" className="btn btn--primary" disabled={!canTweet}>
          Tweet
        </button>
      </div>

      {overLimit && (
        <div className="composer__error">
          The tweet can't contain more than 140 chars.
        </div>
      )}
    </form>
  );
}
