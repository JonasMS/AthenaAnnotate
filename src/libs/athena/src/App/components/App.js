import React, { Component } from 'react';
import $ from 'jquery';
import { adderHandler, submitHandler } from '../utils/handlers';

import DocHook from './DocHook';
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
    var ex = document.getElementsByClassName('ex')[0];
    console.log(ex);
    ex.addEventListener(
      'click',
      () => console.log(ex.dataset.id)
    );

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
          <DocHook widget={widget} />
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
