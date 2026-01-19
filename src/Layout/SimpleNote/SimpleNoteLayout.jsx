import "./SimpleNoteLayout.css";
import NoteCard from "../../components/NoteCard/NoteCard";
import useModal from "../../hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "../../components/Modals/Modal";
import { getNotes } from "../../services/noteService";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SimpleNoteLayout() {
  const { isOpen, open, close } = useModal();
  const [notes, setNotes] = useState({});
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNotes = async () => {
      try {
        const response = await getNotes(controller.signal);
        const notesObject = Object.values(response)?.reduce((acc, note) => {
          acc[note.id] = note;
          return acc;
        }, {});
        // console.log(Object.entries(response))
        // const notesObject = Object.fromEntries(
        //   notesData.map((note) => [note.id, note]),
        // );
        setNotes(notesObject);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      }
    };

    fetchNotes();

    return () => {
      controller.abort("Component unmounting");
    };
  }, []);

  const handleSave = useCallback(
    (updatedNote) => {
      if (!activeNote) return;
      console.log({ updatedNote, activeNote });
      setNotes((prevState) => ({
        ...prevState,
        [activeNote.id]: { ...updatedNote },
      }));
    },
    [activeNote],
  );

  const handleClose = () => {
    close();
    setActiveNote(null);
  };

  return (
    <>
      <motion.div
        className="layout-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.values(notes).map((note) => (
          <motion.div
            key={note.id}
            variants={itemVariants}
            animate={{
              opacity: isOpen && activeNote?.id === note.id ? 0 : 1,
              transition: { duration: 0.3 },
            }}
          >
            <NoteCard info={{ note }} actions={{ setActiveNote, open }} />
          </motion.div>
        ))}
      </motion.div>

      <Modal
        data={activeNote}
        isOpen={isOpen}
        onClose={handleClose}
        actions={{ handleSave }}
        children={<Modal.NoteDetail />}
      />
    </>
  );
}
