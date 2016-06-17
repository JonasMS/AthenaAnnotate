import $ from 'jquery'

export const $widget = $('.widget');
export const $adder = $('.adder');

export let winHeight = $(window).height();
export let winWidth = $(window).width();

export const getText = () => {
    console.log('1: ', $adder);
    const sel = window.getSelection();
    const range = sel.getRangeAt(0);
    const distance = Math.abs(
      range.endOffset - range.startOffset
    )
    return sel
          .focusNode
          .data
          .substring(
            sel.focusOffset,
            sel.anchorOffset
           );
  }


