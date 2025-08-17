// src/lib/time.js
export function timeAgo(iso) {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const diffSec = Math.round((new Date(iso) - new Date()) / 1000); // negative = past

  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(Math.trunc(diffSec), "second");

  const diffMin = Math.trunc(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");

  const diffHr = Math.trunc(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");

  const diffDay = Math.trunc(diffHr / 24);
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, "day");

  const diffWeek = Math.trunc(diffDay / 7);
  if (Math.abs(diffWeek) < 5) return rtf.format(diffWeek, "week");

  const diffMonth = Math.trunc(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month");

  const diffYear = Math.trunc(diffDay / 365);
  return rtf.format(diffYear, "year");
}

// Re-renders every minute so the label stays fresh
import { useEffect, useState } from "react";
export function useTimeAgo(iso) {
  const [label, setLabel] = useState(() => timeAgo(iso));
  useEffect(() => {
    setLabel(timeAgo(iso));
    const id = setInterval(() => setLabel(timeAgo(iso)), 60_000);
    return () => clearInterval(id);
  }, [iso]);
  return label;
}
