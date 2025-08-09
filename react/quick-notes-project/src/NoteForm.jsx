import React, { useEffect, useState } from "react";
import "./NoteForm.css";

export default function NoteForm({
  initial = { title: "", text: "", category: "" },
  onSubmit,
  cta = "Add",
  clearOnSubmit = true,
  categories = [],
}) {
  const [title, setTitle] = useState(initial.title || "");
  const [text, setText] = useState(initial.text || "");
  const [category, setCategory] = useState(
    initial.category || (categories[0]?.key ?? "")
  );

  useEffect(() => {
    setTitle(initial.title || "");
    setText(initial.text || "");
    setCategory(initial.category || (categories[0]?.key ?? ""));
  }, [initial.title, initial.text, initial.category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter note text!");
    onSubmit({ title, text, category });
    if (clearOnSubmit) {
      setTitle("");
      setText("");
      setCategory(categories[0]?.key ?? "");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="row">
        <input
          className="nf-title"
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!!categories.length && (
          <select
            className="nf-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        )}
      </div>

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
