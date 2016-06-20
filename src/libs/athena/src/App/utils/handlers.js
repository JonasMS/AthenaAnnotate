import $ from 'jquery';
import {
  getText,
 } from './utils';

export const docHookHandler = (e, widget) => {
  console.log('in hookHandler');
  widget.setState({
    target: e.target.value,
    body: '',
  });
};


const createAnnotation = (widget) => {
  // for mocking purposes
  const state = {
    user: { // from state.user
      id: 1,
      name: 'Jonas Sota',
      title: 'Student at Hack Reactor',
    },
    body: widget.state.annotation.body,
    target: {
      exact: widget.state.annotation.target.exact,
      prefix: 'prefix text',
      suffix: 'suffix text',
    },
  };

  const url = window.location.href;
  // from state.annotations.length
  const annotationId = 'annote1/';
  const user = { // from state.user
    id: 1,
    name: 'Jonas Sota',
    title: 'Student at Hack Reactor',
  };
  const lastModified = !!state.body ?
    Date.now() : '';

  // create annotation
  return {
    id: url + annotationId + user.id, // let db handle as pirimary id?
    createdAt: Date.now(), // js date object
    creator: {
      id: user.id,
      name: user.name,
      title: user.title,
    },
    body: {
      lastModified,
      text: state.body,
    },
    target: {
      source: url,
      selector: {
        exact: state.target.exact,
        prefix: state.target.prefix,
        suffix: state.target.suffix,
      },
    },
  };
};

// const getAnnotationIdx = (widget) => {
//   const { annotation } = widget.state;
//   const { id } = annotation;
//   // loop through annotations
//   // until given id matches
//   widget.state.annotations
//   .reduce((index, annote, idx) => (
//     annote.id === id ?
//       idx : index
//     )
//   );
// };

// const modifyAnnotation = (widget, obj) => {
//   // find index of annotation in state
//   const idx = getAnnotationIdx(widget);
//   // define body
//   const annotation = widget.state.annotations[idx];

//   Object.assign({}, annotation, obj);
// };


export const submitHandler = (widget) => {
  const $widget = $('.widget');
  const winWidth = $(window).width();

  // modify annotation
  const annotation = createAnnotation(widget);

  // send annotation to server
  $.ajax({
    url: 'http://localhost:3000/api/create',
    type: 'POST',
    dataType: 'json',
    data: annotation,
    success: function() {
      // modify annotation body
      widget.setState({
        target: widget.state.target,
        body: widget.state.body,
        annotations:
          widget
          .state
          .annotations
          .push(
            annotation
          ),
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
  const { exact, prefix, suffix } = getText();

  // create annotation
  // const annotation = createAnnotation(widget);

  widget.setState({
    annotation: {
      target: {
        exact,
        prefix,
        suffix,
      },
      body: widget.state.annotation.body,
    },
  });

  return action === 'note' ?
    $widget.animate({
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

