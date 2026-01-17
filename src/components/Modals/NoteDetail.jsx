import "./NoteDetail.css";
import { useModalContext } from "../../context/ModalContext";
import { useEffect, useRef, useState } from "react";

const defaultDraft = {
  title: "",
  content: "",
};

export default function NoteDetail() {
  const { data, actions } = useModalContext();
  const [draft, setDraft] = useState(data || defaultDraft);

  const draftRef = useRef(draft);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    return () => {
      console.log("Save effect rendered")
      actions.handleSave(draftRef.current);
    };
  }, [actions.handleSave]);

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
