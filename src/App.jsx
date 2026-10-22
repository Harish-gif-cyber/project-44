import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import DashboardOverview from "./components/common/DashboardOverview";
import TodoApp from "./components/todo/TodoApp";
import NotesApp from "./components/notes/NotesApp";
import { INITIAL_TASKS, INITIAL_NOTES } from "./data/initialData";
import { loadFromStorage, saveToStorage } from "./utils/localStorage";
import "./App.css";

const TASK_STORAGE_KEY = "unlox_week04_tasks";
const NOTE_STORAGE_KEY = "unlox_week04_notes";


function App() {
 
  const [activeTab, setActiveTab] = useState("overview");

  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

 
  const [tasks, setTasks] = useState(() => {
    return loadFromStorage(TASK_STORAGE_KEY, INITIAL_TASKS);
  });

  const [notes, setNotes] = useState(() => {
    return loadFromStorage(NOTE_STORAGE_KEY, INITIAL_NOTES);
  });

  
  useEffect(() => {
    saveToStorage(TASK_STORAGE_KEY, tasks);
  }, [tasks]);

 
  useEffect(() => {
    saveToStorage(NOTE_STORAGE_KEY, notes);
  }, [notes]);

  
  const handleToggleTaskComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null
            }
          : t
      )
    );
  };

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;
  const totalNotesCount = notes.length;

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingTasksCount={pendingTasksCount}
        totalNotesCount={totalNotesCount}
        onOpenNewTaskModal={() => {
          if (activeTab !== "todos") setActiveTab("todos");
          setIsTaskModalOpen(true);
        }}
        onOpenNewNoteModal={() => {
          if (activeTab !== "notes") setActiveTab("notes");
          setIsNoteModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          {/* Conditional Rendering of active view */}
          {activeTab === "overview" && (
            <DashboardOverview
              tasks={tasks}
              notes={notes}
              setActiveTab={setActiveTab}
              onOpenNewTaskModal={() => {
                setActiveTab("todos");
                setIsTaskModalOpen(true);
              }}
              onOpenNewNoteModal={() => {
                setActiveTab("notes");
                setIsNoteModalOpen(true);
              }}
              onToggleTaskComplete={handleToggleTaskComplete}
            />
          )}

          {activeTab === "todos" && (
            <TodoApp
              tasks={tasks}
              setTasks={setTasks}
              isModalOpen={isTaskModalOpen}
              setIsModalOpen={setIsTaskModalOpen}
            />
          )}

          {activeTab === "notes" && (
            <NotesApp
              notes={notes}
              setNotes={setNotes}
              isModalOpen={isNoteModalOpen}
              setIsModalOpen={setIsNoteModalOpen}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-credits">
            FocusFlow • <strong>Web Development Week 04 Minor Project</strong> (To-Do & Notes App)
          </p>
          <p className="footer-subtext">
            Demonstrating React Functional Components, Hooks (useState, useEffect), ES6+ JavaScript, and Component-Based Architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
