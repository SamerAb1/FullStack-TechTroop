import { useState } from "react";
import { useTweets } from "../context/TweetsContext";
import { useUser } from "../context/UserContext";

export default function TweetComposer() {
  const [text, setText] = useState("");
  const { creating, createTweet } = useTweets();
  const { userName } = useUser();

  const overLimit = text.length > 140;
  const canTweet = text.trim() !== "" && !overLimit && !creating;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canTweet) return;
    await createTweet(text, userName); // context handles POST + local add
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
        disabled={creating}
      />
      <div className="composer__footer">
        <button type="submit" className="btn btn--primary" disabled={!canTweet}>
          {creating ? "Posting..." : "Tweet"}
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
