import React from 'react';
import Nav from './Nav';
import Title from './Title';

function Mainpage({ children }) {
  return (
    <div>
      <Title title="Box Office" para="Are you looking for a movie or an actor?" />
      <Nav />
      {children}
    </div>
  );
}

export default Mainpage;
