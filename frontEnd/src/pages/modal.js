import React from 'react';
import './modal.css';

const Modal = ({ showModal, style, onClose, children }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay show">
      <div className="modal show custom-modal" style={style}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
