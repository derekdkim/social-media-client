import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FriendCard from '../FriendCard';
import { useStatusContext } from '../../../context/StatusContextProvider';
import { useAuthContext } from '../../../context/AuthContextProvider';

const FriendSearch = () => {
  const [searchRes, setSearchRes] = useState([]);
  const [renderResults, setRenderResults] = useState(false);

  const status = useStatusContext();
  const auth = useAuthContext();

  const submitSearch = () => {
    // Start Loading
    status.setIsLoading(true);

    // Make search request
    axios.get(`https://journey-social-media-server.herokuapp.com/users/search/${status.searchQuery}`)
      .then(res => {
        // Filter out user's own data
        const filteredRes = res.data.result.filter(user => user.uuid !== auth.UUID);

        // Save search results to state
        setSearchRes(filteredRes);

        // Render results
        setRenderResults(true);

        // Finish Loading
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Finish Loading
        status.setIsLoading(false);
      });
  }

  useEffect(() => {
    if (status.searchQuery) {
      submitSearch();
    }

    status.setRedirectToSearch(false);

  }, [status.searchQuery]);

  return (
    <div className='page-container'>
      <div className='one-tab-container only-tab'>
        <h3 className='tab-heading dbrown-text'>Search Results for { status.searchQuery }</h3>
        { /* Results - Visible only after submitting search */
          renderResults &&
          <div className='card-item'>
            <div>
              { searchRes.map((user, index) => <FriendCard user={ user } key={ index } />) }
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default FriendSearch;

