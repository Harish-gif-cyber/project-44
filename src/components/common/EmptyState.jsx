import React from "react";
import Button from "./Button";

/**
 * Reusable Empty State Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring
 * - Conditional rendering
 */
const EmptyState = ({
  icon,
  title,
  description,
  actionText = null,
  onAction = null
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionText && onAction && (
        <div className="empty-state-action">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
