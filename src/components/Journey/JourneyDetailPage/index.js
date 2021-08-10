import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import JourneyEntry from '../JourneyEntry';

const JourneyDetailPage = () => {
  const [journey, setJourney] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const { id } = useParams();
  const auth = useAuthContext();
  const status = useStatusContext();

  const joinJourney = () => {
    setIsParticipant(true);
  }

  const leaveJourney = () => {
    setIsParticipant(false);
  }

  const deleteJourney = () => {

  }

  useEffect(() => {
    if (auth.loggedIn && id) {
      // Start Loading
      status.setIsLoading(true);

      // Fetch journey
      axios.get(`https://journey-social-media-server.herokuapp.com/journeys/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          // Commit fetched journey data to state
          setJourney(res.data.journey);

          if (res.data.journey.author.uuid === auth.UUID) {
            setIsAuthor(true);
            
            // Set dates to readable format
            setTimestamp(new Date(res.data.journey.timestamp));
            // Due Date is optional
            if (res.data.journey.dueDate !== undefined) {
              setDueDate(new Date(res.data.journey.dueDate));
            }


            // Loading Complete
            status.setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);

          //Loading Complete
          status.setIsLoading(false);
        });
    }
  }, []);

  return (
    <div>
      { journey != null &&
        <div className='page-container journey-det-container'>
          <div>
            <h1 className='text-3xl text-center card-item dbrown-text'>{journey.title}</h1>
          </div>
          <div className='journey-info-container'>
            <div className='content-panel card-item'>
              <ul>
                <li>Created by {journey.author.username}</li>
                <li>Started on {timestamp.toDateString()}</li>
                { journey.dueDate !== undefined && 
                  <li>Due Date: {dueDate.toDateString()}</li>
                }
                <li><a href=''>{journey.participants.length + 1}</a> Participants</li>
              </ul>
            </div>
            <div className='content-panel card-item'>
              <p>{journey.desc}</p>
            </div>
            <div className='card-item'>
              { isAuthor 
                  ? <button onClick={ deleteJourney } className='button w-full decline-btn'>Delete this journey</button>
                  : isParticipant 
                  ? <button onClick={ leaveJourney } className='button w-full decline-btn'>Leave this journey</button>
                  : <button onClick={ joinJourney } className='button w-full'>Join this journey</button>
              }
            </div>
          </div>
          <div className='card-item'>
            <JourneyEntry />
            <JourneyEntry />
            <JourneyEntry />
            <JourneyEntry />
            <JourneyEntry />
          </div>
        </div>
      }
    </div>

  );
}

export default JourneyDetailPage;