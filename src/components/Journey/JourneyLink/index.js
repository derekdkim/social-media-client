import React, { useState, useEffect } from 'react';

const JourneyLink = () => {
  const [title, setTitle] = useState('Journey Title');
  const [dueDate, setDueDate] = useState(new Date());
  const [tags, setTags] = useState(['work', 'health', 'personal dev', 'soft skills']);

  return (
    <div class='journey-link-container'>
      <h3 class='title'>{title}</h3>
      <p>Due Date: {dueDate.toDateString()}</p>
      <div class='tags'>
        {tags.map((tag, index) => <span class='tag-badge' key={index}>{tag}</span>)}
      </div>
    </div>
  );
}

export default JourneyLink;