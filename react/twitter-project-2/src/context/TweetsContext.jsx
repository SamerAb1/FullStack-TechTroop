import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";
const API = (path = "") =>
  `${API_BASE}${path}${path.includes("?") ? "&" : "?"}apikey=${API_KEY}`;
const SELECT = "?select=*&order=date.desc";

const TweetsCtx = createContext(null);
export function useTweets() {
  return useContext(TweetsCtx);
}

const keyFor = (t) => `${t.userName}__${t.date}`;
const mergeTweets = (prev, fetched) => {
  const map = new Map(prev.map((t) => [keyFor(t), t]));
  for (const row of fetched) {
    const k = keyFor(row);
    if (!map.has(k)) map.set(k, row);
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [error, setError] = useState("");

  // initial load
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API(SELECT), {
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

  // polling for new tweets every 15s
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await fetch(API(SELECT), {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) return; // quiet fail
        const data = await res.json();
        setTweets((prev) => mergeTweets(prev, data));
      } catch {
        /* ignore transient errors */
      }
    }, 15000);
    return () => clearInterval(id);
  }, []);

  async function createTweet(content, userName) {
    if (creating) return;
    setCreating(true);
    setError("");
    try {
      const body = {
        content: content.trim(),
        userName,
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
      // add to current list without refetch
      setTweets((prev) => [saved, ...prev]);
    } catch (e) {
      setError(e.message || "Failed to save tweet");
      throw e;
    } finally {
      setCreating(false);
    }
  }

  async function deleteTweet(tweet) {
    const k = keyFor(tweet);
    setDeletingKey(k);
    setError("");
    try {
      const qs = `?userName=eq.${encodeURIComponent(
        tweet.userName
      )}&date=eq.${encodeURIComponent(tweet.date)}`;
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
      setError(e.message || "Failed to delete tweet");
    } finally {
      setDeletingKey("");
    }
  }

  const value = useMemo(
    () => ({
      tweets,
      loading,
      creating,
      deletingKey,
      error,
      setError,
      createTweet,
      deleteTweet,
    }),
    [tweets, loading, creating, deletingKey, error]
  );

  return <TweetsCtx.Provider value={value}>{children}</TweetsCtx.Provider>;
}
