import React, { useRef, useEffect } from 'react';

export default function DeleteConfirmDialog({ isOpen, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="custom-dialog confirm-dialog" onClose={onCancel}>
      <div className="dialog-content text-center">
        <div className="warning-icon">⚠️</div>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this activity? This action cannot be undone.</p>
        <div className="dialog-actions centered">
          <button type="button" className="btn-secondary" onClick={() => dialogRef.current?.close()}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}
