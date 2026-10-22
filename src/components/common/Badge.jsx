import React from "react";

/**
 * Reusable Badge Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring
 * - Conditional rendering & ES6 template literals
 */
const Badge = ({
  children,
  variant = "default", // 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'default'
  size = "md",
  icon = null,
  className = "",
  style = {}
}) => {
  return (
    <span
      className={`custom-badge badge-${variant} badge-${size} ${className}`}
      style={style}
    >
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
