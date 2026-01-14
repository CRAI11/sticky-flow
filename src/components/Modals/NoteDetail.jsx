import { useModalContext } from "../../context/ModalContext";

export default function NoteDetail() {
  const { data } = useModalContext();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}
