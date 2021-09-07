import React, { useEffect, useState } from 'react';

import { useStatusContext } from '../../../context/StatusContextProvider';
import { loadingGIF } from '../../../images';

const LoadingModal = () => {
  const [longLoad, setLongLoad] = useState(false);

  const status = useStatusContext();

  useEffect(() => {
    /* Start countdown to "long load" message when loading.
       Addresses long wait time when waking up API from hibernation on Heroku.
       Heroku puts API to sleep after 30 minutes of inactivity */
    if (status.isLoading) {
      setLongLoad(false);
      setTimeout(() => {
        // If status is still loading by the end of countdown, move to long load
        if(status.isLoading) {
          setLongLoad(true);
        }
    }, 2000);
    } else {
      setLongLoad(false);
    }
  }, [status.isLoading]);

  return (
    <div className='loading-container'>
      { status.isLoading &&
        <div className={ status.isLoading ? 'modal-container loading' : 'modal-container inactive' }>
          <div className='modal'>
            <img className='m-auto' src={ loadingGIF } alt='loading' />
            <p>{ longLoad ? 'Waking up API on Heroku...' : 'loading...' }</p>
          </div>
        </div>
      }
    </div>
  );
}

export default LoadingModal;