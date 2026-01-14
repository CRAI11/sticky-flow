export default function NoteCard({ note, actions }) {
  const handleClick = () => {
    actions.setSelectedNote(note);
    actions.open();
  };

  return (
    <div className="note" onClick={handleClick}>
      {note.title && <h4 className="note-title">{note.title}</h4>}
      <div className="note-content">{note.content}</div>
      <div className="note-footer">{note.created_on}</div>
    </div>
  );
}
