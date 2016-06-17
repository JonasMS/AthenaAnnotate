import {
  $adder,
  $widget,
  winWidth,
 } from './utils';

export default (function () {
  $adder.hide();
  $widget.offset({
    top: 0,
    left: winWidth,
  });
  console.log('ready');
  return 'initialized components';
})