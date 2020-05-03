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

export const DoneContext = React.createContext([
  {
    title: '',
    contents: '',
    date: '',
    state: true,
    importance: '',
  },
])

export let calenElem = null

function TodoList() {
  const [todo, setTodo] = useState([
    {
      title: 'title',
      contents: 'contents1',
      date: '2020/4/29',
      state: false,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'contents2',
      date: '2020/4/29',
      state: false,
      importance: 'green',
    },
    {
      title: 'title',
      contents: 'contents3',
      date: '2020/4/29',
      state: false,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'contents4',
      date: '2020/4/29',
      state: false,
      importance: 'yellow',
    },
  ])

  const [done, setDone] = useState([
    {
      title: 'title',
      contents: 'done1',
      date: '2020/4/29',
      state: true,
      importance: 'red',
    },
    {
      title: 'title',
      contents: 'done2',
      date: '2020/4/29',
      state: true,
      importance: 'yellow',
    },
  ])

  // TODO push나 splice 할 때는 배열 복사해서 한 다음에 다시 setState하기
  // Provider의 value로 state와 setState함수를 전달
  return (
    <div id="todo-list">
      <h1 className="todo-title">Todo List</h1>
      <SearchBar />
      <div className="list-wrapper">
        <TodoContext.Provider value={{ state: todo, update: setTodo }}>
          <DoneContext.Provider value={{ state: done, update: setDone }}>
            <Todo />
            <Done />
          </DoneContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default TodoList
