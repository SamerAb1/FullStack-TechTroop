import React, { useEffect, useState } from "react";
import "./NoteForm.css";

export default function NoteForm({
  initial = { title: "", text: "" },
  onSubmit,
  cta = "Add",
  clearOnSubmit = true,
}) {
  const [title, setTitle] = useState(initial.title || "");
  const [text, setText] = useState(initial.text || "");

  // Only reset when initial changes (e.g., opening another note)
  useEffect(() => {
    setTitle(initial.title || "");
    setText(initial.text || "");
  }, [initial.title, initial.text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter note text!");
    onSubmit({ title, text });
    if (clearOnSubmit) {
      setTitle("");
      setText("");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="nf-title"
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="nf-text"
        placeholder="Your note…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="nf-btn" type="submit">
        {cta}
      </button>
    </form>
  );
}
