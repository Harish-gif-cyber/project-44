import React, { useState } from "react";
import { Pin, Edit3, Trash2, Copy, Check, Clock, Calendar } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatTimestamp } from "../../utils/dateUtils";

/**
 * Single Note Card Component
 * Demonstrates:
 * - Functional Component
 * - Props Destructuring
 * - Conditional Rendering
 * - Event Handling & Browser Clipboard API
 * - ES6 Template Literals
 */
const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onTogglePin
}) => {
  // Destructure note object
  const { id, title, content, category, color, pinned, createdAt, updatedAt } = note;
  const [copied, setCopied] = useState(false);

  // Copy note text to clipboard
  const handleCopy = async () => {
    try {
      const fullText = `${title}\n\n${content}`;
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy note text:", err);
    }
  };

  return (
    <article
      className={`note-card ${pinned ? "is-pinned" : ""}`}
      style={{ backgroundColor: color || "#ffffff" }}
    >
      {/* Header with Title and Pin Button */}
      <div className="note-card-header">
        <h3 className="note-card-title">{title}</h3>
        <button
          type="button"
          className={`pin-btn ${pinned ? "active" : ""}`}
          onClick={() => onTogglePin(id)}
          title={pinned ? "Unpin note" : "Pin note to top"}
          aria-label={pinned ? "Unpin note" : "Pin note to top"}
        >
          <Pin size={16} className={pinned ? "pin-filled" : ""} />
        </button>
      </div>

      {/* Note Body Content */}
      <div className="note-card-body">
        <p className="note-card-content">{content}</p>
      </div>

      {/* Card Footer: Category & Timestamps */}
      <div className="note-card-footer">
        <div className="note-footer-meta">
          {category && (
            <Badge variant="purple" size="sm" className="note-category-badge">
              {category}
            </Badge>
          )}

          {/* Timestamps (Bonus Requirement: Note Timestamps) */}
          <div className="note-timestamp" title={`Created: ${formatTimestamp(createdAt)}`}>
            <Clock size={12} className="timestamp-icon" />
            <span>
              {updatedAt && updatedAt !== createdAt
                ? `Updated: ${formatTimestamp(updatedAt)}`
                : `Created: ${formatTimestamp(createdAt)}`}
            </span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="note-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            title={copied ? "Copied to clipboard!" : "Copy note"}
            className="action-icon-btn copy-btn"
          >
            {copied ? <Check size={15} className="copied-icon" /> : <Copy size={15} />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label={`Edit note ${title}`}
            className="action-icon-btn edit-btn"
          >
            <Edit3 size={15} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(note)}
            title="Delete note"
            aria-label={`Delete note ${title}`}
            className="action-icon-btn delete-btn"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
