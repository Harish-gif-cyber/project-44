import React from "react";
import { CheckSquare, FileText, LayoutDashboard, Plus, CheckCircle2 } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

/**
 * Navigation Bar Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring
 * - Conditional rendering & active state styling
 * - Event handling
 */
const Navbar = ({
  activeTab,
  setActiveTab,
  pendingTasksCount,
  totalNotesCount,
  onOpenNewTaskModal,
  onOpenNewNoteModal
}) => {
  return (
    <header className="app-navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <div className="brand-logo-icon">
            <CheckCircle2 size={24} className="logo-svg" />
          </div>
          <div className="brand-text-group">
            <h1 className="brand-title">FocusFlow</h1>
            <span className="brand-subtitle">To-Do & Notes App • Week 04</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="navbar-nav">
          <button
            type="button"
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span className="tab-label">Dashboard</span>
          </button>

          <button
            type="button"
            className={`nav-tab ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            <CheckSquare size={18} />
            <span className="tab-label">To-Do App</span>
            {pendingTasksCount > 0 && (
              <Badge variant="warning" size="sm" className="tab-badge">
                {pendingTasksCount}
              </Badge>
            )}
          </button>

          <button
            type="button"
            className={`nav-tab ${activeTab === "notes" ? "active" : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            <FileText size={18} />
            <span className="tab-label">Notes App</span>
            {totalNotesCount > 0 && (
              <Badge variant="info" size="sm" className="tab-badge">
                {totalNotesCount}
              </Badge>
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {activeTab === "todos" && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
              onClick={onOpenNewTaskModal}
            >
              New Task
            </Button>
          )}

          {activeTab === "notes" && (
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
              onClick={onOpenNewNoteModal}
            >
              New Note
            </Button>
          )}

          {activeTab === "overview" && (
            <div className="overview-quick-btns">
              <Button
                variant="outline"
                size="sm"
                icon={<Plus size={15} />}
                onClick={onOpenNewTaskModal}
              >
                Task
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus size={15} />}
                onClick={onOpenNewNoteModal}
              >
                Note
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
