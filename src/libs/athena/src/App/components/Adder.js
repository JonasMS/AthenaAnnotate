import React from 'react';
import { annoteHandler } from '../utils/handlers';

const Adder = ({ widget }) => (
  <div className="adder">
    <button
      className="adderBtn"
      onClick={() =>
        annoteHandler(widget, 'highlight')
      }
    >
      H
    </button>
    <button
      className="adderBtn"
      onClick={() =>
        annoteHandler(widget, 'note')
      }
    >
      N
    </button>
  </div>
);

Adder.propTypes = {
  widget: React.PropTypes.object.isRequired,
};

export default Adder;
