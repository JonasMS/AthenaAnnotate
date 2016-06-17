import $ from 'jquery'
import {
  $adder,
  $widget,
  winWidth,
  getText
 } from './utils'

export const annoteHandler = (
  widget,
  action
) => {
      const $widget = $('.widget');
      const selText = getText();

      widget.setState({
        annotation: {text: selText}
      });

      action === 'note' ?
        $widget.animate({
          // top: winHeight / 2,
          left: winWidth - $widget.width()
        },
          250,
          'linear',
          () => {
            console.log('widget in');
          }
        ) : submitHandler();
};

export const adderHandler = ($adder) => {
  //get range of selected text
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const distance = Math.abs(
    range.endOffset - range.startOffset
  )

  console.log(sel);
  console.log(range);
  console.log('distance: ', distance);

  distance > 0 ?
    //activate widgetController
    $adder.show() :
    $adder.hide();
};

export const submitHandler = () => {
  const $widget = $('.widget');
  const winWidth = $(window).width();
  //create annotation
  //send annotation to server / db
  $.ajax({
    url: 'http://localhost:3000/api/create',
    type: 'POST',
    dataType: 'json',
    data: {text: 'test'},
    success: function(data) {
      console.log('success on client');
    }
  });


  $widget.animate({
      left: winWidth
    },
      250,
      'linear',
      () => {
        console.log('widget out');
  });
};