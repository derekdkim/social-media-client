import React, { useState } from 'react';
import './index.css';

const JourneyLink = () => {
  const [title, setTitle] = useState('Journey Title');
  const [dueDate, setDueDate] = useState(new Date());
  const [tags, setTags] = useState(['work', 'health', 'personal dev', 'soft skills']);

  return (
    <div className='journey-link-container panel-black'>
      <h3 className='journey-title'>{title}</h3>
      <p className='journey-due-date'>Due Date: {dueDate.toDateString()}</p>
      <div className='tags'>
        {tags.map((tag, index) => <span className='tag-badge' key={index}>{tag}</span>)}
      </div>
    </div>
  );
}

export default JourneyLink;