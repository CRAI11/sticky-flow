export default function NoteCard({ note, onClick }) {

  return (
    <div className="note" onClick={onClick}>
      {note.title && <h4 className="note-title">{note.title}</h4>}
      <div className="note-content">{note.content}</div>
      <div className="note-footer">{note.created_on}</div>
    </div>
  );
}
