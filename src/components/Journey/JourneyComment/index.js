import React, { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import './index.css';

import { UserIcon } from '../../../images';
import CommentEditor from '../../Comment/CommentEditor';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ConfirmModal from '../../Modal/ConfirmModal';

const JourneyComment = (props) => {
  const [entryLiked, updateEntryLiked] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date());

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const { comment } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

  const openEditor = () => {
    if (!editMode) {
      setEditMode(true);
    }
  }

  const closeEditor = () => {
    if (editMode) {
      setEditMode(false);
    }
  }

  const openDeleteConfirm = () => {
    if (!deleteMode) {
      setDeleteMode(true);
    }
  }

  const closeDeleteConfirm = () => {
    if (deleteMode) {
      setDeleteMode(false);
    }
  }

  const handleLikes = () => {
    updateEntryLiked(!entryLiked);
  }

  const deleteComment = () => {
    // Start Loading
    status.setIsLoading(true);

    // Submit request
    axios.delete(`https://journey-social-media-server.herokuapp.com/comments/${comment._id}`, 
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(() => {
        // Finish Loading
        status.setIsLoading(false);

        // Close Modal
        setDeleteMode(false);

        // Queue entry re-render
        status.setUpdateComments(true);
      })
      .catch(err => {
        console.log(err);

        status.setIsLoading(false);
      })
  }

  useEffect(() => {
    // Update timestamp
    setTimestamp(new Date(comment.timestamp));
  }, []);

  return (
    <div className='comment-container'>
      <div className='flex-shrink-0'>
        <img src={ UserIcon } className='avatar mt-2' alt='commenter' />
      </div>
      <div className='flex flex-col ml-2 w-5/6'>
        <div className='flex flex-col lg:flex-row'>
          <p className='font-bold text-sm'>{ comment.author.username }</p>
          <span className='text-gray-500 text-xs lg:self-center lg:ml-1'>{ formatDistance(timestamp, new Date()) }</span>
        </div>
        <div className='mt-1'>
          { /* Text Content */
            editMode
            ? /* Edit Mode */
            <CommentEditor comment={ comment } closeEditor={ closeEditor } />
            : /* View Mode */
            <p className='comment-content'>{ comment.text }</p>
          }
        </div>
        <div className='p-1'>
          <i onClick={ handleLikes } className={ entryLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
          <span className='ml-2'>{ comment.likedBy.length }</span>
        </div>
      </div>
      <div className='ml-auto p-2'>
        {/* Editor Button */}
        { editMode
          ? /* Close Editor Button */
          <button onClick={ closeEditor } >
            <i className='fas fa-times' ></i>
          </button>
          : /* Open Editor Button */
          <button onClick={ openEditor } >
            <i className='far fa-edit' ></i>
          </button>
        }
        <button onClick={ openDeleteConfirm } className='ml-6'>
          <i className='fas fa-trash' ></i>
        </button>
      </div>
      {/* Delete Confirm Modal */
        deleteMode &&
        <ConfirmModal 
          callbackEvent={ deleteComment }
          cancelEvent={ closeDeleteConfirm }
          dialogText='Are you sure you want to delete this comment?'
        />
      }
    </div>
  );
}

export default JourneyComment;