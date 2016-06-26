import React, { Component } from 'react';
import {
  CREATE_ANNOTE,
  CREATE_HIGHLIGHT,
} from '../../../../common/messageTypes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      style: {
        visibility: 'hidden',
      },
    };
    this.iframe = document.getElementById('athena-app');
    this.postMessage = this.postMessage.bind(this);
    this.createAnnote = this.createAnnote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
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
      case '':
        break;
      default:
    }
  }

  postMessage(action) {
    this.iframe.contentWindow.postMessage(action, '*');
  }

  createAnnote() {
    this.setState({
      title: 'Annote!',
      style: {
        ...this.state.style,
        color: 'purple',
        visibility: 'visible',
      },
    });
    this.postMessage({
      type: CREATE_ANNOTE,
      message: 'creating annote!',
    });
  }

  createHighlight() {
    this.setState({
      title: 'Highlight!',
      style: {
        ...this.state.style,
        color: 'green',
        visibility: 'visible',
      },
    });
    this.postMessage({
      type: CREATE_HIGHLIGHT,
      message: 'highlighting text!',
    });
  }

  handleKeyPressEvent(event) {
    switch (event.key) {
      case '1':
        return this.createAnnote();
      case '2':
        return this.createHighlight();
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
        {this.state.title ? <h1>{this.state.title}</h1> : null}
      </div>
    );
  }
}

export default App;
