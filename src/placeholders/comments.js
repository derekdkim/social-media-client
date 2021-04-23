import lorem from './lorem';

const comments = [
  {
    author: 'John Doe',
    timestamp: new Date('December 17, 2020'),
    content: 'First!',
    likes: 16
  },
  {
    author: 'whateverman',
    timestamp: new Date('January 04, 2021'),
    content: lorem,
    likes: 332
  },
  {
    author: 'Laughing Spammer',
    timestamp: new Date('April 01, 2021'),
    content: 'hahahahhahhahahahahahhahahahah',
    likes: 0
  },
  {
    author: 'John Doe',
    timestamp: new Date('April 20, 2021'),
    content: 'Great entry! Keep it up!',
    likes: 16
  },
  {
    author: 'John Doe',
    timestamp: new Date('April 23, 2021'),
    content: 'Why are you so bad at this?',
    likes: 16
  },
];

export default comments;