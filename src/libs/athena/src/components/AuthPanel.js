/* global FB */
import React from 'react';
import FacebookLogin from './FacebookLogin';

const AuthPanel = ({ login }) => (
  <div>
    <div>
      <p> Please Login </p>
      <FacebookLogin login={login} />
    </div>
  </div>
);

export default AuthPanel;
