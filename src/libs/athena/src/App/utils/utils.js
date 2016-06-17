import $ from 'jquery';

export const $widget = $('.widget');
export const $adder = $('.adder');

export const winHeight = $(window).height();
export const winWidth = $(window).width();

export const getText = () => {
  const sel = window.getSelection();
  return sel
        .focusNode
        .data
        .substring(
          sel.focusOffset,
          sel.anchorOffset
         );
};
