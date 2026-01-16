import "./UI.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiType } from "react-icons/fi";
import { ICON_SIZES } from "../../constants";

const subItems = [
  { id: "draw", icon: <FiEdit size={ICON_SIZES.SMALL} />, label: "Drawing" },
  { id: "text", icon: <FiType size={ICON_SIZES.SMALL} />, label: "Text" },
];

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

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

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
                <button className="fab-option-button">
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
