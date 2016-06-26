import React, { Component } from 'react';
import {
  SELECT_ANNOTE,
  // CREATE_ANNOTE,
  // CREATE_HIGHLIGHT,
} from '../../../../common/messageTypes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      style: {
        position: 'absolute',
        top: '0px',
        visibility: 'hidden',
      },
    };

    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('click', this.handleClickEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('message');
    window.removeEventListener('click');
  }

  handleMessageEvent(event) {
    console.log(event.data, '<-- message from athena');

    // switch (event.data.type) {
    //   case 'CONNECTED':
    //     this.setState({
    //       user: event.data.user,
    //     });
    //     break;
    //   default:
    //     console.log('No matching action type!');
    // }
  }

  // @TODO: refactor.. iframe could be it's own service/util
  handleClickEvent(event) {
    if (event.target.id === 'btn') {
      return;
    }

    const iframe = document.getElementById('athena-app');
    iframe.style = [
      'position: absolute;',
      'top: 0;',
      'right: 0px;',
      'width: 300px;',
      'height: 150px;',
      'border: none;',
      'transitionDuration: 0.5s',
    ].join('');

    iframe.contentWindow.postMessage({
      type: SELECT_ANNOTE,
    }, '*');

    this.setState({
      style: {
        ...this.state.style,
        width: '300px',
        height: '100px',
        visibility: 'visible',
      },
    });
  }

  render() {
    return (
      <div style={this.state.style}>
        <h1> Annotate! </h1>
        {this.state.user ? <p>Welcome {this.state.user}!!</p> : null}
      </div>
    );
  }
}

export default App;
