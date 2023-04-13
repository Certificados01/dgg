import React from "react";
import ReactModal from "react-modal";
import "./Modal.css";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          Fechar
        </button>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
