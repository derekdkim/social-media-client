import React from 'react';

const ConfirmModal = (props) => {
  const { callbackEvent, dialogText, cancelEvent } = props;

  return (
    <div className='modal-container'>
      <div className='content-panel modal p-12'>
        <p>{dialogText}</p>
        <hr className='mx-2 my-8'></hr>
        <div className='card-item flex justify-around'>
          <button className='button mr-2' onClick={ cancelEvent }>Cancel</button>
          <button className='button ml-2' onClick={ callbackEvent }>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;