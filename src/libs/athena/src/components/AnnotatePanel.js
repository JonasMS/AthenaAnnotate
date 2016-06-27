import React, { PropTypes, Component } from 'react';
import { saveAnnote } from '../utils/annotation';
import FacebookLogout from './FacebookLogout';


class AnnotatePanel extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler() {
    const {
      user,
      actions,
      annotation,
      annotations,
    } = this.props;

    saveAnnote({
      user,
      annotation,
      annotations,
    });

    actions.clearAnnote();
    this.props.close();
  }

  render () {
    const { close, annotation, actions, exact } = this.props;

    return (
      <div>
        <button onClick={close}> Close </button>
        <h1> Annotate Panel </h1>
        <div className="targetText">
          <input type="text" value={exact} />
        </div>
        <div className="bodyText">
          <textarea
            value={annotation.body.text}
            onChange={(e) => actions.updateBody(e.target.value)}
          />
        </div>
        <button
          className="submitBtn"
          onClick={this.submitHandler}
        > Submit </button>
        <FacebookLogout logout={actions.logout} />
      </div>
    );
  }
}

AnnotatePanel.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  close: PropTypes.func.isRequired,
  exact: PropTypes.string.isRequired,
};

export default AnnotatePanel;

