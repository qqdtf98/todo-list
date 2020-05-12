import './App.scss'

import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

import Main from './pages/main/index.js'
import React from 'react'
import TodoPage from './pages/Todo/index.js'

function App() {
  return (
    <div id="App">
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/todo" component={TodoPage} />
      </Router>
    </div>
  )
}

export default App
