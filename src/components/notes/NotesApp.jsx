import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import NoteSearchFilter from "./NoteSearchFilter";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import Modal from "../common/Modal";
import ConfirmDialog from "../common/ConfirmDialog";
import Button from "../common/Button";
import { INITIAL_NOTES } from "../../data/initialData";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";

const STORAGE_KEY = "unlox_week04_notes";

/**
 * Main Notes Application Component
 * Demonstrates:
 * - Functional Component
 * - State Management using useState
 * - Side Effects using useEffect (LocalStorage synchronization)
 * - ES6 Array Methods: .map(), .filter(), .find(), .sort()
 * - ES6 Spread Operator & Object Manipulation
 * - Conditional Rendering
 */
const NotesApp = ({
  notes: externalNotes,
  setNotes: externalSetNotes,
  isModalOpen,
  setIsModalOpen
}) => {
  // State: Notes list loaded from LocalStorage or mock data
  const [internalNotes, setInternalNotes] = useState(() => {
    return loadFromStorage(STORAGE_KEY, INITIAL_NOTES);
  });

  const notes = externalNotes !== undefined ? externalNotes : internalNotes;
  const setNotes = externalSetNotes !== undefined ? externalSetNotes : setInternalNotes;

  // Search and Category filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [editingNote, setEditingNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync external modal state if provided via props
  useEffect(() => {
    if (typeof isModalOpen === "boolean") {
      setIsAddModalOpen(isModalOpen);
    }
  }, [isModalOpen]);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    if (setIsModalOpen) setIsModalOpen(false);
  };

  // Persist notes into LocalStorage on state change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, notes);
  }, [notes]);

  // ==========================================
  // Note Operations (CRUD)
  // ==========================================

  // Create Note
  const handleAddNote = (noteData) => {
    const timestamp = new Date().toISOString();
    const newNote = {
      id: `note-${Date.now()}`,
      ...noteData,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    handleCloseAddModal();
  };

  // Start Edit Note
  const handleStartEdit = (note) => {
    const found = notes.find((n) => n.id === note.id);
    if (found) {
      setEditingNote(found);
    }
  };

  // Save Edit Note
  const handleSaveEdit = (updatedData) => {
    if (!editingNote) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              ...updatedData,
              updatedAt: new Date().toISOString()
            }
          : note
      )
    );
    setEditingNote(null);
  };

  // Toggle Pinned Status
  const handleTogglePin = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Start Delete Note
  const handleStartDelete = (note) => {
    setNoteToDelete(note);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!noteToDelete) return;
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteToDelete.id));
    setNoteToDelete(null);
  };

  // Reset search and category filter
  const handleResetSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // ==========================================
  // Filtering & Sorting
  // ==========================================
  const filteredNotes = notes.filter((note) => {
    // 1. Category Filter
    if (selectedCategory !== "All" && note.category !== selectedCategory) {
      return false;
    }

    // 2. Search Filter (title or content)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchContent = note.content.toLowerCase().includes(q);
      if (!matchTitle && !matchContent) return false;
    }

    return true;
  });

  return (
    <div className="notes-app-section">
      {/* Header and Quick Action */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Quick Notes</h2>
          <p className="section-subtitle">
            Capture thoughts, study summaries, snippets, and creative ideas.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Note
        </Button>
      </div>

      {/* Search and Category Filter Bar */}
      <NoteSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        notesCount={notes.length}
        filteredCount={filteredNotes.length}
      />

      {/* Note Grid */}
      <NoteList
        notes={filteredNotes}
        totalNotesCount={notes.length}
        onEdit={handleStartEdit}
        onDelete={handleStartDelete}
        onTogglePin={handleTogglePin}
        onAddNewNote={() => setIsAddModalOpen(true)}
        onResetSearch={handleResetSearch}
      />

      {/* Add Note Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        title="Create New Note"
        maxWidth="560px"
      >
        <NoteForm
          onSave={handleAddNote}
          onCancel={handleCloseAddModal}
        />
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        isOpen={Boolean(editingNote)}
        onClose={() => setEditingNote(null)}
        title="Edit Note"
        maxWidth="560px"
      >
        {editingNote && (
          <NoteForm
            initialNote={editingNote}
            onSave={handleSaveEdit}
            onCancel={() => setEditingNote(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(noteToDelete)}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Note"
        message={`Are you sure you want to delete note "${noteToDelete?.title}"?`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default NotesApp;
