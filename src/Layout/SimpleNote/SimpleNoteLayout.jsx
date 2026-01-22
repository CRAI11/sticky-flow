import "./SimpleNoteLayout.css";
import NoteCard from "../../components/NoteCard/NoteCard";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../../components/Modals/Modal";
import { useNotes } from "../../context/NoteContext";

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

  const { notes, getNotes, activeNote, setActiveNote } = useNotes();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      await getNotes(controller.signal);
    })();

    return () => {
      controller.abort("Component unmounting");
    };
  }, []);

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
        isOpen={isOpen}
        onClose={handleClose}
        children={<Modal.NoteDetail />}
      />
    </>
  );
}
