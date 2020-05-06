import './index.scss'

import { DoneContext, SearchContent, TodoContext, calenElem } from '../TodoList'
import React, { useContext, useEffect, useState } from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import api from '../../api/index.js'
import deleteIcon from '../../assets/images/delete.svg'
import plus from '../../assets/images/plus.svg'

function WorkElem(props) {
  // delete list elem using index
  // update new list
  const deleteElem = () => {
    api
      .get('/list/delete', {
        params: {
          listType: props.data,
          index: props.index,
        },
      })
      .then((res) => {
        const newContext = res.data
        props.update(newContext)
      })
  }

  // default: green
  // green -> yellow -> red
  const changeImportance = (e) => {
    const newContext = [...props.context]
    let importance = ''
    if (newContext[props.index].importance === 'red') {
      importance = 'green'
    } else if (newContext[props.index].importance === 'green') {
      importance = 'yellow'
    } else if (newContext[props.index].importance === 'yellow') {
      importance = 'red'
    }

    setTimeout(() => {
      api
        .get('/list/update', {
          params: {
            listType: props.data,
            index: props.index,
            key: 'importance',
            value: importance,
          },
        })
        .then((res) => {
          props.update(res.data)
        })
    }, 0)
  }

  const list = props.list

  // set bgColor depends on importance
  const setImportanceColor = () => {
    let style
    if (props.list.importance === 'red') {
      style = {
        backgroundColor: '#FB6666',
      }
    } else if (props.list.importance === 'green') {
      style = {
        backgroundColor: '#7DCEAC',
      }
    } else if (props.list.importance === 'yellow') {
      style = {
        backgroundColor: '#E4C862',
      }
    }

    return style
  }

  const setDoneColor = () => {
    let style
    if (props.list.state) {
      style = {
        backgroundColor: '#f9457a',
        border: 'none',
      }
    } else {
      style = {
        backgroundColor: '#fff',
        border: '1.2px solid #f9457a',
      }
    }

    return style
  }

  const todoContext = useContext(TodoContext)
  const doneContext = useContext(DoneContext)

  const changeDoneState = () => {
    const newTodo = [...todoContext.state]
    const newDone = [...doneContext.state]

    if (props.data === 'done') {
      const moveElem = newDone.splice(props.index, 1)
      moveElem[0].state = false
      newTodo.push(moveElem[0])
    } else if (props.data === 'todo') {
      const moveElem = newTodo.splice(props.index, 1)
      moveElem[0].state = true
      newDone.push(moveElem[0])
    }
    todoContext.update(newTodo)
    doneContext.update(newDone)
  }

  const [contents, setContents] = useState(list.contents)

  const updateContentsValue = (e) => {
    const newContents = e.target.value

    api
      .get('/list/update', {
        params: {
          listType: props.data,
          index: props.index,
          key: 'contents',
          value: newContents,
        },
      })
      .then((res) => {
        setContents(newContents)
        props.update(res.data)
      })
  }

  const [title, setTitle] = useState(list.title)

  const updateTitleValue = (e) => {
    const newTitle = e.target.value

    api
      .get('/list/update', {
        params: {
          listType: props.data,
          index: props.index,
          key: 'title',
          value: newTitle,
        },
      })
      .then((res) => {
        setTitle(newTitle)
        props.update(res.data)
      })
  }

  const activateCalendar = (e) => {
    if (getComputedStyle(calenElem).display === 'block') {
      calenElem.style.display = 'none'
    } else if (getComputedStyle(calenElem).display === 'none') {
      const targetStyle = e.target.getBoundingClientRect()
      calenElem.style.left = targetStyle.left - targetStyle.width + 'px'
      calenElem.style.top = targetStyle.top + targetStyle.height + 'px'
      calenElem.style.display = 'block'
      calenElem.value = props.data
      calenElem.setAttribute('index', props.index)
    }
  }

  return (
    <div id="work-box">
      <div className="work-elem">
        <button
          className="work-importance"
          style={setImportanceColor()}
          onClick={changeImportance}
        ></button>
        <div className="work-data">
          <div className="work-top-box">
            <input
              className="work-title"
              value={title}
              spellCheck="false"
              onChange={updateTitleValue}
            />
            <span onClick={activateCalendar} className="work-date">
              {list.date}
            </span>
          </div>
          <input
            className="work-contents"
            value={contents}
            spellCheck="false"
            onChange={updateContentsValue}
          />
        </div>
        <img
          onClick={deleteElem}
          className="delete-icon"
          src={deleteIcon}
          alt="delete"
        />
      </div>
      <div className="work-check">
        <button
          onClick={changeDoneState}
          style={setDoneColor()}
          className="work-check-btn"
        ></button>
      </div>
    </div>
  )
}

export function Todo(props) {
  const todoContext = useContext(TodoContext)
  const todo = todoContext.state
  const update = todoContext.update
  const todoItems = []
  const searchContext = useContext(SearchContent)

  // create for loop for <WorkElem />
  if (todo.length > 0) {
    for (let i = todo.length - 1; i >= 0; i--) {
      if (searchContext.state === '') {
        todoItems.push(
          <WorkElem
            key={i}
            index={todo[i].id}
            list={todo[i]}
            context={todo}
            update={update}
            data="todo"
          />
        )
      } else {
        if (
          todo[i].contents
            .toUpperCase()
            .indexOf(searchContext.state.toUpperCase()) > -1
        ) {
          todoItems.push(
            <WorkElem
              key={i}
              index={todo[i].id}
              list={todo[i]}
              context={todo}
              update={update}
              data="todo"
            />
          )
        }
      }
    }
  }

  let textInput = null

  useEffect(() => {
    textInput.focus()
  }, [textInput])

  const addElem = (e) => {
    if (e.key === 'Enter') {
      const today = new Date()
      const date =
        today.getFullYear() +
        '/' +
        (today.getMonth() + 1) +
        '/' +
        today.getDate()
      const newContext = {
        title: 'title',
        contents: e.target.value,
        date,
        state: false,
        importance: 'green',
      }
      api
        .get('/list/add', {
          params: {
            newContext,
          },
        })
        .then((res) => {
          const newTodo = res.data
          update(newTodo)
        })
      e.target.value = ''
    }
  }

  return (
    <div id="list" className="todo">
      <div className="list-text">Todo</div>
      <div className="add-btn-box">
        <button className="add-btn">
          <img className="add-icon" src={plus} alt="plus" />
          <input
            spellCheck="false"
            className="search-input"
            placeholder="add a task"
            onKeyDown={addElem}
            ref={(elem) => (textInput = elem)}
          />
        </button>
      </div>
      <Scrollbars style={{ width: 486, height: 450 }}>{todoItems}</Scrollbars>
    </div>
  )
}

export function Done() {
  const doneContext = useContext(DoneContext)
  const done = doneContext.state
  const update = doneContext.update
  const searchContext = useContext(SearchContent)
  const doneItems = []

  // create for loop for <WorkElem />
  for (let i = done.length - 1; i >= 0; i--) {
    if (searchContext.state === '') {
      doneItems.push(
        <WorkElem
          key={i}
          index={done[i].id}
          list={done[i]}
          context={done}
          update={update}
          data="done"
        />
      )
    } else {
      if (
        done[i].contents
          .toUpperCase()
          .indexOf(searchContext.state.toUpperCase()) > -1
      ) {
        doneItems.push(
          <WorkElem
            key={i}
            index={done[i].id}
            list={done[i]}
            context={done}
            update={update}
            data="done"
          />
        )
      }
    }
  }

  return (
    <div id="list" className="done">
      <div className="list-text">Done</div>
      <Scrollbars style={{ width: 486, height: 530 }}>{doneItems}</Scrollbars>
    </div>
  )
}
