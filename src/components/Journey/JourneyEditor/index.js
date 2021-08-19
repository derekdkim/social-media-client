import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const JourneyEditor = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [workingDesc, setWorkingDesc] = useState('');
  const [workingDueDate, setWorkingDueDate] = useState(null);

  const { journey } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

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
      // Clear the workingDueDate
      setWorkingDueDate(null);

      // Stop rendering the editor panel
      setEditDate(false);
    }
  }

  const updateDesc = (event) => {
    if (event.target.value !== workingDesc) {
      setWorkingDesc(event.target.value);
    }
  }

  const updateDate = (event) => {
    if (event.target.value !== workingDueDate) {
      setWorkingDueDate(event.target.value);
    }
  }
  
  const submitEdit = () => {
    let input = {
      desc: workingDesc
    };

    // Placeholder if the user submitted a blank description
    if (workingDesc.length > 1) {
      input.desc = 'No description.';
    }

    // Add/update due date if the user chose to edit the date
    if (editDate && workingDueDate !== null) {
      input.dueDate = workingDueDate
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

  useEffect(() => {
    // Set desc props to state for editing
    if (journey.desc) {
      setWorkingDesc(journey.desc);
    }
  }, []);

  return (
    <div>
      {/* Conditional rendering depending on button click */}
      { editMode
          ? /* Editor */
          <div className='card-item'>
            {/* Date Editor */}
            <div>
              { editDate
                  ? /* Date Input */
                  <div>
                    <input onChange={ updateDate } type='date'></input>
                    <button onClick={ disableDateEditor } className='button w-full mb-4'>Cancel Changes</button>
                  </div>

                  : /* Button to bring up Date Editor */
                  <button onClick={ enableDateEditor } className='button w-full mb-4'>Add/Change Due Date</button>
              }
            </div>
            <TextareaAutosize onChange={ updateDesc } value={ workingDesc } className='content-panel card-item' />
            <button onClick={ submitEdit } className='button w-full mb-4'>Save Journey Details</button>
          </div>

          : /* Viewer */
          <div>
            <div className='content-panel card-item'>
              <p>{ workingDesc }</p>
            </div>
            <button onClick={ enableEditor } className='button w-full mb-4'>Edit Journey Details</button>
          </div>
      }
    </div>
  );
}

export default JourneyEditor;