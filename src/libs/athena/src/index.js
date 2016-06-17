import React from 'react'
import { render } from 'react-dom'
import App from './App/components/App'
import './assets/styles/styles.scss'

render(
  <App />,
  document.getElementById('athena')
);

//append css file
// document
//   .getElementByTagName('body')
//   .appendChild()
