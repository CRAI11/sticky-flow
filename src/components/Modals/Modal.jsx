import "./Modal.css";
import ModalContext from "../../context/ModalContext";
import NoteDetail from "./NoteDetail";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
};

const Modal = ({ data, actions, isOpen, onClose, children }) => {
  
  return (
    <ModalContext.Provider value={{ data, actions }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-backdrop"
            onClick={onClose}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit={"hidden"}
          >
            <motion.div
              className="modal-content"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

Modal.NoteDetail = NoteDetail;

export default Modal;
