import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import JourneyEntry from '../JourneyEntry';
import EntryCreator from '../../Entry/EntryCreator';
import JourneyEditor from '../JourneyEditor';
import { formatPrivacy } from '../../util/stringFormatter';

const JourneyDetailPage = () => {
  const [journey, setJourney] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [entryWrite, setEntryWrite] = useState(false);
  const [entries, setEntries] = useState(null);
  const [renderEntries, setRenderEntries] = useState(false);
  const [lastEntrySubmitted, setLastEntrySubmitted] = useState(null);

  const { id } = useParams();
  const auth = useAuthContext();
  const status = useStatusContext();

  const joinJourney = () => {
    // TODO: Connect to API
    setIsParticipant(true);
  }

  const leaveJourney = () => {
    // TODO: Connect to API
    setIsParticipant(false);
  }

  const deleteJourney = () => {

  }

  // Button event handlers to toggle Entry Creator on and off
  const openEntryCreator = () => {
    if (!entryWrite) {
      setEntryWrite(true);
    }
  }

  const closeEntryCreator = () => {
    if (entryWrite) {
      setEntryWrite(false);
    }
  }

  // Fetch API data on component mount
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

  // Fetch entries data from API after fetching journey data
  useEffect(() => {
    if (journey) {
      // Start Loading
      status.setIsLoading(true);

      // Fetch entries
      axios.get(`https://journey-social-media-server.herokuapp.com/entries/${id}/all`,
        { headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          setEntries(res.data.entries);

          // Decide if there are any results to render
          if (res.data.entries.length > 0) {
            setRenderEntries(true);
          }

          // Loading Complete
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);

          // Loading Complete
          status.setIsLoading(false);
        });
    }
  }, [journey, lastEntrySubmitted]);

  return (
    <div>
      { journey != null &&
        <div className='page-container journey-det-container'>
          <div>
            <h1 className='text-3xl text-center card-item dbrown-text'>{ journey.title }</h1>
          </div>
          {/* Side Tab */}
          <div className='journey-info-container'>
            <div className='content-panel card-item'>
              <ul>
                <li>Created by { journey.author.username }</li>
                <li>Started on { timestamp.toDateString() }</li>
                <li>Privacy: { formatPrivacy() }</li>
                { journey.dueDate !== undefined && 
                  <li>Due Date: { dueDate.toDateString() }</li>
                }
                <li><a href=''>{ journey.participants.length + 1 }</a> Participants</li>
              </ul>
            </div>
            <div className='content-panel card-item'>
              <p>{ journey.desc }</p>
            </div>
            <div className='card-item'>
              { isAuthor 
                  ? 
                  <div>
                      <JourneyEditor journey={ journey } />
                      <button onClick={ deleteJourney } className='button w-full decline-btn'>Delete this journey</button>
                    </div>
                  : isParticipant 
                  ? <button onClick={ leaveJourney } className='button w-full decline-btn'>Leave this journey</button>
                  : <button onClick={ joinJourney } className='button w-full'>Join this journey</button>
              }
            </div>
          </div>
          <div className='card-item'>
            {/* Entry Creator -- Toggleable via button */}
            { entryWrite
              ? <div>
                  <button onClick={ closeEntryCreator } className='button'>-</button>
                  <EntryCreator parent={ journey } setLastEntrySubmitted={ setLastEntrySubmitted } />
                </div> 
              : <button onClick={ openEntryCreator } className='button'>+ Write an Entry</button>
            }
            {/* Entries List */}
            { renderEntries  
              ? entries.map((entry, index) => <JourneyEntry entry={ entry } key={ index } />)
              : <div className='content-panel card-item'>There are currently no entries in this journey. Create one!</div>
            }
          </div>
        </div>
      }
    </div>

  );
}

export default JourneyDetailPage;