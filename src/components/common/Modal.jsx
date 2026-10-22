import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

/**
 * Reusable Modal Component
 * Demonstrates:
 * - Functional Component
 * - Props passing & destructuring
 * - Side Effects using useEffect (Escape key press handler & body scroll lock)
 * - Event handling & stopPropagation
 * - Conditional rendering
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "520px"
}) => {
  // useEffect to handle keyboard "Escape" key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup side effect on modal unmount or close
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-container"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close-btn"
          >
            <X size={18} />
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
