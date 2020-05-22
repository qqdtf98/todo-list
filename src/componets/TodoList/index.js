import './index.scss'
import 'react-calendar/dist/Calendar.css'

import { Done, Todo } from '../CompoList'
import React, { useContext, useEffect, useState } from 'react'
import { UserContent } from '../../pages/Todo/index.js'

import Calendar from 'react-calendar'
import api from '../../api'
import search from '../../assets/images/search.svg'

export const SearchContent = React.createContext('')

function SearchBar() {
  const searchContext = useContext(SearchContent)

  const searchList = (e) => {
    searchContext.update(e.target.value)
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
    id: 0,
    title: '',
    contents: '',
    date: '',
    state: 0,
    importance: '',
  },
])

export const DoneContext = React.createContext([
  {
    id: 0,
    title: '',
    contents: '',
    date: '',
    state: 1,
    importance: '',
  },
])

export let calenElem = null

function TodoList() {
  let todoList = []
  let doneList = []
  const userContent = useContext(UserContent)

  useEffect(() => {
    console.log('load')
    api
      .post('/list/get', {
        data: {
          userId: userContent.userId,
          listType: 'todo',
        },
      })
      .then((res) => {
        setTodo(res.data)
      })
    // TODO userId 가지고 해당 list 가지고오기
    api
      .post('/list/get', {
        data: {
          userId: userContent.userId,
          listType: 'done',
        },
      })
      .then((res) => {
        console.log(res)
        setDone(res.data)
      })
  }, [])
  const [todo, setTodo] = useState(todoList)

  const [done, setDone] = useState(doneList)

  const getMonthFromString = (mon) => {
    return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1
  }

  const updateDateValue = (date) => {
    const dateString = date + ''
    const dateList = dateString.split(' ')
    const newDate =
      dateList[3] + '/' + getMonthFromString(dateList[1]) + '/' + dateList[2]

    calenElem.style.display = 'none'

    api
      .post('/list/update', {
        data: {
          listType: calenElem.value,
          index: calenElem.getAttribute('index'),
          key: 'date',
          value: newDate,
        },
      })
      .then((res) => {
        if (calenElem.value === 'todo') {
          setTodo(res.data)
        } else if (calenElem.value === 'done') {
          setDone(res.data)
        }
      })
  }

  const [search, setSearch] = useState('')

  // Provider의 value로 state와 setState함수를 전달
  return (
    <div id="todo-list">
      <h1 className="todo-title">Todo List</h1>
      <SearchContent.Provider value={{ state: search, update: setSearch }}>
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
      </SearchContent.Provider>
    </div>
  )
}

export default TodoList
