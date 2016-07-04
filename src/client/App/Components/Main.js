import React, { PropTypes } from 'react';
import VisibleDocList from '../Containers/VisibleDocList';
import ProfileEditor from '../Containers/ProfileEditor';

const Main = ({ profile }) => (
  profile ? <ProfileEditor /> : <VisibleDocList />
);

Main.propTypes = {
  profile: PropTypes.bool.isRequired,
};

export default Main;
