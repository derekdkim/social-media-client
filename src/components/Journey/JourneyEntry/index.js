import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';

import { UserIcon } from '../../../images';
import lorem from '../../../placeholders/lorem';
import JourneyComment from '../JourneyComment';
import comments from '../../../placeholders/comments';

const JourneyEntry = () => {
  const [entryLiked, updateEntryLiked] = useState(false);
  const [commentsTab, setCommentsTab] = useState(false);

  const handleLikes = () => {
    updateEntryLiked(!entryLiked);
  }

  const toggleComments = () => {
    setCommentsTab(prevState => !prevState);
  }

  return (
    <div className='content-panel card-item'>
      <div className='author-container'>
        <img src={ UserIcon } className='avatar md:ml-2 'alt='profile-pic'/>
        <div className='author-info'>
          <p className='text-lg font-bold'>User</p>
          <p>April 8, 2021</p>
        </div>
      </div>
      <div className='p-2'>
        <p>{ lorem }</p>
      </div>
      <div className='icon-footer'>
        <i onClick={ handleLikes } className={ entryLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
        <i onClick={ toggleComments } className={ commentsTab ? 'fas fa-comment' : 'far fa-comment' }></i>
      </div>
      { commentsTab &&
          <div>
            <h5 className='m-2'>Comments</h5>
            <div className='card-item'>
              <div>
                { comments.map((e, i) => <JourneyComment data={ e } key={ i } />) }
              </div>
              <div className='flex flex-col'>
                <TextareaAutosize className='comment-field' type='text' placeholder='Share your thoughts!' />
                <button className='button ml-auto mt-4'>Post Comment</button>
              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default JourneyEntry;