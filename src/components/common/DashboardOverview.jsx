import React from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  ListTodo,
  Pin,
  ArrowRight,
  Plus,
  AlertCircle
} from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";
import { isOverdue, formatDate } from "../../utils/dateUtils";

/**
 * Overview Dashboard Component
 * Integrates both To-Do and Notes apps into an intuitive command center.
 * Demonstrates:
 * - Functional Component
 * - Props Passing
 * - ES6 Array Methods (.filter, .slice, .map)
 * - Conditional Rendering
 */
const DashboardOverview = ({
  tasks,
  notes,
  setActiveTab,
  onOpenNewTaskModal,
  onOpenNewNoteModal,
  onToggleTaskComplete
}) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;

  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((n) => n.pinned).length;

  // Recent / high-priority pending tasks
  const pendingTasksPreview = tasks
    .filter((t) => !t.completed)
    .slice(0, 4);

  // Recent or pinned notes
  const notesPreview = notes.slice(0, 3);

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard-overview">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-text">
          <h2>Welcome back to FocusFlow 👋</h2>
          <p>
            Your unified workspace for Week 04 Minor Project: To-Do App & Notes App in React.
          </p>
        </div>
        <div className="banner-actions">
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={15} />}
            onClick={onOpenNewTaskModal}
          >
            Add Task
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={15} />}
            onClick={onOpenNewNoteModal}
          >
            Create Note
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="overview-metrics-grid">
        <div className="metric-card" onClick={() => setActiveTab("todos")}>
          <div className="metric-header">
            <span className="metric-title">Tasks Pending</span>
            <div className="metric-icon-box amber-bg">
              <Clock size={18} />
            </div>
          </div>
          <div className="metric-value">{pendingTasks}</div>
          <div className="metric-footer">
            <span className="metric-subtext">
              {overdueTasks > 0 ? `${overdueTasks} overdue` : "All on schedule"}
            </span>
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab("todos")}>
          <div className="metric-header">
            <span className="metric-title">Tasks Completed</span>
            <div className="metric-icon-box green-bg">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="metric-value">{completedTasks}</div>
          <div className="metric-footer">
            <span className="metric-subtext">{completionRate}% total completion</span>
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab("notes")}>
          <div className="metric-header">
            <span className="metric-title">Total Notes</span>
            <div className="metric-icon-box blue-bg">
              <FileText size={18} />
            </div>
          </div>
          <div className="metric-value">{totalNotes}</div>
          <div className="metric-footer">
            <span className="metric-subtext">{pinnedNotes} pinned for quick access</span>
          </div>
        </div>

        <div className="metric-card" onClick={() => setActiveTab("todos")}>
          <div className="metric-header">
            <span className="metric-title">Total Items</span>
            <div className="metric-icon-box purple-bg">
              <ListTodo size={18} />
            </div>
          </div>
          <div className="metric-value">{totalTasks + totalNotes}</div>
          <div className="metric-footer">
            <span className="metric-subtext">Across Tasks & Notes apps</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Pending Tasks Preview & Notes Preview */}
      <div className="overview-columns-grid">
        {/* Column 1: Pending Tasks */}
        <div className="overview-panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <ListTodo size={18} className="panel-icon" />
              <h3>Pending Tasks</h3>
            </div>
            <button
              type="button"
              className="panel-view-all-btn"
              onClick={() => setActiveTab("todos")}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="panel-body">
            {pendingTasksPreview.length === 0 ? (
              <div className="panel-empty-text">🎉 Great job! No pending tasks right now.</div>
            ) : (
              <ul className="preview-task-list">
                {pendingTasksPreview.map((task) => (
                  <li key={task.id} className="preview-task-item">
                    <button
                      type="button"
                      className="preview-check-btn"
                      onClick={() => onToggleTaskComplete(task.id)}
                      title="Mark as completed"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <div className="preview-task-info">
                      <span className="preview-task-title">{task.title}</span>
                      <div className="preview-task-meta">
                        {task.dueDate && (
                          <span className="preview-due">
                            Due: {formatDate(task.dueDate)}
                          </span>
                        )}
                        {task.priority && (
                          <Badge
                            variant={
                              task.priority === "High"
                                ? "danger"
                                : task.priority === "Medium"
                                ? "warning"
                                : "info"
                            }
                            size="sm"
                          >
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Column 2: Recent Notes */}
        <div className="overview-panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <FileText size={18} className="panel-icon" />
              <h3>Recent Notes</h3>
            </div>
            <button
              type="button"
              className="panel-view-all-btn"
              onClick={() => setActiveTab("notes")}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="panel-body">
            {notesPreview.length === 0 ? (
              <div className="panel-empty-text">No notes yet. Click "+ Create Note" to begin.</div>
            ) : (
              <div className="preview-notes-list">
                {notesPreview.map((note) => (
                  <div
                    key={note.id}
                    className="preview-note-item"
                    style={{ backgroundColor: note.color || "#ffffff" }}
                    onClick={() => setActiveTab("notes")}
                  >
                    <div className="preview-note-top">
                      <h4 className="preview-note-title">{note.title}</h4>
                      {note.pinned && <Pin size={13} className="pin-active-icon" />}
                    </div>
                    <p className="preview-note-excerpt">
                      {note.content.length > 90
                        ? `${note.content.substring(0, 90)}...`
                        : note.content}
                    </p>
                    <div className="preview-note-bottom">
                      <Badge variant="purple" size="sm">
                        {note.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
