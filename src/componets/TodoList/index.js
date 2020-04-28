import React from 'react'
import './index.css'

function SearchBar(){
  return(
    <div className="search-wrapper">
      <input className="searchinput" />
      <div>icon</div>
    </div>
  )
}

function TodoList(){
  return(
    <div id="todo-list">
      <h2>Todo List</h2>
      <SearchBar />
    </div>
  )
}

export default TodoList
