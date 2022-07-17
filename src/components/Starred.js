import React, { useEffect, useState } from 'react'
import Mainpage from './Mainpage'
import { usePersistedHook } from './misc/custom-hooks';
import ShowGrid from './show/ShowGrid';

function Starred() {

  const [starred] = usePersistedHook();

  const [shows , setShow] = useState(null);
  const [loading , isLoading] = useState(true);
  const [error , setError] = useState(null);

  useEffect(() => {
    if(starred && starred.length > 0){
      const promises = starred.map(showId => fetch(`https://api.tvmaze.com/shows/${showId}`).then(r => r.json()));
      Promise.all(promises)
      .then(apiData => apiData.map(show => ({show})))
      .then(result => {
        setShow(result);
        isLoading(false);
      }).catch(err => {
        setError(err.message);
        isLoading(false);
      })
    }
    else{
      isLoading(false);
    }
  } , [starred]);

  return (
    <Mainpage>
      {loading && <div>Show are Loading!</div>}
      {error && <div>Error occured : {error}</div>}
      {!loading && !shows && <div>No shows were added</div>}
      {!loading && !error && shows && <ShowGrid result={shows}/>}
    </Mainpage>
  )
}

export default Starred
