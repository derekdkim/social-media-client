import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const JourneyEditor = (props) => {
  // Editor settings
  const [editMode, setEditMode] = useState(false);
  const [editDate, setEditDate] = useState(false);
  // Input value states
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [inputDueDate, setInputDueDate] = useState(null);
  const [inputPrivacy, setInputPrivacy] = useState(0);

  const { journey } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

  /* Open/close Editors */
  const enableEditor = () => {
    if (!editMode) {
      setEditMode(true);
    }
  }

  const enableDateEditor = () => {
    if (!editDate) {
      setEditDate(true);
    }
  }

  const disableDateEditor = () => {
    if (editDate) {
      // Clear the inputDueDate
      setInputDueDate(null);

      // Stop rendering the editor panel
      setEditDate(false);
    }
  }

  /* Value Updaters */
  const updateTitle = (event) => {
    if (event.target.value !== inputTitle) {
      setInputTitle(event.target.value);
    }
  }

  const updateDesc = (event) => {
    if (event.target.value !== inputDesc) {
      setInputDesc(event.target.value);
    }
  }

  const updateDate = (event) => {
    if (event.target.value !== inputDueDate) {
      setInputDueDate(event.target.value);
    }
  }

  const updatePrivacy = (event) => {
    if (event.target.value !== inputPrivacy) {
      setInputPrivacy(parseInt(event.target.value));
    }
  }
  
  const submitEdit = () => {
    let input = {
      title: inputTitle,
      desc: inputDesc,
      privacy: inputPrivacy
    };

    // Placeholder if the user submitted a blank description
    if (inputDesc.length > 1) {
      input.desc = 'No description.';
    }

    // Add/update due date if the user chose to edit the date
    if (editDate && inputDueDate !== null) {
      input.dueDate = inputDueDate
    }

    // Start Loading
    status.setIsLoading(true);

    // Axios PUT request
    axios.put(`https://journey-social-media-server.herokuapp.com/journeys/${journey._id}`, {
        ...input
      },
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(() => {
        // Go back to View Mode
        setEditMode(false);

        // Loading Complete
        status.setIsLoading(false);    
      })
  }

  // Initialize states with props journey data
  useEffect(() => {
    if (journey) {
      setInputTitle(journey.title);
      setInputDesc(journey.desc);
      setInputPrivacy(journey.privacy);

      // Add due date if it exists
      if (journey.dueDate) {
        setInputDueDate(new Date(journey.dueDate));
      }
    }
  }, []);

  return (
    <div>
      {/* Conditional rendering depending on button click */}
      { editMode
          ? /* Editor */
          <div className='content-panel card-item'>
            {/* Title */}
            <div className='input-container'>
              <label htmlFor='journey-title-edit'>Title</label>
              <input type='text' onChange={ updateTitle } value={ inputTitle } maxLength={140} className='input-field' id='journey-title-edit'></input>
            </div>
            {/* Description */}
            <div className='input-container'>
              <label htmlFor='journey-desc-edit'>Description</label>
              <TextareaAutosize onChange={ updateDesc } value={ inputDesc } className='input-field' id='journey-desc-edit' />
            </div>
            {/* Privacy */}
            <div className='input-container'>
              <label htmlFor='journey-privacy-edit'>Choose who can see your journey</label>
              <select name='privacy' onChange={ updatePrivacy } value={ inputPrivacy } className='input-field' id='journey-privacy-edit'>
                <option value='0'>Public</option>
                <option value='1'>Friends Only</option>
                <option value='2'>Private</option>
              </select>
            </div>
            {/* Date Editor */}
            <div className='input-container'>
              <p>Do you want to add/change the due date?</p>
              { editDate
                  ? /* Date Input */
                  <div className='input-container'>
                    <label htmlFor='journey-date-edit'>New Due Date</label>
                    <input onChange={ updateDate } value={ inputDueDate !== null ? inputDueDate : new Date() } type='date' className='input-field' id='journey-date-edit'></input>
                    <button onClick={ disableDateEditor } className='button w-full mb-4'>Cancel Changes</button>
                  </div>

                  : /* Button to bring up Date Editor */
                  <button onClick={ enableDateEditor } className='button w-full mb-4'>Add/Change Due Date</button>
              }
            </div>
            <button onClick={ submitEdit } className='button w-full mb-4'>Save Journey Details</button>
          </div>

          : /* Viewer */
          <div>
            <div className='content-panel card-item'>
              <p>{ inputDesc }</p>
            </div>
            <button onClick={ enableEditor } className='button w-full mb-4'>Edit Journey Details</button>
          </div>
      }
    </div>
  );
}

export default JourneyEditor;