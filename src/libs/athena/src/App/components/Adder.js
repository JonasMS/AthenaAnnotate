import React from 'react'
import { annoteHandler } from '../utils/handlers'

const Adder = ({widget}) => (
  <div className='adder'>
    <button
      class='adderBtn'
      id='highlightBtn'
      onClick={ () =>
        annoteHandler(widget, 'highlight')
      }
    >
      H
    </button>
    <button
      class='adderBtn'
      id='addNoteBtn'
      onClick={ () =>
        annoteHandler(widget, 'note')
      }
    >
      N
    </button>
  </div>
)

export default Adder