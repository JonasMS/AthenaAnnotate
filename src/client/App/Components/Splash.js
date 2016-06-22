import React, { PropTypes } from 'react';
import FacebookLogin from '../../../libs/athena/src/components/FacebookLogin';

const Splash = ({ login }) => (
  <div className="container">
    <div className="center">
      <h1> Athena </h1>
      <FacebookLogin login={login} />
    </div>
    <br />
    <div className="row center">
      <div className="col s4">
        <h6> Feature A </h6>
      </div>
      <div className="col s4">
        <h6> Feature B </h6>
      </div>
      <div className="col s4">
        <h6> Feature C </h6>
      </div>
    </div>
    <div className="row center">
    </div>
  </div>
);

Splash.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Splash;
