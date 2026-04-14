import "./UI.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiType } from "react-icons/fi";
import { FLOATING_BTN_ACTION, ICON_SIZES } from "../../constants";

const containerVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function FloatingActionButton({ onCreateNote }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTextNote = async () => {
    const tempNote = {
      id: "new",
      title: "",
      content: "",
    };

    onCreateNote(tempNote)
  };

  const subItems = [
    {
      id: FLOATING_BTN_ACTION.DRAW,
      icon: <FiEdit size={ICON_SIZES.SMALL} />,
      label: "Drawing",
      action: () => console.log("drawing"),
    },
    {
      id: FLOATING_BTN_ACTION.SIMPLE,
      icon: <FiType size={ICON_SIZES.SMALL} />,
      label: "Text",
      action: handleCreateTextNote,
    },
  ];

  return (
    <div className="fab-container">
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="fab-options"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {subItems.map((item) => (
              <motion.li key={item.id} variants={itemVariants}>
                <button className="fab-option-button" onClick={item.action}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button className="fab-main" onClick={() => setIsOpen(!isOpen)}>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          <FiPlus size={ICON_SIZES.LARGE} />
        </motion.div>
      </button>
    </div>
  );
}
