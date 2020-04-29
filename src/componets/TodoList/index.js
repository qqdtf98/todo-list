import './index.scss'

import { Done, Todo } from '../CompoList'
import React, { useState } from 'react'

import search from '../../assets/images/search.svg'

function SearchBar() {
  return (
    <div className="search-wrapper">
      <input placeholder="search" className="search-input" />
      <img className="search-icon" src={search} alt="search" />
    </div>
  )
}

export const TodoContext = React.createContext([
  {
    title: '',
    contents: '',
    date: '',
    state: false,
    importance: '',
  },
])

function TodoList() {
  const [state, setState] = useState([
    {
      title: 'title',
      contents: 'contents1',
      date: '2020/04/29',
      state: false,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'contents2',
      date: '2020/04/29',
      state: false,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'contents3',
      date: '2020/04/29',
      state: false,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'contents4',
      date: '2020/04/29',
      state: false,
      importance: 'red',
    },
  ])
  // TODO push나 splice 할 때는 배열 복사해서 한 다음에 다시 setState하기
  return (
    <div id="todo-list">
      <h1 className="todo-title">Todo List</h1>
      <SearchBar />
      <div className="list-wrapper">
        <TodoContext.Provider value={state}>
          <Todo />
          <Done />
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default TodoList
