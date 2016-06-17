import React, { Component } from 'react';
import $ from 'jquery';
import { adderHandler, submitHandler } from '../utils/handlers';

import AnnotateText from './AnnotateText';
import AnnotateInput from './AnnotateInput';
import Adder from './Adder';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      annotation: {
        target: '',
        body: '',
      },
    };
  }

  componentDidMount () {
    $('body').on('mouseup', () => {
      adderHandler($('.adder'));
    });

    $('.widget').offset({
      top: 0,
      left: $(window).width(),
    });
  }

  render () {
    const state = this.state;
    const widget = this;
    const { target } = state.annotation;
    console.log('state: ', state);
    return (
      <div>
        <div className="widget">
          <AnnotateText target={target} />
          <AnnotateInput widget={widget} />
          <button
            id="submitBtn"
            onClick={() =>
              submitHandler(widget)
            }
          >
            Submit
          </button>
        </div>
        <Adder widget={widget} />
      </div>
    );
  }
}
