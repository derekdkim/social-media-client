import React, { useState, useEffect } from 'react';

const useDetectOutsideClick = (ref, initState) => {
  const [isActive, setIsActive] = useState(initState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If active ref exists and is outside of target ref
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    }

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [isActive, ref]);

  return [isActive, setIsActive];
}

export default useDetectOutsideClick;