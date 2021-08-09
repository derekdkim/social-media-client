import React from 'react';
import './index.css';

import { useStatusContext } from '../../../context/StatusContextProvider';
import { loadingGIF } from '../../../images';

const LoadingModal = () => {
  const status = useStatusContext();

  return (
    <div className='loading-container'>
      { status.isLoading &&
        <div className={ status.isLoading ? 'loading-indicator loading' : 'loading-indicator inactive' }>
          <div className='loading-modal'>
            <img className='loading-indicator--img' src={ loadingGIF } alt='loading' />
            <p>Loading...</p>
          </div>
        </div>
      }
    </div>
  );
}

export default LoadingModal;