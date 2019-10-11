import React from 'react';

const HomePage = (props) => {
  return(
    <div className="text-center">
    <h1>Welcome to the Herbaldashery Cookbook</h1>
    {props.state.user ?
    <h3> Welcome {props.state.user.name}</h3>
    : 
    <h3>Please Login or Signup</h3>
    }
    </div>
  )
}

export default HomePage;