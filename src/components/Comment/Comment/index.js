import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import axios from 'axios';

import { UserIcon } from '../../../images';
import CommentEditor from '../CommentEditor';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ConfirmModal from '../../Modal/ConfirmModal';
import CommentMenu from '../CommentMenu';
import useDetectOutsideClick from '../../util/useDetectOutsideClick';

const JourneyComment = (props) => {
  // Fetched data
  const [commentLiked, setCommentLiked] = useState(false);
  const [likedByCount, setLikedByCount] = useState(0);
  const [timestamp, setTimestamp] = useState(new Date());

  // Render states
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  // Settings menu popup control
  const menuRef = useRef(null);
  const [isMenuActive, setIsMenuActive] = useDetectOutsideClick(menuRef, false);

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

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  }

  const handleLikes = () => {
    if (commentLiked) {
      unlikeComment();
    } else {
      likeComment();
    }
  }

  const likeComment = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/comments/${comment._id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setCommentLiked(true);

      // Update Like Count
      setLikedByCount(res.data.likedCount);

      // Finish Loading
      status.setIsLoading(false);
    })
    .catch(err => {
      console.log(err);

      status.setIsLoading(false);
    });
  }

  const unlikeComment = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/comments/${comment._id}/unlike`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setCommentLiked(false);

      // Update Like Count
      setLikedByCount(res.data.likedCount);

      // Finish Loading
      status.setIsLoading(false);
    })
    .catch(err => {
      console.log(err);

      status.setIsLoading(false);
    });
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

  // Check if user already has liked this entry
  useEffect(() => {
    // If user already liked entry, set state to liked
    if (comment.likedBy.includes(auth.UUID)) {
      setCommentLiked(true);
    }

    // Update Like Count
    setLikedByCount(comment.likedBy.length);
  }, [comment]);



  return (
    <div className='flex flex-col my-2'>
      <div className='flex flex-row items-start'>
        {/* Avatar Picture */}
        <div className='flex-shrink-0'>
          <img src={ UserIcon } className='avatar mt-2' alt='commenter' />
        </div>
        {/* Author Info */}
        <div className='flex flex-col m-2'>
          <Link to={`/profile/${comment.author._id}`}>
            <p className='font-bold text-sm'>{ comment.author.username }</p>
          </Link>
          <span className='text-gray-500 text-xs'>{ formatDistance(timestamp, new Date()) }</span>
        </div>
        {/* Edit/Delete Ellipsis Menu*/}
        <div className='ml-auto self-center'>
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
        </div>
      </div>
      <div className='flex flex-col'>
        {/* Editor Button */}
        { editMode
          && /* Close Editor Button */
          <div className='ml-auto'>
            <button onClick={ closeEditor } >
              <i className='fas fa-times' ></i>
            </button>
            <button onClick={ openDeleteConfirm } className='ml-6'>
              <i className='fas fa-trash' ></i>
            </button>
          </div>
        }
        <div className='my-2'>
          { /* Text Content */
            editMode
            ? /* Edit Mode */
            <CommentEditor comment={ comment } closeEditor={ closeEditor } />
            : /* View Mode */
            <p className='text-xs md:text-sm whitespace-pre-wrap break-all'>
              { comment.text }
            </p>
          }
        </div>
        <div className='p-1'>
          <i onClick={ handleLikes } className={ commentLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
          <span className='ml-2'>{ likedByCount }</span>
        </div>
      </div>
      <div className='ml-auto p-2'>
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