import React, { useEffect, useState } from 'react';
import './index.css';

import { useStatusContext } from '../../../context/StatusContextProvider';
import { loadingGIF } from '../../../images';

const LoadingModal = () => {
  const [longLoad, setLongLoad] = useState(false);

  const status = useStatusContext();

  useEffect(() => {
    setTimeout(() => {
      setLongLoad(true);
    }, 2000);
  }, []);

  return (
    <div className='loading-container'>
      { status.isLoading &&
        <div className={ status.isLoading ? 'loading-indicator loading' : 'loading-indicator inactive' }>
          <div className='loading-modal'>
            <img className='loading-indicator--img' src={ loadingGIF } alt='loading' />
            <p>{ longLoad ? 'Waking up API on Heroku...' : 'loading...' }</p>
          </div>
        </div>
      }
    </div>
  );
}

export default LoadingModal;