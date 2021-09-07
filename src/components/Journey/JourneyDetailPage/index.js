import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import Entry from '../../Entry/Entry';
import EntryCreator from '../../Entry/EntryCreator';
import JourneyEditor from '../JourneyEditor';
import { formatPrivacy } from '../../util/stringFormatter';
import ConfirmModal from '../../Modal/ConfirmModal';

const JourneyDetailPage = () => {
  // Journey data
  const [journey, setJourney] = useState(null);
  const [author, setAuthor] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [entries, setEntries] = useState(null);
  const [likedByCount, setLikedByCount] = useState(0);
  const [participantCount, setParticipantCount] = useState(0);

  // UI Access states
  const [isParticipant, setIsParticipant] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [entryWrite, setEntryWrite] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);
  const [journeyLiked, setJourneyLiked] = useState(false);

  // Rendering states
  const [renderEntries, setRenderEntries] = useState(false);
  const [redirectPage, setRedirectPage] = useState(false);

  // Props and global context
  const { id } = useParams();
  const auth = useAuthContext();
  const status = useStatusContext();

  const joinJourney = () => {
    if (!isParticipant) {
      // Start Loading
      status.setIsLoading(true);

      axios.put(`https://journey-social-media-server.herokuapp.com/journeys/join/${id}`, {}, {
        headers: {
          'Authorization' : `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        if (res.data.message === 'success') {
          // Update Participant Count
          setParticipantCount(res.data.participants.length);

          // Set user as participant
          setIsParticipant(true);
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
  }

  const leaveJourney = () => {
    if (isParticipant) {
      // Start Loading
      status.setIsLoading(true);

      axios.put(`https://journey-social-media-server.herokuapp.com/journeys/leave/${id}`, {}, {
        headers: {
          'Authorization' : `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        if (res.data.message === 'success') {
          // Update Participant Count
          setParticipantCount(res.data.participants.length);

          // Set user as being no longer a participant
          setIsParticipant(false);
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
  }

  // DELETE - Only accessible via ConfirmModal
  const deleteJourney = () => {
    // Start loading
    status.setIsLoading(true);

    // Start deleting
    axios.delete(`https://journey-social-media-server.herokuapp.com/journeys/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(() => {
        // Loading Complete
        status.setIsLoading(false);

        // Redirect page
        setRedirectPage(true);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      });
  }

  // Like Journey State toggle
  const handleLikes = () => {
    if (journeyLiked) {
      unlikeJourney();
    } else {
      likeJourney();
    }
  }

  // Event handlers for the Deletion button and Confirm Modal
  const openDeletionConfirm = () => {
    if (!confirmActive) {
      setConfirmActive(true);
    }
  }

  const closeDeletionConfirm = () => {
    if (confirmActive) {
      setConfirmActive(false);
    }
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

  const fetchJourney = () => {
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

          // Set dates to readable format
          setTimestamp(new Date(res.data.journey.timestamp));

          // Due Date is optional
          if (res.data.journey.dueDate !== undefined) {
            setDueDate(new Date(res.data.journey.dueDate));
          }

          // Set like count
          setLikedByCount(res.data.journey.likedBy.length);

          // Set participants count
          setParticipantCount(res.data.journey.participants.length);

          // Save author to state
          // Due to removing due date not populating author in updated journey, which causes the "Created by" field to be empty
          setAuthor(res.data.journey.author);

          // Grant edit permission if author
          if (res.data.journey.author.uuid === auth.UUID) {
            setIsAuthor(true);
          }

          // Loading Complete
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);

          //Loading Complete
          status.setIsLoading(false);
        });
    }
  }

  const fetchEntries = () => {
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
          
          // Reset flag for entry update
          status.setUpdateEntries(false);
        })
        .catch(err => {
          console.log(err);

          // Loading Complete
          status.setIsLoading(false);

          // Reset flag for entry update
          status.setUpdateEntries(false);
        });
    }
  }

  const removeDueDate = () => {
    // No point if it doesn't have a dueDate to begin with
    if (journey.dueDate) {
      // Start Loading
      status.setIsLoading(true);

      axios.put(`https://journey-social-media-server.herokuapp.com/journeys/${journey._id}/remove-due-date`, {}, {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          if (res.data.journey) {
            setJourney(res.data.journey);
          }
        })
        .catch(err => {
          console.log(err);

          // Finished Loading
          status.setIsLoading(false);
        })
    }
  }

  const likeJourney = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/journeys/like/${journey._id}`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setJourneyLiked(true);

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

  const unlikeJourney = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.put(`https://journey-social-media-server.herokuapp.com/journeys/unlike/${journey._id}`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
    })
    .then(res => {
      setJourneyLiked(false);

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

  // Fetch API data on component mount
  useEffect(() => {
    fetchJourney();
  }, []);

  // Fetch API data again after editing
  useEffect(() => {
    if (status.updateJourney) {
      fetchJourney();
      status.setUpdateJourney(false);
    }
  }, [status.updateJourney]);

  // Fetch entries data from API after fetching journey data
  useEffect(() => {
    fetchEntries();
  }, [journey]);

  // Fetch entries after editing
  useEffect(() => {
    if (status.updateEntries) {
      fetchEntries();
      status.setUpdateEntries(false);
    }
  }, [status.updateEntries]);

  // Check if user already has liked this entry
  useEffect(() => {
    if (journey !== null) {
      // If user already liked entry, set state to liked
      if (journey.likedBy.includes(auth.UUID)) {
        setJourneyLiked(true);
      }
      // If user is already a participant, set as participant
      if (journey.participants.includes(auth.UUID)) {
        setIsParticipant(true);
      }
      // NOTE: Like Count and Participant Count are updated directly from the fetch request callback
    }
  }, [journey]);

  return (
    <div>
      { journey != null &&
        <div className='page-container journey-det-container'>
          <div>
            <h1 className='text-3xl text-center card-item dbrown-text'>{ journey.title }</h1>
          </div>
          {/* Side Info Tab */}
          <div className='journey-info-container'>
            <h3 className='tab-heading dbrown-text card-item'>Journey Details</h3>
            {/* Likes Tab */}
            <div className='content-panel card-item flex flex-row justify-around items-center'>
              <div className='text-xl'>
                <i className='fas fa-heart red mx-2'></i>
                <span>{ likedByCount }</span>
              </div>
              <div className='text-lg'>
                {/* Show either Like or Unlike button */
                  journeyLiked
                  ? /* Unlike Option */
                  <button onClick={ handleLikes } className='button'>
                    <i className='fas fa-heart-broken red mx-2'></i>
                    <span className='mx-2'>Unlike</span>
                  </button>
                  : /* Like Option */
                  <button onClick={ handleLikes } className='button'>
                    <i className='fas fa-heart red mx-2'></i>
                    <span className='mx-2'>Like</span>
                  </button>
                }
              </div>
            </div>
            {/* Journey Details Tab */}
            <div className='content-panel card-item'>
              <ul>
                <li><Link to={ `/profile/${author._id}` }>Created by { author.username }</Link></li>
                <li>Started on { timestamp.toDateString() }</li>
                <li>Privacy: { formatPrivacy(journey.privacy) }</li>
                { journey.dueDate !== undefined && 
                  <li>Due Date: { dueDate.toDateString() }</li>
                }
                <li>{ participantCount } Participants</li>
              </ul>
            </div>
            {/* Journey Description */}
            {/* Only for non-author, desc is shown as part of JourneyEditor for authors */
              !isAuthor &&
              <div className='content-panel card-item'>
                <p className='whitespace-pre-wrap'>{ journey.desc }</p>
              </div>
            }
            <div className='m-4'>
              { isAuthor 
                  ? 
                  <div>
                      <JourneyEditor journey={ journey } />
                      { /* Option to remove due date if it exists*/
                        journey.dueDate !== undefined &&
                        <button onClick={ removeDueDate } className='button w-full mb-4'>Remove Due Date</button>
                      }
                      <button onClick={ openDeletionConfirm } className='button w-full decline-btn'>Delete this journey</button>
                    </div>
                  : isParticipant 
                  ? <button onClick={ leaveJourney } className='button w-full decline-btn'>Leave this journey</button>
                  : <button onClick={ joinJourney } className='button w-full'>Join this journey</button>
              }
            </div>
          </div>
          <div className='md:card-item'>
            {/* Entry Creator -- Toggleable via button */}
            { entryWrite
              ? <div>
                  <button onClick={ closeEntryCreator } className='button m-4'>- Close Entry</button>
                  <EntryCreator parent={ journey } closeEntryCreator={ closeEntryCreator } />
                </div> 
              : <button onClick={ openEntryCreator } className='button m-4'>+ Write an Entry</button>
            }
            {/* Entries List */}
            { renderEntries  
              ? entries.map((entry, index) => <Entry entry={ entry } key={ index } />)
              : <div className='content-panel card-item'>There are currently no entries in this journey. Create one!</div>
            }
          </div>
        </div>
      }
      { /* Confirm Modal for Deletion */
        confirmActive &&
        <ConfirmModal 
          callbackEvent={ deleteJourney } 
          cancelEvent={ closeDeletionConfirm }
          dialogText='Are you sure you want to delete this journey?'
        />
      }
      { /* Redirect after Deletion */
        redirectPage && <Redirect to='/my-journeys'/>
      }
    </div>

  );
}

export default JourneyDetailPage;