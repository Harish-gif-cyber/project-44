import React from "react";
import { Search, X } from "lucide-react";
import { NOTE_CATEGORIES } from "../../data/initialData";

/**
 * Notes Search and Category Filter Component
 * Demonstrates:
 * - Functional Component
 * - Props Passing & Destructuring
 * - List Rendering with .map()
 * - Controlled Inputs & Event Handling
 */
const NoteSearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  notesCount,
  filteredCount
}) => {
  return (
    <div className="notes-filter-wrapper">
      {/* Search Input Bar (Bonus Requirement: Search Notes) */}
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search notes by title or keywords..."
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

      {/* Category Filter Chips (Bonus Requirement: Categorize Notes) */}
      <div className="notes-category-bar">
        <span className="category-filter-label">Categories:</span>
        <div className="category-pills-row">
          {NOTE_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="notes-count-info">
          Showing {filteredCount} of {notesCount} notes
        </div>
      </div>
    </div>
  );
};

export default NoteSearchFilter;
