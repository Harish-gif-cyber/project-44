import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

/**
 * Reusable Confirmation Dialog
 * Demonstrates:
 * - Component Reusability (reuses Modal & Button)
 * - Props destructuring
 * - Conditional rendering
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Delete",
  confirmVariant = "danger"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="420px">
      <div className="confirm-dialog-content">
        <div className="confirm-icon-wrapper">
          <AlertTriangle className="confirm-warning-icon" size={32} />
        </div>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
