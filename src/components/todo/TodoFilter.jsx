import React from "react";
import { Search, Filter, X } from "lucide-react";
import { TASK_CATEGORIES } from "../../data/initialData";
import Button from "../common/Button";

/**
 * Task Filters Component
 * Demonstrates:
 * - Controlled Inputs
 * - Event handling
 * - List rendering using .map()
 * - Conditional classes
 */
const TodoFilter = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="filter-panel">
      {/* Search Input Bar */}
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery("")}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-controls-row">
        {/* Status Filter Tabs (Bonus requirement: All, Completed, Pending) */}
        <div className="filter-pill-group">
          <button
            type="button"
            className={`filter-pill ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-pill ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </button>
          <button
            type="button"
            className={`filter-pill ${filterStatus === "completed" ? "active" : ""}`}
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </button>
        </div>

        {/* Category & Priority Dropdowns */}
        <div className="filter-select-group">
          <div className="select-wrapper">
            <Filter size={14} className="select-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="custom-select"
              aria-label="Filter by category"
            >
              {TASK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="custom-select"
              aria-label="Filter by priority"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={<X size={14} />}
              onClick={onResetFilters}
              title="Reset all filters"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
