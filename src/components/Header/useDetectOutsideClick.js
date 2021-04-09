import React, { useState, useEffect } from 'react';

export const useDetectOutsideClick = (element, initState) => {
  const [isActive, setIsActive] = useState(initState);

  useEffect(() => {
    console.log(element.current);
    const pageClickEvent = (e) => {
      // If active element exists and is outside of target element
      if (element.current !== null && !element.current.contains(e.target)) {
        console.log(`Clicked outside. Current state: ${isActive}`);
        setIsActive(!isActive);
      }
    }

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [isActive, element]);

  return [isActive, setIsActive];
}