import React from 'react'
import { annoteHandler } from '../utils/handlers'

const Adder = ({state}) => (
  <div className='adder'>
    <button
      class='adderBtn'
      id='highlightBtn'
      onClick={ () =>
        annoteHandler(state, 'highlight')
      }
    >
      H
    </button>
    <button
      class='adderBtn'
      id='addNoteBtn'
      onClick={ () =>
        annoteHandler(state, 'note')
      }
    >
      N
    </button>
  </div>
)

export default Adder