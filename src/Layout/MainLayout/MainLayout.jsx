import Sidebar from "../../components/Sidebar/Sidebar";
import FloatingActionButton from "../../components/UI/FloatingActionButton";
import SimpleNoteLayout from "../SimpleNote/SimpleNoteLayout";

import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
    <div className="main-grid-container">
      <Sidebar />
      <main className="main-content">
        <header className="header">{/* Top header bar for search and user info */}</header>
        <section className="note-section">
          {/* Displaying the list of existing notes, this should be simple sticky notes without tldown like Google Keep note */}
          <SimpleNoteLayout />
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
