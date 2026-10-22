import React from "react";
import { Check, Edit3, Trash2, Calendar, AlertCircle, Clock } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDate, isDueToday, isOverdue } from "../../utils/dateUtils";

/**
 * Single Task Item Component
 * Demonstrates:
 * - Functional Component
 * - Object Destructuring from props
 * - Conditional Rendering (status, overdue badge, today badge)
 * - Event Handling (toggle, edit, delete)
 * - Template Literals for dynamic class names
 */
const TodoItem = ({
  task,
  onToggleComplete,
  onStartEdit,
  onStartDelete
}) => {
  // ES6 Destructuring
  const { id, title, description, completed, priority, category, dueDate } = task;

  const overdue = isOverdue(dueDate, completed);
  const dueToday = isDueToday(dueDate);

  // Priority badge variant mapping
  const priorityVariant = {
    High: "danger",
    Medium: "warning",
    Low: "info"
  }[priority] || "default";

  return (
    <div className={`todo-item-card ${completed ? "is-completed" : ""} ${overdue ? "is-overdue" : ""}`}>
      {/* Checkbox for status toggle */}
      <button
        type="button"
        role="checkbox"
        aria-checked={completed}
        aria-label={`Mark task "${title}" as ${completed ? "pending" : "completed"}`}
        className={`custom-checkbox ${completed ? "checked" : ""}`}
        onClick={() => onToggleComplete(id)}
      >
        {completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Task Content */}
      <div className="todo-item-body">
        <div className="todo-header-row">
          <h4 className={`todo-title ${completed ? "strike-through" : ""}`}>
            {title}
          </h4>

          {/* Status Badge (Completed / Pending) */}
          <Badge
            variant={completed ? "success" : "warning"}
            size="sm"
            icon={completed ? <Check size={12} /> : <Clock size={12} />}
          >
            {completed ? "Completed" : "Pending"}
          </Badge>
        </div>

        {description && (
          <p className="todo-description">{description}</p>
        )}

        {/* Task Meta: Due Date, Category, Priority */}
        <div className="todo-meta-row">
          {/* Due date with smart status */}
          {dueDate && (
            <div className="todo-due-date">
              <Calendar size={13} className="meta-icon" />
              <span>{formatDate(dueDate)}</span>
              {overdue && (
                <Badge variant="danger" size="sm" icon={<AlertCircle size={10} />}>
                  Overdue
                </Badge>
              )}
              {dueToday && !completed && (
                <Badge variant="warning" size="sm">
                  Today
                </Badge>
              )}
            </div>
          )}

          {/* Category */}
          {category && (
            <span className="todo-category-tag">
              #{category}
            </span>
          )}

          {/* Priority */}
          {priority && (
            <Badge variant={priorityVariant} size="sm">
              {priority}
            </Badge>
          )}
        </div>
      </div>

      {/* Action Buttons (Edit / Delete) */}
      <div className="todo-item-actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStartEdit(task)}
          title="Edit task"
          aria-label={`Edit task ${title}`}
          className="action-icon-btn edit-btn"
        >
          <Edit3 size={16} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStartDelete(task)}
          title="Delete task"
          aria-label={`Delete task ${title}`}
          className="action-icon-btn delete-btn"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
