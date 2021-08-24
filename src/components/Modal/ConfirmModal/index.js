import React from 'react';
import './index.css';

const ConfirmModal = (props) => {
  const { callbackEvent, dialogText, cancelEvent } = props;

  return (
    <div className='modal-container'>
      <div className='content-panel modal conf-modal'>
        <p>{dialogText}</p>
        <hr className='mx-2 my-8'></hr>
        <div className='card-item flex justify-around'>
          <button className='button' onClick={ cancelEvent }>Cancel</button>
          <button className='button' onClick={ callbackEvent }>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;