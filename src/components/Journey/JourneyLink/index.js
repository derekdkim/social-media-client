import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import { formatPrivacy } from '../../util/stringFormatter';

const JourneyLink = (props) => {
  const [title, setTitle] = useState('Journey Title');
  const [dueDateExists, setDueDateExists] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const { journey } = props;

  useEffect(() => {
    if (journey) {
      setTitle(journey.title);
      // If due date exists
      if (journey.dueDate !== undefined) {
        setDueDate(new Date(journey.dueDate));
        setDueDateExists(true);
      }
    }
  }, []);

  return (
    <div className='journey-link-container content-panel card-item'>
      <Link to={`/journey-details/${journey._id}`}><h3 className='journey-title'>{title}</h3></Link>
      <p className='right-item'>{dueDateExists ? `Due Date: ${dueDate.toDateString()}` : 'Endless Journey'}</p>
      <div className='mx-2 pb-2 flex items-end'>{journey.participants.length} Participants</div>
      <div className='right-item flex items-end'>{formatPrivacy(journey.privacy)}</div>
    </div>
  );
}

export default JourneyLink;