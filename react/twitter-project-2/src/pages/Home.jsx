import { useEffect, useState } from "react";
import TweetComposer from "../components/TweetComposer";
import TweetList from "../components/TweetList";
import { useUser } from "../context/UserContext";

const API_BASE = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";
const API = (path = "") =>
  `${API_BASE}${path}${path.includes("?") ? "&" : "?"}apikey=${API_KEY}`;

export default function Home() {
  const { userName } = useUser();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingKey, setDeletingKey] = useState("");

  const keyFor = (t) => `${t.userName}__${t.date}`;

  useEffect(() => {
    (async function fetchTweets() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API("?select=*&order=date.desc"), {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        setTweets(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd({ content }) {
    setLoading(true);
    setError("");
    try {
      const body = {
        content: content.trim(),
        userName, // use current user name
        date: new Date().toISOString(),
      };

      const res = await fetch(API(), {
        method: "POST",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Save failed (${res.status}): ${txt}`);
      }
      const [saved] = await res.json();
      setTweets((prev) => [saved, ...prev]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(tweet) {
    setError("");
    const k = keyFor(tweet);
    setDeletingKey(k);
    try {
      const qs =
        `?userName=eq.${encodeURIComponent(tweet.userName)}` +
        `&date=eq.${encodeURIComponent(tweet.date)}`;
      const res = await fetch(API(qs), {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Delete failed (${res.status}): ${txt}`);
      }
      setTweets((prev) => prev.filter((t) => keyFor(t) !== k));
    } catch (e) {
      setError(e.message);
    } finally {
      setDeletingKey("");
    }
  }

  return (
    <>
      {error && <div className="error-box">{error}</div>}
      <TweetComposer onAdd={handleAdd} disabled={loading} />
      {loading && <p>Loading...</p>}
      <TweetList
        tweets={tweets}
        currentUser={userName}
        onDelete={handleDelete}
        deletingKey={deletingKey}
      />
    </>
  );
}
