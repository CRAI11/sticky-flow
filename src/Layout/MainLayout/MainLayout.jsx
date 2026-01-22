import "./MainLayout.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import FloatingActionButton from "../../components/UI/FloatingActionButton";
import { NoteProvider } from "../../context/NoteContext";
import SimpleNoteLayout from "../SimpleNote/SimpleNoteLayout";


export default function MainLayout() {
  return (
    <>
      <div className="main-grid-container">
        <Sidebar />
        <main className="main-content">
          <header className="header">
            {/* Top header bar for search and user info */}
          </header>
          <section className="note-section">
            <NoteProvider>
              <SimpleNoteLayout />
            </NoteProvider>
            {/* Displaying the list of existing notes, this should be simple sticky notes without tldown like Google Keep note */}
          </section>
          <aside className="drawing-note-section">
            {/* Most recent drawing task goes here, so user can start quickly */}
          </aside>
        </main>
      </div>

      <FloatingActionButton />
    </>
  );
}
