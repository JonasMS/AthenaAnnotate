import React, { PropTypes } from 'react';

const Splash = ({ login }) => (
  <div id="splash" className="container">

    <div className="jumbotron">
      <h1 className="heading">Athena Annotate</h1>
      <p className="lead">Annotate the interwebs!</p>
      <p>
        <a className="btn btn-lg facebook" href="#" role="button" onClick={login}>
          <i className="fa fa-facebook"></i>&nbsp;
          Login with Facebook
        </a>
        <a className="btn btn-lg github" href="https://github.com/AthenaAnnotate/AthenaAnnotate" role="button" >
          <i className="fa fa-github"></i>&nbsp;
          GitHub
        </a>
      </p>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Highlight</h2>
        <p className="lead">Mark text with a highlight for quick reference.</p>
      <div className="col-lg-12">
        <img src="http://placehold.it/800x350" alt="" />
      </div>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Annotate</h2>
        <p className="lead">Create notes for important text passages.</p>
      <div className="col-lg-12">
        <img src="http://placehold.it/800x350" alt="" />
      </div>
    </div>

    <div className="row text-center">
      <h2 className="section-header">Dashboard</h2>
        <p className="lead">View your notes and revisit sites that you've annotated.</p>
      <div className="col-lg-12">
        <img src="http://placehold.it/800x350" alt="" />
      </div>
    </div>
    {/*
    <footer className="footer text-center">
      <p>&copy; Made with <i className="fa fa-heart"></i> by Anonymous Anenome</p>
    </footer>
    */}

  </div>
);

Splash.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Splash;
