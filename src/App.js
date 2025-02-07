import React from 'react';
import { useState } from 'react';

import Users from './components/Users';

const App = () => {
  // step1 : declare three states here : users, isLoading, error
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] = useState(null)
  

  // step2 : use useEffect for fetching the data including updating isLoading and error states

  useEffect(() => {

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if (!response.ok) {
        throw Error('Data Fetching is not Successfull')
      } else {
        response.json()
      }
    })
    .then(json => {
      setData(json)
      setIsLoading(false)
      setError(null)
    })
    .catch((error) => {
      setError(error.message)
      setIsLoading(false)
    })
    
  }, [])
  

  return (
    <div className="container">
      <h1 className="title">Users Management App</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {Array.isArray(data) ? 
        data.map((todo) => {
          <Users key={Math.random} todo={todo.id}/>
       }): null}
    </div>
  );
};

export default App;
