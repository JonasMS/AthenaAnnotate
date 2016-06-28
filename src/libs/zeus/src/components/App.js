import React, { PropTypes, Component } from 'react';
import ControlButton from './ControlButton';

import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  CREATE_ANNOTE,
  CREATE_HIGHLIGHT,
} from '../../../common/messageTypes';

import {
  HIDE_IFRAME_CLASS,
  SHOW_IFRAME_CLASS,
  HIDE_CONTROL_BUTTONS_CLASS,
  SHOW_CONTROL_BUTTONS_CLASS,
} from '../constants';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: HIDE_CONTROL_BUTTONS_CLASS,
    };

    this.createAnnote = this.createAnnote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
    this.toggleDisplayFrame = this.toggleDisplayFrame.bind(this);
    this.postMessageToFrame = this.postMessageToFrame.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('keypress', this.handleKeyPressEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('message');
    window.removeEventListener('onkeypress');
  }

  handleMessageEvent(event) {
    switch (event.data.type) {
      case HIDE_IFRAME:
      case SHOW_IFRAME:
        this.toggleDisplayFrame();
        break;
      default:
        // noop
    }
  }

  postMessageToFrame(action) {
    this.props.iframe.contentWindow.postMessage(action, '*');
  }

  toggleDisplayFrame() {
    const classList = this.props.iframe.classList;

    if (classList.contains(SHOW_IFRAME_CLASS)) {
      classList.remove(SHOW_IFRAME_CLASS);
      classList.add(HIDE_IFRAME_CLASS);
    } else {
      classList.remove(HIDE_IFRAME_CLASS);
      classList.add(SHOW_IFRAME_CLASS);
    }
  }

  createAnnote() {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    this.postMessageToFrame({
      type: CREATE_ANNOTE,
      annote: {
        exact: 'selected',
        prefix: 'prefix',
        suffix: 'suffix',
      },
    });
    this.toggleDisplayFrame();
  }

  createHighlight() {
    this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    this.postMessageToFrame({
      type: CREATE_HIGHLIGHT,
      highlight: {
        exact: 'highlighted',
      },
    });
  }

  handleKeyPressEvent(event) {
    switch (event.key) {
      case '1':
        return this.setState({ controls: SHOW_CONTROL_BUTTONS_CLASS });
      default:
        return this.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    }
  }

  render() {
    return (
      <div className={this.state.controls}>
        <div>
          <ControlButton
            handler={this.createAnnote}
            label={'Annotate!'}
          />
          <ControlButton
            handler={this.createHighlight}
            label={'Highlight!'}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  iframe: PropTypes.object.isRequired,
};

export default App;
