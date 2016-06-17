import React from 'react'

const AnnotateInput = ({widget}) => (
  <div className="widget-annotateInputCont">
    <textarea
      className="annotateInput"
      onChange={ e => widget.setState({
        annotation: {
          target: widget.state.annotation.target,
          body: e.target.value
        }
      })}
    ></textarea>
  </div>
)

export default AnnotateInput;