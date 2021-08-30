import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const CommentEditor = (props) => {
  const { comment, closeEditor } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

  const { register, setValue, handleSubmit, formState: { isValid }} = useForm({
    mode: 'onChange'
  });

  const submitEdit = (data, event) => {
    event.preventDefault();

    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      // Submit request
      axios.put(`https://journey-social-media-server.herokuapp.com/comments/${comment._id}`, 
        {
          text: data.text
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
  }

  useEffect(() => {
    if (comment) {
      setValue('text', comment.text);
    }
  }, []);

  return (
    <div>
      <form onSubmit={ handleSubmit(submitEdit) }>
        <TextareaAutosize 
          {...register('text', {
            required: 'Comment cannot be submitted if blank'
          })} 
          type='text' 
          className='input-field w-full' 
        />
        <div className='flex justify-end mt-4'>
          <button onClick={ closeEditor } className='button decline-btn'>
            <i className='fas fa-times'></i>
          </button>
          <button className={ isValid ? 'button mx-4 px-6' : 'button mx-4 px-6 disabled-btn' }>
            <i className='fas fa-check'></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentEditor;