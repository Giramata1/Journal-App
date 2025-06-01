"use client";

import { useState } from "react";
import { EntryInput } from "@/lib/types";


export interface EntryFormProps {
  onSave: (entry: EntryInput) => void;
  onCancel: () => void;
}

export default function EntryForm({ onSave, onCancel }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Journal Entry</h2>

      <div style={{ marginBottom: "16px" }}>
        <label>Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title"
          required
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label>Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          required
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
      >
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save Entry</button>
      </div>
    </form>
  );
}
