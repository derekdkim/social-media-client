import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import { UserIcon } from '../../../images';
import CommentCreator from '../../Comment/CommentCreator';
import JourneyComment from '../JourneyComment';
import EntryEditor from '../../Entry/EntryEditor';
import ConfirmModal from '../../Modal/ConfirmModal';
import useDetectOutsideClick from '../../util/useDetectOutsideClick';
import CommentMenu from '../../Comment/CommentMenu';

const JourneyEntry = (props) => {
  const [entryLiked, setEntryLiked] = useState(false);
  const [likedByCount, setLikedByCount] = useState(0);
  const [commentsList, setCommentsList] = useState(null);
  const [timestamp, setTimestamp] = useState(new Date());

  // UI Toggle states
  const [commentsTab, setCommentsTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const menuRef = useRef(null);
  const [isMenuActive, setIsMenuActive] = useDetectOutsideClick(menuRef, false);

  const auth = useAuthContext();
  const status = useStatusContext();
  const { entry } = props;

  const handleLikes = () => {
    if (entryLiked) {
      unlikeEntry();
    } else {
      likeEntry();
    }
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

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  }

  const likeEntry = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/entries/${entry.parent._id}/${entry._id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setEntryLiked(true);

      // Update likedByCount
      setLikedByCount(res.data.likedCount);

      // Finish Loading
      status.setIsLoading(false);
    })
    .catch(err => {
      console.log(err);

      status.setIsLoading(false);
    });
  }

  const unlikeEntry = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/entries/${entry.parent._id}/${entry._id}/unlike`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setEntryLiked(false);

      // Update likedByCount
      setLikedByCount(res.data.likedCount);

      // Finish Loading
      status.setIsLoading(false);
    })
    .catch(err => {
      console.log(err);

      status.setIsLoading(false);
    });
  }

  const deleteEntry = () => {
    // Start Loading
    status.setIsLoading(true);

    // Close Comments tab
    // Prevents a bug where the comments tab of the deleted tab would appear on the next tab until re-rendering.
    setCommentsTab(false);

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
      });
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

  // Force update after DB changes
  useEffect(() => {
    if (status.updateComments) {
      getComments();
      status.setUpdateComments(false);
    }
  }, [status.updateComments]);

  // Check if user already has liked this entry
  useEffect(() => {
    // If user already liked entry, set state to liked
    if (entry.likedBy.includes(auth.UUID)) {
      setEntryLiked(true);
    }

    // Update likedByCount
    setLikedByCount(entry.likedBy.length);
  }, [entry]);

  // Get comments on component mounting
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className='content-panel card-item'>
      <div className='author-container'>
        {/* Hide when editing */
          !editMode &&
          <div className='flex flex-row'>
            <img src={ UserIcon } className='avatar md:ml-2 'alt='profile-pic'/>
            <div className='author-info'>
              <Link to={`/profile/${entry.author._id}`}>
                <p className='text-lg font-bold'>{ entry.author.username }</p>
              </Link>
              <p>{ timestamp.toDateString() }</p>
            </div>
          </div>
        }
        <div className='ml-auto p-2'>
          {/* Editor Button */}
          { !editMode 
            && 
            <button onClick={ toggleMenu } type='button'><i className='fas fa-ellipsis-v'></i></button>
          }
          { isMenuActive 
            && 
            <CommentMenu 
              menuRef={ menuRef } 
              toggleMenu={ toggleMenu } 
              openEditor={ openEditor } 
              openDeleteConfirm={ openDeleteConfirm } 
            /> 
          }
          { editMode
            && /* Close Editor Button */
            <div>
              <button onClick={ closeEditor } >
                <i className='fas fa-times' ></i>
              </button>
              <button onClick={ openDeleteConfirm } className='ml-6'>
                <i className='fas fa-trash' ></i>
              </button>
            </div>
          }
        </div>
      </div>
      <div className='m-2 p-2'>
        { editMode
          ? /* Edit Mode */
          <EntryEditor entry={ entry } closeEditor={ closeEditor } />
          : /* View Mode */
          <p className='whitespace-pre-wrap'>{ entry.text }</p>
        }
      </div>
      <div className='icon-footer'>
        <span className='mx-2'>{ likedByCount }</span>
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
              <CommentCreator parent={entry} />
            </div>
          </div>
      }
      { /* Confirmation Modal for Entry Deletion -- Accessible via Trash button */
        deleteMode &&
        <ConfirmModal 
          cancelEvent={ closeDeleteConfirm }
          callbackEvent={ deleteEntry }
          dialogText='Are you sure you want to delete this entry?'
        />
      }
    </div>
  );
}

export default JourneyEntry;