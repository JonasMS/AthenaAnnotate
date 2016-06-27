import React, { Component } from 'react';
import ControlButton from './ControlButton';

import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  CREATE_ANNOTE,
  CREATE_HIGHLIGHT,
} from '../../../../common/messageTypes';

import {
  HIDE_CONTROL_BUTTONS,
  SHOW_CONTROL_BUTTONS,
} from '../constants';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: HIDE_CONTROL_BUTTONS,
      style: {
        visibility: 'hidden',
      },
    };
    this.iframe = document.getElementById('athena-app');
    this.iframe.display = HIDE_IFRAME;

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
        // noop.. yet
    }
  }

  postMessageToFrame(action) {
    this.iframe.contentWindow.postMessage(action, '*');
  }

  toggleDisplayFrame() {
    if (this.iframe.display === SHOW_IFRAME) {
      this.iframe.display = HIDE_IFRAME;
      this.iframe.style = 'display: none;';
    } else {
      this.iframe.display = SHOW_IFRAME;
      this.iframe.style = [
        'position: absolute;',
        'top: 0;',
        'right: 0px;',
        'width: 400px;',
        'height: 600px;',
        'border: none;',
        'transitionDuration: 0.5s;',
      ].join('');
    }
  }

  createAnnote() {
    this.setState({
      controls: HIDE_CONTROL_BUTTONS,
    });

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
    this.setState({
      controls: HIDE_CONTROL_BUTTONS,
    });

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
        return this.setState({
          controls: SHOW_CONTROL_BUTTONS,
          style: {
            ...this.state.style,
            visibility: 'visible',
          },
        });
      default:
        return this.setState({
          style: {
            ...this.state.style,
            visibility: 'hidden',
          },
        });
    }
  }

  render() {
    return (
      <div style={this.state.style}>
      {
        this.state.controls === SHOW_CONTROL_BUTTONS
        ?
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
        : null
      }
      </div>
    );
  }
}

export default App;
