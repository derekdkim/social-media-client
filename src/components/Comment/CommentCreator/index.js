import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const CommentCreator = (props) => {
  const auth = useAuthContext();
  const status = useStatusContext();
  const { parent } = props;

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: 'onChange'
  });

  const createComment = (data, event) => {
    event.preventDefault();

    if (isValid) {
      const url = `https://journey-social-media-server.herokuapp.com/comments/${parent._id}/new`;

      // Start Loading
      status.setIsLoading(true);

      // TODO: Axios request
      axios.post(url, {
          text: data.text,
        }, 
        { headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
        })
        .then(() => {
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
  }
  
  return (
    <div>
      <form onSubmit={ handleSubmit(createComment) } className='flex flex-col'>
        <TextareaAutosize
          {...register('text', {
            required: 'Comment cannot be blank',
            maxLength: {
              value: 1000,
              message: 'Comment cannot exceed 1000 characters.'
            }
          })} 
          maxLength={1000} 
          className='comment-field' 
          type='text' 
          placeholder='Share your thoughts!' 
        />
        <button className={ isValid ? 'button ml-auto mt-4' : 'button ml-auto mt-4 disabled-btn' }>Post Comment</button>
      </form>
    </div>
  );
}

export default CommentCreator;