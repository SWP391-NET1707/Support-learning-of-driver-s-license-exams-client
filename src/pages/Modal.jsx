// Modal.js

import React from 'react';
import '../style/modal.css';

const Modal = ({ showModal, closeModal, handleFinishQuiz }) => {
  
  if (!showModal) {
    
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>Bạn có muốn kết thúc bài kiểm tra?</p>
        <div className="modal-buttons">
          <button onClick={handleFinishQuiz}>OK</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
