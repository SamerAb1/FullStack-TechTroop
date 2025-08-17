const STORAGE_KEY = "tweets_v1";

export function loadTweets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTweets(tweets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets));
}
