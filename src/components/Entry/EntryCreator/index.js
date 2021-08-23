import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const EntryCreator = (props) => {
  const [formComplete, setFormComplete] = useState(false);
  const [text, setText] = useState({ errMsg: '' });

  const auth = useAuthContext();
  const status = useStatusContext();
  const { parent, setLastEntrySubmitted } = props;

  const updateInputText = (event) => {
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Blank entry
    if (currValue.length === 0) {
      currErrMsg = 'Cannot submit blank entry.';
    }

    // Length check
    if (currValue.length < 8 || currValue.length > 5000) {
      currErrMsg = 'Entries must be between 8 and 5000 characters.';
    }

    // Validity check
    if (currErrMsg !== '') {
      currValidity = false; 
    }

    // Set state
    setText({
      value: currValue,
      errMsg: currErrMsg,
      valid: currValidity
    });
  }

  const handleSubmit = (event) => {
    const url = `https://journey-social-media-server.herokuapp.com/entries/${parent._id}/new`;
    event.preventDefault();

    // Start Loading
    status.setIsLoading(true);

    // TODO: Axios request
    axios.post(url, {
        text: text.value,
      }, 
      { headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
      })
      .then(res => {
        console.log(res);

        // Loading Complete
        status.setIsLoading(false);
        setLastEntrySubmitted(res.data.entry);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      });
  }

  useEffect(() => {
    // Check for form completion
    if (text.valid) {
      if (!formComplete) {
        setFormComplete(true);
      }
    } else {
      setFormComplete(false);
    }
  }, [text]);
  
  return (
    <div className='content-panel card-item input-container'>
      <form onSubmit={ handleSubmit }>
        <div className='entry-creator-container'>
          <TextareaAutosize minRows={4} onChange={ updateInputText } maxLength={5000} className='input-field entry-creator-field' placeholder="Share what's on your mind!"/>
          <button className={formComplete ? 'button ml-auto mt-4' : 'button ml-auto mt-4 disabled-btn'}>Post Entry</button>
        </div>
      </form>
    </div>
  );
}

export default EntryCreator;