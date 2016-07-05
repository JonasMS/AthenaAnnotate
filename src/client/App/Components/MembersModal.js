import React, { PropTypes } from 'react';

const membersModal = ({
  group,
  showModal,
}) => {
  const members = group.members.map(member => (
    <li key={member.id}>
      <a>
        {member.name}
      </a>
    </li>
  ));
  return (
    <div>
      <h4>Members</h4>
      <ul>
        {members}
      </ul>
      <button className="btn btn-default" onClick={() => showModal()}>Cancel</button>
    </div>
  );
};

membersModal.propTypes = {
  modal: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default membersModal;
