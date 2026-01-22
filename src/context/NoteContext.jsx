import { createContext, useContext, useState } from "react";
import { apiController } from "../services/apiController";
import useLoader from "../hooks/useLoader";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState({});
  const [activeNote, setActiveNote] = useState(null);
  const { updateStatus } = useLoader();

  const addNotes = (resData={}) => {
    const notesObject = Object.values(resData)?.reduce((acc, note) => {
      acc[note.id] = note;
      return acc;
    }, {});
    setNotes(notesObject);
  };

  const getNotes = async (signal) => {
    try {
      updateStatus("notesLoading")
      const response = await apiController({
        url: `/notes`,
        method: "GET",
        signal: signal,
      });

      if(response) {
        addNotes(response);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      updateStatus("idle")
    }
  };

  const updateNotes = async (noteData) => {
    try {
      updateStatus("notesUpdating")
      await apiController({
        url: `/notes/${noteData.id}`,
        method: "PUT",
        data: noteData,
      });

      setNotes((prevState) => ({
        ...prevState,
        [noteData.id]: { ...noteData },
      }));

    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      updateStatus("idle")
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, activeNote, setActiveNote, updateNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export function useNotes() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("hook must be use inside Note context provider");
  }
  return context;
}
