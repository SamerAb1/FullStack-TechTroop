import { useState } from "react";

export default function TweetComposer({ onAdd, disabled }) {
  const [text, setText] = useState("");
  const overLimit = text.length > 140;
  const canTweet = text.trim() !== "" && !overLimit && !disabled;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canTweet) return;
    await onAdd({ content: text }); // Home will add userName + date
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
        disabled={disabled}
      />
      <div className="composer__footer">
        <button type="submit" className="btn btn--primary" disabled={!canTweet}>
          {disabled ? "Posting..." : "Tweet"}
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
