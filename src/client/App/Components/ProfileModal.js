import React, { PropTypes } from 'react';

const ProfileModal = (
  {
    user,
  }
) => (
  <div>
    <img />
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          className="form-control"
          id="name" placeholder="Name"
          defaultValue={user.facebook.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="title"
          className="form-control"
          id="title"
          placeholder="Title"
          defaultValue={user.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          defaultValue={user.facebook.email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputFile">File input</label>
        <input type="file" id="exampleInputFile" />
        <p className="help-block">Example block-level help text here.</p>
      </div>
      <div className="checkbox">
        <label>
          <input type="checkbox" /> Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-default">Submit</button>
    </form>
  </div>
);

ProfileModal.propTypes = {
  user: PropTypes.object.isRequired,
};
