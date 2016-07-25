import React, { PropTypes, Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import ChannelsMenu from '../containers/ChannelsMenu';
import FacebookLogout from './FacebookLogout';

class AnnotatePanel extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { submit, del, channelSelect, annotation, actions } = this.props;
    const { exact } = annotation.target.selector;

    return (
      <div className="athena">
        <div className="heading">
          <div className="title">Athena</div>
        </div>
        <ChannelsMenu channelSelect={channelSelect} />
        <form>
          <div className="targetText"> {exact} </div>
          <FormGroup controlId="annoteFormId" className="bodyText">
            <FormControl
              componentClass="textarea"
              value={annotation.body.text}
              onChange={(e) => actions.updateBody(e.target.value)}
            />
            <Grid>
              <Row>
                <Col xs={4} />
                <Col xs={4} xsOffset={4}>
                  <button className="delBtn" onClick={del}> delete </button>
                  <button className="submitBtn" onClick={submit}> Submit </button>
                </Col>
              </Row>
            </Grid>
          </FormGroup>
        </form>
      </div>
    );
  }
}

AnnotatePanel.propTypes = {
  user: PropTypes.object,
  widget: PropTypes.object,
  actions: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  channels: PropTypes.object,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default AnnotatePanel;

