import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import './assets/reset.css'
import './assets/test.css'

import App from './App'
// import * as serviceWorker from './serviceWorker'
// serviceWorker.unregister()

ReactDOM.render(
  <StrictMode><App/></StrictMode>,
  document.getElementById('root')
)