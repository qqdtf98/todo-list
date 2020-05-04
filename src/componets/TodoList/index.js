import './index.scss'
import 'react-calendar/dist/Calendar.css'

import { Done, Todo } from '../CompoList'
import React, { useContext, useState } from 'react'

import Calendar from 'react-calendar'
import search from '../../assets/images/search.svg'

function SearchBar() {
  const searchList = (e) => {
    console.log(e.target.value)
    // TODO search 결과에 따라 표시하기
  }

  return (
    <div className="search-wrapper">
      <input
        onChange={searchList}
        placeholder="search"
        className="search-input"
        spellCheck="false"
      />
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

  const getMonthFromString = (mon) => {
    return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1
  }

  const updateDateValue = (date) => {
    const dateString = date + ''
    const dateList = dateString.split(' ')
    const newDate =
      dateList[3] + '/' + getMonthFromString(dateList[1]) + '/' + dateList[2]

    calenElem.style.display = 'none'

    if (calenElem.value === 'todo') {
      const newTodo = [...todo]
      newTodo[calenElem.getAttribute('index')].date = newDate
      setTodo(newTodo)
    } else if (calenElem.value === 'done') {
      const newDone = [...done]
      newDone[calenElem.getAttribute('index')].date = newDate
      setDone(newDone)
    }
  }

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
            <div className="calendar-elem" ref={(elem) => (calenElem = elem)}>
              <Calendar onChange={updateDateValue} />
            </div>
          </DoneContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  )
}

export default TodoList
