import { createContext, useContext, useState } from "react";
import { apiController } from "../services/apiController";
import useLoader from "../hooks/useLoader";
import { LOADING_ENUMS } from "../constants";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState({});
  const [activeNote, setActiveNote] = useState(null);
  const { setLoader } = useLoader();

  const addNotes = (resData = {}) => {
    const notesObject = Object.values(resData)?.reduce((acc, note) => {
      acc[note.id] = note;
      return acc;
    }, {});
    setNotes(notesObject);
  };

  const getNotes = async (signal) => {
    try {
      setLoader(LOADING_ENUMS.GET_ALL_NOTES);
      const response = await apiController({
        url: `/notes`,
        method: "GET",
        signal: signal,
      });

      if (response) {
        addNotes(response);
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoader(LOADING_ENUMS.IDLE);
    }
  };

  const createNotes = async (noteData) => {
    try {
      setLoader(LOADING_ENUMS.CREATE_NOTE);
      const response = await apiController({
        url: `/notes`,
        method: "POST",
        data: { title: noteData.title, content: noteData.content },
      });
      console.log({ createNoteRes: response });

      setNotes((prevState) => ({
        ...prevState,
        [response.id]: { ...response },
      }));
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoader(LOADING_ENUMS.IDLE);
    }
  };

  const updateNotes = async (noteData) => {
    try {
      setLoader(LOADING_ENUMS.UPDATE_NOTE);
      const response = await apiController({
        url: `/notes/${noteData.id}`,
        method: "PUT",
        data: noteData,
      });
      console.log({ updatedNote: response });

      setNotes((prevState) => ({
        ...prevState,
        [response.id]: { ...response },
      }));
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoader(LOADING_ENUMS.IDLE);
    }
  };

  const deleteNotes = async (noteId) => {
    try {
      setLoader(LOADING_ENUMS.DELETE_NOTE);
      await apiController({
        url: `/notes/${noteId}`,
        method: "DELETE",
      });

      setNotes((prevNotes) => {
        const newNotes = { ...prevNotes };
        delete newNotes[noteId];
        return newNotes;
      });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoader(LOADING_ENUMS.IDLE);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        activeNote,
        setActiveNote,
        updateNotes,
        createNotes,
        deleteNotes,
      }}
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
