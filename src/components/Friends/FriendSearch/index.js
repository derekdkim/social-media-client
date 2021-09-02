import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import FriendCard from '../FriendCard';
import { useStatusContext } from '../../../context/StatusContextProvider';
import { useAuthContext } from '../../../context/AuthContextProvider';

const FriendSearch = () => {
  const [searchRes, setSearchRes] = useState([]);
  const [renderResults, setRenderResults] = useState(false);

  const status = useStatusContext();
  const auth = useAuthContext();

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: 'onChange'
  });

  const submitSearch = (data, event) => {
    event.preventDefault();

    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      // Make search request
      axios.get(`https://journey-social-media-server.herokuapp.com/users/search/${data.query}`)
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
        })
    }
  }

  return (
    <div className='page-container'>
      { /* Search form */ }
      <div className='one-tab-container flex justify-center my-4'>
        <form onSubmit={ handleSubmit(submitSearch) } className='card-item'>
          <h1 className='tab-heading dbrown-text'>User Search</h1>
          <input
            {...register('query', {
              required: 'Cannot search if there is no query.'
            })}
            className='input-field'
          ></input>
          <button type='submit' className='button ml-2'><i className='fas fa-search'></i></button>
        </form>
      </div>
      { /* Results - Visible only after submitting search */
        renderResults &&
        <div className='one-tab-container'>
          <h3 className='tab-heading dbrown-text'>Search Results</h3>
          <div>
            { searchRes.map((user, index) => <FriendCard user={ user } key={ index } />) }
          </div>
        </div>
      }
    </div>
  );
}

export default FriendSearch;

