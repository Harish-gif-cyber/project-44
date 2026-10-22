import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TodoStats from "./TodoStats";
import TodoFilter from "./TodoFilter";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Modal from "../common/Modal";
import ConfirmDialog from "../common/ConfirmDialog";
import Button from "../common/Button";
import { INITIAL_TASKS } from "../../data/initialData";
import { loadFromStorage, saveToStorage } from "../../utils/localStorage";

const STORAGE_KEY = "unlox_week04_tasks";

/**
 * Main To-Do Application Component
 * Demonstrates:
 * - Functional Component
 * - State Management using useState (tasks, filters, search, modal state)
 * - Side Effects using useEffect (LocalStorage synchronization)
 * - ES6 Array Methods: .map(), .filter(), .find()
 * - ES6 Features: Arrow functions, Spread operator, Destructuring
 * - Conditional Rendering
 */
const TodoApp = ({
  tasks: externalTasks,
  setTasks: externalSetTasks,
  isModalOpen,
  setIsModalOpen
}) => {
  // 1. Internal fallback state if not provided externally
  const [internalTasks, setInternalTasks] = useState(() => {
    return loadFromStorage(STORAGE_KEY, INITIAL_TASKS);
  });

  const tasks = externalTasks !== undefined ? externalTasks : internalTasks;
  const setTasks = externalSetTasks !== undefined ? externalSetTasks : setInternalTasks;

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'pending' | 'completed'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  // Edit and Delete modal states
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync external modal state if provided via props
  useEffect(() => {
    if (typeof isModalOpen === "boolean") {
      setIsAddModalOpen(isModalOpen);
    }
  }, [isModalOpen]);

  // Handle modal closing and notify parent
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    if (setIsModalOpen) setIsModalOpen(false);
  };

  // 2. Side Effect: Persist tasks to LocalStorage whenever `tasks` changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  // ==========================================
  // Task Operations (CRUD)
  // ==========================================

  // Add Task - demonstrating spread operator & object creation
  const handleAddTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    handleCloseAddModal();
  };

  // Toggle Completion Status - demonstrating .map() and object spread
  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed;
          return {
            ...task,
            completed: isNowCompleted,
            completedAt: isNowCompleted ? new Date().toISOString() : null
          };
        }
        return task;
      })
    );
  };

  // Edit Task - opens edit modal with selected task data
  const handleStartEdit = (task) => {
    // Demonstrating .find() to locate task
    const found = tasks.find((t) => t.id === task.id);
    if (found) {
      setEditingTask(found);
    }
  };

  // Save Edited Task - demonstrating .map() immutability
  const handleSaveEdit = (updatedData) => {
    if (!editingTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...updatedData } : task
      )
    );
    setEditingTask(null);
  };

  // Delete Task initiation
  const handleStartDelete = (task) => {
    setTaskToDelete(task);
  };

  // Confirm Delete - demonstrating ES6 .filter()
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setSelectedCategory("All");
    setSelectedPriority("All");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    filterStatus !== "all" ||
    selectedCategory !== "All" ||
    selectedPriority !== "All";

  // ==========================================
  // Filter & Search Logic (demonstrating ES6 .filter())
  // ==========================================
  const filteredTasks = tasks.filter((task) => {
    // 1. Status Filter (All, Pending, Completed)
    if (filterStatus === "pending" && task.completed) return false;
    if (filterStatus === "completed" && !task.completed) return false;

    // 2. Category Filter
    if (selectedCategory !== "All" && task.category !== selectedCategory) return false;

    // 3. Priority Filter
    if (selectedPriority !== "All" && task.priority !== selectedPriority) return false;

    // 4. Search Filter (matches title or description case-insensitively)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = (task.description || "").toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="todo-app-section">
      {/* Header and Quick Action */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Task Management</h2>
          <p className="section-subtitle">
            Stay organized, meet deadlines, and track daily progress efficiently.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Task
        </Button>
      </div>

      {/* Statistics and Progress Bar */}
      <TodoStats tasks={tasks} />

      {/* Filter and Search Bar */}
      <TodoFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Task List Rendering */}
      <TodoList
        tasks={filteredTasks}
        totalTasksCount={tasks.length}
        onToggleComplete={handleToggleComplete}
        onStartEdit={handleStartEdit}
        onStartDelete={handleStartDelete}
        onAddNewTask={() => setIsAddModalOpen(true)}
        onResetFilters={handleResetFilters}
      />

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        title="Create New Task"
      >
        <TodoForm
          onSave={handleAddTask}
          onCancel={handleCloseAddModal}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TodoForm
            initialTask={editingTask}
            onSave={handleSaveEdit}
            onCancel={() => setEditingTask(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete the task "${taskToDelete?.title}"?`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default TodoApp;
