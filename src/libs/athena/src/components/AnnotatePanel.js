import React, { PropTypes, Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
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
        <Button onClick={close}> Close </Button>
        <h1> Annotate Panel </h1>

        <form>
          <FormGroup controlId="annoteFormId">
            <ControlLabel>Highlighted Text</ControlLabel>
            <FormControl
              type="text"
              value={exact}
            />
            <ControlLabel>Your Note</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={annotation.body.text}
              onChange={(e) => actions.updateBody(e.target.value)}
            />
          </FormGroup>
        </form>
        <Button
          bsStyle="primary"
          onClick={this.submitHandler}
        > Submit </Button>
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

