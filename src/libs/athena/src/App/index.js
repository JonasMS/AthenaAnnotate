import React from 'react';
import Auth from '../Auth';

const style = {
  textAlign: 'center',
  width: '250px',
  height: '500px',
  backgroundColor: 'lightblue',
  position: 'absolute',
  top: 0,
  right: 0,
};

const App = () => (
  <div style={style}>
    <h2> Hello Athena </h2>
    <Auth />
  </div>
);

export default App;
