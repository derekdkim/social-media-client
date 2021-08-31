import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import FriendCard from '../FriendCard';
import { useStatusContext } from '../../../context/StatusContextProvider';

const FriendSearch = () => {
  const [searchRes, setSearchRes] = useState([]);
  const [renderResults, setRenderResults] = useState(false);

  const status = useStatusContext();

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
          // Save search results to state
          setSearchRes(res.data.result);

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
      <div className='flex justify-center my-4'>
        <form onSubmit={ handleSubmit(submitSearch) }>
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
          <div className='card-item'>
            { searchRes.map((user, index) => <FriendCard user={ user } key={ index } />) }
          </div>
        </div>
      }
    </div>
  );
}

export default FriendSearch;
