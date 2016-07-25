import React, { PropTypes } from 'react';

const Profile = ({
  user,
  profile,
  invites,
  exitProfile,
  acceptInvite,
  group,
  following,
  setGroup,
  setFilter,
  setUser,
  updateName,
  updateTitle,
  updateProfile,
  leaveGroupDB,
  selectTab,
}) => {
  const invitesList = invites.invites.map(invite => (
    <li key={invite.id}>
      <span>{invite.sentFrom} has invited you to join {invite.GroupId}.</span>
      <button onClick={() => acceptInvite(invite.GroupId, user.id, true)}>Acccept</button>
      <button onClick={() => acceptInvite(invite.GroupId, user.id,  false)}>Decline</button>
    </li>
  ));
  const groupList = group.groups.map(grp => (
    <li key={grp.id}>
      <a
        onClick={() => {
          setGroup(grp.id);
          setFilter('Groups');
        }}
      >
        {grp.name}
      </a>
      <span
        style={{ 'margin-left': '15px' }}
        onClick={() => leaveGroupDB(grp.id, user.id)}
      >
        Leave Group
      </span>
    </li>
  ));
  const followList = following.users.map(followedUser => (
    <li key={followedUser.id}>
      <a
        onClick={() => {
          setUser(followedUser);
          setFilter('User');
        }}
      >
        {followedUser.name}
      </a>
    </li>
  ));
  const style = {
    backgroundImage: `url(${user.facebook.picture})`,
  };

  let selectedTab;

  if (profile.selected === 'pending') {
    selectedTab = <ul>{invitesList}</ul>;
  } else if (profile.selected === 'following') {
    selectedTab = <ul>{followList}</ul>;
  } else {
    selectedTab = <ul>{groupList}</ul>;
  }

  return (
    <div className="col-md-9">
      <div
        className="circle profilePic"
        style={style}
        alt="Profile"
      />
      <form className="profile">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            defaultValue={user.facebook.name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            defaultValue={user.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-default"
          onClick={(e) => {
            e.preventDefault();
            updateProfile(profile.name, profile.title, user.id);
          }}
        >
          Update Profile
        </button>
      </form>
      <div className="profile-extra">
        <ul className="nav nav-tabs nav-justified">
          <li
            className="active"
            role="presentation"
            data-toggle="tab"
            onClick={() => selectTab('pending')}
          >
            Pending Invitations
          </li>
          <li
            data-toggle="tab"
            role="presentation"
            onClick={() => selectTab('following')}
          >
            Following
          </li>
          <li
            data-toggle="tab"
            role="presentation"
            onClick={() => selectTab('groups')}
          >
            Groups
          </li>
        </ul>
      </div>
      <div>
        {selectedTab}
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  invites: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  exitProfile: PropTypes.func.isRequired,
  acceptInvite: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  leaveGroupDB: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default Profile;

// <div>
//   <h5>Pending Invitations:</h5>
//   <ul>
//     {invitesList}
//   </ul>
// </div>
// <div>
//   <h5>Following:</h5>
//   <ul>
//     {followList}
//   </ul>
// </div>
// <div>
//   <h5>Groups:</h5>
//   <ul>
//     {groupList}
//   </ul>
// </div>

// <button
//   className="btn btn-default"
//   onClick={(e) => {
//     e.preventDefault();
//     exitProfile();
//   }}
// >
//   Cancel
// </button>
