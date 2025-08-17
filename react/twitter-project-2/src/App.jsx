import { useEffect, useState } from "react";
import "./App.css";
import TweetComposer from "./components/TweetComposer";
import TweetList from "./components/TweetList";

const API_BASE = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";
const API = (path = "") =>
  `${API_BASE}${path}${path.includes("?") ? "&" : "?"}apikey=${API_KEY}`;

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tweets on mount
  useEffect(() => {
    // inside useEffect
    async function fetchTweets() {
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
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Fetch failed (${res.status}): ${txt}`);
        }
        const data = await res.json();
        setTweets(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTweets();
  }, []);

  // Add new tweet (POST to server)
  async function handleAdd(tweet) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API(), {
        method: "POST",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(tweet), // { content, userName, date }
      });

      if (!res.ok) {
        // Supabase/PostgREST returns helpful JSON on error
        let details = await res.text();
        try {
          const j = JSON.parse(details);
          details = j.message || j.error || details;
        } catch {}
        throw new Error(`Save failed (${res.status}): ${details}`);
      }

      const [saved] = await res.json(); // because Prefer:return=representation
      setTweets((prev) => [saved, ...prev]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="brand">Tweeter 2.0</h1>
      </header>

      <main className="column">
        {error && <div className="error-box">{error}</div>}
        <TweetComposer onAdd={handleAdd} disabled={loading} />
        {loading && <p>Loading...</p>}
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
}
