import React from "react";
import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react";
import { isOverdue } from "../../utils/dateUtils";

/**
 * Task Statistics Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring
 * - ES6 Array methods (.filter, .length)
 * - Conditional rendering & calculations
 */
const TodoStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  // Using ES6 .filter() array method
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate, task.completed)).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon-wrap icon-blue">
          <ListTodo size={20} />
        </div>
        <div className="stat-details">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap icon-amber">
          <Clock size={20} />
        </div>
        <div className="stat-details">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap icon-green">
          <CheckCircle2 size={20} />
        </div>
        <div className="stat-details">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrap icon-rose">
          <AlertCircle size={20} />
        </div>
        <div className="stat-details">
          <span className="stat-value">{overdueTasks}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="stat-card progress-card">
        <div className="progress-header">
          <span className="progress-label">Task Completion</span>
          <span className="progress-percent">{completionPercentage}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
