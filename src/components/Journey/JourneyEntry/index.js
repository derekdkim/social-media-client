import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import { UserIcon } from '../../../images';
import CommentCreator from '../../Comment/CommentCreator';
import JourneyComment from '../JourneyComment';
import EntryEditor from '../../Entry/EntryEditor';
import ConfirmModal from '../../Modal/ConfirmModal';

const JourneyEntry = (props) => {
  const [entryLiked, updateEntryLiked] = useState(false);
  const [commentsList, setCommentsList] = useState(null);
  const [timestamp, setTimestamp] = useState(new Date());
  const [lastCommentSubmitted, setLastCommentSubmitted] = useState(null);

  // UI Toggle states
  const [commentsTab, setCommentsTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();
  const { entry } = props;

  const handleLikes = () => {
    updateEntryLiked(!entryLiked);
  }

  const toggleComments = () => {
    if (!commentsTab) {
      getComments();
    }
    setCommentsTab(prevState => !prevState);
  }

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

  const openDeletionConfirm = () => {
    if (!deleteMode) {
      setDeleteMode(true);
    }
  }

  const closeDeletionConfirm = () => {
    if (deleteMode) {
      setDeleteMode(false);
    }
  }

  const deleteEntry = () => {
    // Start Loading
    status.setIsLoading(true);

    // Submit request
    axios.delete(`https://journey-social-media-server.herokuapp.com/entries/${entry.parent._id}/${entry._id}`, 
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
        status.setUpdateEntries(true);
      })
      .catch(err => {
        console.log(err);

        status.setIsLoading(false);
      })
  }

  const getComments = () => {
      // Start Loading
    status.setIsLoading(true);

    axios.get(`https://journey-social-media-server.herokuapp.com/comments/${entry._id}/all`, 
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        // Save response to state
        setCommentsList(res.data.comments);

        // Loading Complete
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      })
  }

  useEffect(() => {
    // Update timestamp
    setTimestamp(new Date(entry.timestamp));
  }, [entry.timestamp]);

  useEffect(() => {
    getComments();
  }, [lastCommentSubmitted]);

  return (
    <div className='content-panel card-item'>
      <div className='author-container'>
        <img src={ UserIcon } className='avatar md:ml-2 'alt='profile-pic'/>
        <div className='author-info'>
          <p className='text-lg font-bold'>{ entry.author.username }</p>
          <p>{ timestamp.toDateString() }</p>
        </div>
        <div className='ml-auto p-2'>
          {/* Editor Button */}
          { editMode
            ? /* Close Editor & Delete Button */
            <button onClick={ closeEditor } >
              <i className='fas fa-times' ></i>
            </button>
            : /* Open Editor Button */
            <button onClick={ openEditor } >
              <i className='far fa-edit' ></i>
            </button>
          }
          <button onClick={ openDeletionConfirm } className='ml-6'>
            <i className='fas fa-trash' ></i>
          </button>
        </div>
      </div>
      <div className='p-2'>
        { editMode
          ? /* Edit Mode */
          <EntryEditor entry={ entry } closeEditor={ closeEditor } />
          : /* View Mode */
          <p>{ entry.text }</p>
        }
      </div>
      <div className='icon-footer'>
        <i onClick={ handleLikes } className={ entryLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
        <i onClick={ toggleComments } className={ commentsTab ? 'fas fa-comment' : 'far fa-comment' }></i>
      </div>
      { /* Comments */
        commentsTab &&
          <div>
            <h5 className='m-2'>{commentsList !== null && commentsList.length} Comments</h5>
            <div className='card-item'>
              <div>
                { commentsList !== null
                  ? commentsList.map((e, i) => <JourneyComment comment={ e } key={ i } />)
                  : <p>No comments yet. Be the first to write one!</p> }
              </div>
              <CommentCreator parent={entry} setLastCommentSubmitted={ setLastCommentSubmitted } />
            </div>
          </div>
      }
      { /* Confirmation Modal for Entry Deletion -- Accessible via Trash button */
        deleteMode &&
        <ConfirmModal 
          cancelEvent={ closeDeletionConfirm }
          callbackEvent={ deleteEntry }
          dialogText='Are you sure you want to delete this entry?'
        />
      }
    </div>
  );
}

export default JourneyEntry;