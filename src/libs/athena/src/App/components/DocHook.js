import React from 'react';
import { docHookHandler } from '../utils/handlers';


const DocHook = ({ widget }) => (
  <input
    className="docHook"
    type="text"
    value=""
    onChange={(e) => docHookHandler(e, widget)}
  />
);

export default DocHook;

DocHook.propTypes = {
  widget: React.PropTypes.object.isRequired,
};
