import $ from 'jquery';
import {
  // $adder,
  // $widget,
  // winWidth,
  getText,
 } from './utils';

export const submitHandler = (widget) => {
  const $widget = $('.widget');
  const winWidth = $(window).width();

  // create annotation
  // send annotation to server / db

  $.ajax({
    url: 'http://localhost:3000/api/create',
    type: 'POST',
    dataType: 'json',
    data: widget.state.annotation,
    success: function() {
      widget.setState({
        target: '',
        body: '',
      });
    },
  });

  $widget.animate({
    left: winWidth,
  },
    250,
    'linear'
  );
};

export const annoteHandler = (
  widget,
  action
) => {
  const $widget = $('.widget');
  const winWidth = $(window).width();
  const selText = getText();

  widget.setState({
    annotation: {
      target: selText,
      body: widget.state.annotation.body,
    },
  });

  return action === 'note' ?
    $widget.animate({
      // top: winHeight / 2,
      left: winWidth - $widget.width(),
    },
      250,
      'linear'
    ) : submitHandler();
};

export const adderHandler = ($adder) => {
  // get range of selected text
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const distance = Math.abs(
    range.endOffset - range.startOffset
  );

  console.log(sel);

  // activate widgetController
  return distance > 0 ? $adder.show() : $adder.hide();
};

