import React, { PropTypes } from 'react';

const Profile = ({ user, invites, exitProfile, acceptInvite }) => {
  const invitesList = invites.invites.map(invite => (
    <li>
      <span>{invite.sentFrom} has invited you to join {invite.GroupId}.</span>
      <button onClick={() => acceptInvite(invite.GroupId, user.id, true)}>Acccept</button>
      <button onClick={() => acceptInvite(invite.GroupId, user.id,  false)}>Decline</button>
    </li>
  ));
  const style = {
    backgroundImage: 'url(https://scontent-sjc.xx.fbcdn.net/v/t1.0-9/10401204_668568875459_8134_n.jpg?oh=9a5c5c13fe2f541352c061ac355a15fb&oe=580BE24C)',
  };
  return (
    <div className="col-md-9">
      <div
        className="circle profilePic"
        style={style}
        alt="Profile"
      />
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue={user.facebook.name} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" defaultValue={user.title} />
        </div>
        <button type="submit" className="btn btn-default">Save</button>
        <button className="btn btn-default" onClick={() => exitProfile()}>Cancel</button>
      </form>
      <div>
        <div>
          <h5>Pending Invitations</h5>
          <ul>
            {invitesList}
          </ul>
        </div>
        <div>
          <h5>Following</h5>
          <ul>
          </ul>
        </div>
        <div>
          <h5>Groups</h5>
          <ul>
          </ul>
        </div>

      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  invites: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  exitProfile: PropTypes.func.isRequired,
  acceptInvite: PropTypes.func.isRequired,
};

export default Profile;
