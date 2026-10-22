import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import { TASK_CATEGORIES } from "../../data/initialData";

/**
 * Task Add / Edit Form Component
 * Demonstrates:
 * - Functional Component
 * - State Management with useState
 * - Side Effects with useEffect (syncing edit state)
 * - Object Manipulation & Spread Operator
 * - Form Event Handling & Validation
 */
const TodoForm = ({ initialTask = null, onSave, onCancel }) => {
  // Initialize state using object spread & sensible defaults
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    dueDate: ""
  });

  const [errors, setErrors] = useState({});

  // useEffect to populate fields if editing an existing task
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title || "",
        description: initialTask.description || "",
        category: initialTask.category || "Work",
        priority: initialTask.priority || "Medium",
        dueDate: initialTask.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Work",
        priority: "Medium",
        dueDate: ""
      });
    }
  }, [initialTask]);

  // Handle generic input change with ES6 computed property names
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Object manipulation with spread operator
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Form submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call onSave callback with trimmed data
    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      dueDate: formData.dueDate
    });
  };

  const isEditing = Boolean(initialTask);
  const categoriesList = TASK_CATEGORIES.filter((c) => c !== "All");

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Title */}
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title <span className="required-star">*</span>
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          className={`form-input ${errors.title ? "input-error" : ""}`}
          placeholder="e.g., Review React Hooks documentation"
          value={formData.title}
          onChange={handleChange}
          autoFocus
        />
        {errors.title && <span className="form-error-msg">{errors.title}</span>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Description <span className="optional-tag">(optional)</span>
        </label>
        <textarea
          id="task-description"
          name="description"
          rows={3}
          className="form-textarea"
          placeholder="Add details, notes or subtasks..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Row for Category, Priority & Due Date */}
      <div className="form-row-three">
        {/* Category */}
        <div className="form-group">
          <label htmlFor="task-category" className="form-label">Category</label>
          <select
            id="task-category"
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

        {/* Priority */}
        <div className="form-group">
          <label htmlFor="task-priority" className="form-label">Priority</label>
          <select
            id="task-priority"
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="form-group">
          <label htmlFor="task-dueDate" className="form-label">Due Date</label>
          <input
            id="task-dueDate"
            name="dueDate"
            type="date"
            className="form-input"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Modal Actions */}
      <div className="form-actions">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
