import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const EntryEditor = (props) => {
  const [inputText, setInputText] = useState('');

  const { entry, closeEditor } = props;
  const auth = useAuthContext();
  const status = useStatusContext();


  const updateText = (event) => {
    if (event.target.value !== inputText) {
      setInputText(event.target.value);
    }
  }

  const submitEdit = () => {
    // Start Loading
    status.setIsLoading(true);

    // Submit request
    axios.put(`https://journey-social-media-server.herokuapp.com/entries/${entry.parent._id}/${entry._id}`, 
      {
        text: inputText
      },
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        // Finish Loading
        status.setIsLoading(false);

        // Close Editor
        closeEditor();

        status.setUpdateEntries(true);
      })
      .catch(err => {
        console.log(err);

        status.setIsLoading(false);
      })
  }

  useEffect(() => {
    if (entry) {
      setInputText(entry.text);
    }
  }, []);

  return (
    <div>
      <TextareaAutosize value={ inputText } onChange={ updateText } className='input-field w-full' />
      <div className='flex justify-end mt-4'>
        <button onClick={ closeEditor } className='button decline-btn'>Cancel</button>
        <button onClick={ submitEdit } className='button mx-4 px-6'>Save</button>
      </div>
    </div>
  );
}

export default EntryEditor;