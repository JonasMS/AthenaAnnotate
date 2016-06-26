// import FacebookLogout from './FacebookLogout';
import React, { PropTypes, Component } from 'react';
import { saveAnnote } from '../utils/annotation';

class AnnotatePanel extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler () {
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
  }

  render () {
    return (
      <div>
        <h1> AnnotatePanel </h1>
      </div>
    );
    // const { annotation, actions, exact } = this.props;
    // return (
    //   <div>
    //     <div className="targetText">
    //       <input type="text" value={exact} />
    //     </div>
    //     <div className="bodyText">
    //       <textarea
    //         value={annotation.body.text}
    //         onChange={(e) => actions.updateBody(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       className="submitBtn"
    //       onClick={this.submitHandler}
    //     > Submit </button>
    //     <div>
    //       <FacebookLogout logout={actions.logout} />
    //     </div>
    //   </div>
    // );
  }
}

AnnotatePanel.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  exact: PropTypes.string.isRequired,
};

export default AnnotatePanel;

