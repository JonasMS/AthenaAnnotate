import React, { Component } from 'react'
import $ from 'jquery'
import initialize from '../utils/initialize'
import { adderHandler, submitHandler } from '../utils/handlers'

import AnnotateText from './AnnotateText'
import AnnotateInput from './AnnotateInput'
import Adder from './Adder'

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      annotation: {
        text: ''
      }
    }
  };

  componentDidMount () {
    $('body').on('mouseup', () => {
        adderHandler($('.adder'));
    });

    $('.widget').offset({
      top: 0,
      left: $(window).width()
    });
}

  render () {
    let state = this.state;
    const widget = this;
    const { text } = state.annotation;
    console.log('state: ', state);
    return (
      <div>
        <div className="widget">
          <AnnotateText text={text} />
          <AnnotateInput />
          <button
            id='submitBtn'
            onClick={() =>
              submitHandler(widget)
            }
          >
            Submit
          </button>
        </div>
        <Adder state={widget} />
      </div>
    )
  }
}
