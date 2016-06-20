import $ from 'jquery';

export const $widget = $('.widget');
export const $adder = $('.adder');

export const winHeight = $(window).height();
export const winWidth = $(window).width();

// prefix: 20 chars before exact
const getPrefix = (data, end) => (
  end >= 19 ?
    data.substring(end - 20, end) :
    data.substring(0, end)
);

export const getText = () => {
  // suffix: 20 chars after exact
  const sel = window.getSelection();
  const { data } = sel.focusNode;
  const exStart = sel.focusOffset;
  const exEnd = sel.anchorOffset;
  const exact =
    data
    .substring(
      exStart,
      exEnd
     );
  const prefix = data.substring(exStart - 20, exStart);
  const suffix = data.substring(exEnd, exEnd + 20);

  return {
    exact,
    prefix,
    suffix,
  };
};



