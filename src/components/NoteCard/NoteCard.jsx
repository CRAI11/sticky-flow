export default function NoteCard({ info, actions }) {
  const { note } = info
  const handleClick = () => {
    actions.open();
    actions.setActiveNote(note);
  };

  return (
    <div className="note" onClick={handleClick}>
      {note.title && <h4 className="note-title">{note.title}</h4>}
      <div className="note-content">{note.content}</div>
      <div className="note-footer">{note.created_on}</div>
    </div>
  );
}
