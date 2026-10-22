import React from "react";
import NoteCard from "./NoteCard";
import EmptyState from "../common/EmptyState";
import { FileText, SearchX, Pin } from "lucide-react";

/**
 * Notes Grid Layout Component
 * Demonstrates:
 * - Functional Component
 * - Props Passing
 * - List Rendering with .map()
 * - Conditional Rendering
 * - Organized Layout (Pinned & Other Notes groups)
 */
const NoteList = ({
  notes,
  totalNotesCount,
  onEdit,
  onDelete,
  onTogglePin,
  onAddNewNote,
  onResetSearch
}) => {
  // If no notes exist in storage at all
  if (totalNotesCount === 0) {
    return (
      <EmptyState
        icon={<FileText size={48} className="empty-icon-blue" />}
        title="No notes yet!"
        description="Capture your thoughts, code snippets, or meeting notes right away."
        actionText="Create First Note"
        onAction={onAddNewNote}
      />
    );
  }

  // If notes exist, but none match the filter
  if (notes.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={48} className="empty-icon-gray" />}
        title="No matching notes found"
        description="Try searching with different keywords or switch your category."
        actionText="Reset Search"
        onAction={onResetSearch}
      />
    );
  }

  // Separate pinned and unpinned notes
  const pinnedNotes = notes.filter((note) => note.pinned);
  const regularNotes = notes.filter((note) => !note.pinned);

  return (
    <div className="notes-display-container">
      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <section className="notes-group pinned-group">
          <div className="notes-group-heading">
            <Pin size={16} className="pin-heading-icon" />
            <span>Pinned Notes ({pinnedNotes.length})</span>
          </div>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Notes Section */}
      {regularNotes.length > 0 && (
        <section className="notes-group">
          {pinnedNotes.length > 0 && (
            <div className="notes-group-heading">
              <span>All Notes ({regularNotes.length})</span>
            </div>
          )}
          <div className="notes-grid">
            {regularNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NoteList;
