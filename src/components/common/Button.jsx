import React from "react";

/**
 * Reusable Button Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring & default values
 * - ES6 Template Literals for dynamic class names
 * - Event handling
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
  size = "md", // 'sm' | 'md' | 'lg'
  icon = null,
  disabled = false,
  className = "",
  title = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`custom-btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </button>
  );
};

export default Button;
