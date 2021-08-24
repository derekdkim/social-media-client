import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const CommentCreator = (props) => {
  const [formComplete, setFormComplete] = useState(false);
  const [text, setText] = useState({ errMsg: '' });

  const auth = useAuthContext();
  const status = useStatusContext();
  const { parent } = props;

  const updateInputText = (event) => {
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Blank comment
    if (currValue.length === 0) {
      currErrMsg = 'Cannot submit blank comment.';
    }

    // Length check
    if (currValue.length < 8 || currValue.length > 600) {
      currErrMsg = 'Comment must be between 8 and 5000 characters.';
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
    const url = `https://journey-social-media-server.herokuapp.com/comments/${parent._id}/new`;
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

        // Re-render Comments
        status.setUpdateComments(true);
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
    <div>
      <form onSubmit={ handleSubmit } className='flex flex-col'>
        <TextareaAutosize onChange={ updateInputText } maxLength={600} className='comment-field' type='text' placeholder='Share your thoughts!' />
        <button className='button ml-auto mt-4'>Post Comment</button>
      </form>
    </div>
  );
}

export default CommentCreator;