import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { NOTE_CATEGORIES, NOTE_COLORS } from "../../data/initialData";
import { Pin } from "lucide-react";

/**
 * Note Creation & Edit Form
 * Demonstrates:
 * - Functional Component
 * - State Management using useState
 * - Side Effects using useEffect
 * - Form Handling & Validation
 * - ES6 Spread Operator & Object Manipulation
 */
const NoteForm = ({ initialNote = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Study",
    color: "#ffffff",
    pinned: false
  });

  const [errors, setErrors] = useState({});

  // Sync state when initialNote changes (editing mode)
  useEffect(() => {
    if (initialNote) {
      setFormData({
        title: initialNote.title || "",
        content: initialNote.content || "",
        category: initialNote.category || "Study",
        color: initialNote.color || "#ffffff",
        pinned: Boolean(initialNote.pinned)
      });
    } else {
      setFormData({
        title: "",
        content: "",
        category: "Study",
        color: "#ffffff",
        pinned: false
      });
    }
  }, [initialNote]);

  // Form field handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleColorSelect = (colorValue) => {
    setFormData((prev) => ({ ...prev, color: colorValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Note title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Note content cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      color: formData.color,
      pinned: formData.pinned
    });
  };

  const isEditing = Boolean(initialNote);
  const categoriesList = NOTE_CATEGORIES.filter((c) => c !== "All");

  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const charCount = formData.content.length;

  return (
    <form onSubmit={handleSubmit} className="note-form">
      {/* Title */}
      <div className="form-group">
        <label htmlFor="note-title" className="form-label">
          Title <span className="required-star">*</span>
        </label>
        <input
          id="note-title"
          name="title"
          type="text"
          className={`form-input ${errors.title ? "input-error" : ""}`}
          placeholder="e.g., React Hooks summary or Sprint Ideas"
          value={formData.title}
          onChange={handleChange}
          autoFocus
        />
        {errors.title && <span className="form-error-msg">{errors.title}</span>}
      </div>

      {/* Category and Pin Toggle Row */}
      <div className="form-row-two">
        <div className="form-group">
          <label htmlFor="note-category" className="form-label">Category</label>
          <select
            id="note-category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            {categoriesList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group-wrap">
          <label className="checkbox-toggle-label">
            <input
              type="checkbox"
              name="pinned"
              checked={formData.pinned}
              onChange={handleChange}
              className="toggle-checkbox"
            />
            <Pin size={16} className={formData.pinned ? "pin-active-icon" : ""} />
            <span>Pin note to top</span>
          </label>
        </div>
      </div>

      {/* Content Textarea */}
      <div className="form-group">
        <div className="content-label-row">
          <label htmlFor="note-content" className="form-label">
            Note Content <span className="required-star">*</span>
          </label>
          <span className="char-counter">
            {wordCount} words • {charCount} chars
          </span>
        </div>
        <textarea
          id="note-content"
          name="content"
          rows={6}
          className={`form-textarea ${errors.content ? "input-error" : ""}`}
          placeholder="Write your note, thoughts, code snippets, or ideas here..."
          value={formData.content}
          onChange={handleChange}
        />
        {errors.content && <span className="form-error-msg">{errors.content}</span>}
      </div>

      {/* Color Selection Palette */}
      <div className="form-group">
        <label className="form-label">Card Color Theme</label>
        <div className="color-palette-options">
          {NOTE_COLORS.map((col) => (
            <button
              key={col.value}
              type="button"
              className={`color-swatch ${formData.color === col.value ? "selected" : ""}`}
              style={{ backgroundColor: col.value, borderColor: col.border }}
              onClick={() => handleColorSelect(col.value)}
              title={col.name}
              aria-label={`Select ${col.name} color`}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? "Save Note Changes" : "Create Note"}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
