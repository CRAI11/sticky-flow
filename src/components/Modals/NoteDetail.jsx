import "./NoteDetail.css";
import { useEffect, useRef, useState } from "react";
import { useNotes } from "../../context/NoteContext";

const defaultDraft = {
  title: "",
  content: "",
};

export default function NoteDetail() {
  const { activeNote, updateNotes, createNotes } = useNotes();
  const [draft, setDraft] = useState(activeNote || defaultDraft);

  const draftRef = useRef(draft);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    return () => {
      const finalDraft = draftRef.current;

      if (!finalDraft.title && !finalDraft.content) {
        console.log("Empty note, not saving.");
        return;
      }

      if (finalDraft.id === "new") {
        createNotes(finalDraft);
      } else {
        updateNotes(finalDraft);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextareaChange = (e) => {
    handleChange(e);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="note-detail-form">
      <input
        type="text"
        name="title"
        className="note-title-input"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        className="note-content-textarea"
        value={draft.content}
        onChange={handleTextareaChange}
        placeholder="Take a note..."
        rows={20}
      />
    </div>
  );
}
