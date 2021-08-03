import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const JourneyLink = (props) => {
  const [title, setTitle] = useState('Journey Title');
  const [dueDate, setDueDate] = useState(new Date());
  const [tags, setTags] = useState(['work', 'health', 'personal dev', 'soft skills', 'whatever-tag']);

  const { journey } = props;

  useEffect(() => {
    if (journey) {
      setTitle(journey.title);
      setDueDate(new Date(journey.dueDate));
    }
  }, []);

  return (
    <div className='journey-link-container content-panel card-item'>
      <Link to={`/journey-details/${journey._id}`}><h3 className='journey-title'>{title}</h3></Link>
      <p className='journey-due-date'>Due Date: {dueDate.toDateString()}</p>
      <div className='tags'>
        {tags.map((tag, index) => <span className='tag-badge' key={index}>{tag}</span>)}
      </div>
    </div>
  );
}

export default JourneyLink;