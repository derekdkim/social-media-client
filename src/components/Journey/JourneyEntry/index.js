import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import { UserIcon } from '../../../images';
import CommentCreator from '../../Comment/CommentCreator';
import JourneyComment from '../JourneyComment';

const JourneyEntry = (props) => {
  const [entryLiked, updateEntryLiked] = useState(false);
  const [commentsTab, setCommentsTab] = useState(false);
  const [commentsList, setCommentsList] = useState(null);
  const [timestamp, setTimestamp] = useState(new Date());
  const [lastCommentSubmitted, setLastCommentSubmitted] = useState(null);

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
  }, []);

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
      </div>
      <div className='p-2'>
        <p>{ entry.text }</p>
      </div>
      <div className='icon-footer'>
        <i onClick={ handleLikes } className={ entryLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
        <i onClick={ toggleComments } className={ commentsTab ? 'fas fa-comment' : 'far fa-comment' }></i>
      </div>
      { commentsTab &&
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
    </div>
  );
}

export default JourneyEntry;