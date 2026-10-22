import React from "react";
import TodoItem from "./TodoItem";
import EmptyState from "../common/EmptyState";
import { CheckCircle2, ListFilter } from "lucide-react";

/**
 * Task List Component
 * Demonstrates:
 * - Functional Component
 * - Props Passing
 * - List Rendering with .map() and unique keys
 * - Conditional Rendering
 */
const TodoList = ({
  tasks,
  totalTasksCount,
  onToggleComplete,
  onStartEdit,
  onStartDelete,
  onAddNewTask,
  onResetFilters
}) => {
  // If there are no tasks at all in the system
  if (totalTasksCount === 0) {
    return (
      <EmptyState
        icon={<CheckCircle2 size={48} className="empty-icon-blue" />}
        title="No tasks yet!"
        description="Organize your day by creating your very first task above."
        actionText="Add First Task"
        onAction={onAddNewTask}
      />
    );
  }

  // If there are tasks, but none match current search/filter
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ListFilter size={48} className="empty-icon-gray" />}
        title="No matching tasks found"
        description="Try adjusting your search query, status, or category filters."
        actionText="Clear Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="todo-list-container">
      {/* Demonstrating List Rendering using .map() */}
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onStartDelete={onStartDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
