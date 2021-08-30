import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const EntryEditor = (props) => {
  const { entry, closeEditor } = props;
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
      axios.put(`https://journey-social-media-server.herokuapp.com/entries/${entry.parent._id}/${entry._id}`, 
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

          // Close Editor
          closeEditor();

          status.setUpdateEntries(true);
        })
        .catch(err => {
          console.log(err);

          status.setIsLoading(false);
        })
    }
  }

  useEffect(() => {
    if (entry) {
      setValue('text', entry.text);
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
          <button type='button' onClick={ closeEditor } className='button decline-btn'>Cancel</button>
          <button type='submit' className={ isValid ? 'button mx-4 px-6' : 'button mx-4 px-6 disabled-btn' }>Save</button>
        </div>
      </form>
    </div>
  );
}

export default EntryEditor;