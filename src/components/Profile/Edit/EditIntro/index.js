import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import TextareaAutosize from 'react-textarea-autosize';

const EditIntro = (props) => {
  const { intro, editUser } = props;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const editIntro = (data, e) => {
    e.preventDefault();

    editUser({ intro: data.intro });
  }

  // Set initial field value to props data
  useEffect(() => {
    setValue('intro', intro);
  }, [intro]);

  return (
    <div className='card-item'>
      <form onSubmit={ handleSubmit(editIntro) } >
        <div className='input-container'>
          <label htmlFor='intro-input'>About Me</label>
          <TextareaAutosize
            {...register('intro', { 
              required: 'This is required.',
              maxLength: { value: 300, message: 'The introduction cannot be longer than 300 characters.'}
            })}
            className='input-field' 
            id='intro-input' 
          />
          <ErrorMessage errors={errors} name="intro">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <button className='button'>Save Intro</button>
      </form>
    </div>
  );
}

export default EditIntro;