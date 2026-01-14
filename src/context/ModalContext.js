import { createContext, useContext } from "react";

const ModalContext = createContext(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal: hook must be use inside Modal component"
    );
  }

  return context;
}

export default ModalContext;