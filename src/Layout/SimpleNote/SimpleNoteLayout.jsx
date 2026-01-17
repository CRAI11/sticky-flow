// const notesData = [
//   {
//     id: 1,
//     title: "This is first note",
//     created_on: "13/01/2026",
//     content:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
//   },
//   {
//     id: 2,
//     title: "This is second note",
//     created_on: "13/01/2026",
//     content:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
//   },
//   {
//     id: 3,
//     title: "This is third note",
//     created_on: "13/01/2026",
//     content:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
//   },
//   {
//     id: 4,
//     title: "This is forth note",
//     created_on: "13/01/2026",
//     content:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
//   },
//   {
//     id: 5,
//     title: "This is first note with very long content",
//     created_on: "13/01/2026",
//     content:
//       "This is a longer note to test the scrolling functionality of the modal. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
//   },
// ];
const notesData = {
  1: {
    id: 1,
    title: "This is first note",
    created_on: "13/01/2026",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
  },
  2: {
    id: 2,
    title: "This is second note",
    created_on: "13/01/2026",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
  },
  3: {
    id: 3,
    title: "This is third note",
    created_on: "13/01/2026",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
  },
  4: {
    id: 4,
    title: "This is forth note",
    created_on: "13/01/2026",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
  },
  5: {
    id: 5,
    title: "This is first note with very long content",
    created_on: "13/01/2026",
    content:
      "This is a longer note to test the scrolling functionality of the modal. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? This is a longer note to test the scrolling functionality of the modal. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? This is a longer note to test the scrolling functionality of the modal. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe aliquam tempore iure eos facere iusto harum. Ab libero ipsum voluptate?",
  },
};

import "./SimpleNoteLayout.css";
import NoteCard from "../../components/NoteCard/NoteCard";
import useModal from "../../hooks/useModal";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "../../components/Modals/Modal";

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
  const [notes, setNotes] = useState(notesData || {})
  const [activeNote, setActiveNote] = useState(null);

  const handleSave = useCallback((updatedNote) => {
    if(!activeNote) return
    console.log({ updatedNote, activeNote })
    setNotes((prevState) => ({...prevState, [activeNote.id]: {...updatedNote}}))
  }, [activeNote])

  const handleClose = () => {
    close();
    setActiveNote(null)
  }

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
            <NoteCard
              info={{ note }}
              actions={{ setActiveNote, open }}
            />
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
