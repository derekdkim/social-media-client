import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const CommentEditor = (props) => {
  const [inputText, setInputText] = useState('');

  const { comment, closeEditor } = props;
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
    axios.put(`https://journey-social-media-server.herokuapp.com/comments/${comment._id}`, 
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

        // Update Comments
        status.setUpdateComments(true);

        // Close Editor
        closeEditor();
      })
      .catch(err => {
        console.log(err);

        status.setIsLoading(false);
      })
  }

  useEffect(() => {
    if (comment) {
      setInputText(comment.text);
    }
  }, []);

  return (
    <div>
      <TextareaAutosize value={ inputText } onChange={ updateText } className='input-field w-full' />
      <div className='flex justify-end mt-4'>
        <button onClick={ closeEditor } className='button decline-btn'>
          <i className='fas fa-times'></i>
        </button>
        <button onClick={ submitEdit } className='button mx-4 px-6'>
          <i className='fas fa-check'></i>
        </button>
      </div>
    </div>
  );
}

export default CommentEditor;