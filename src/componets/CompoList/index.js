import './index.scss'

import { DoneContext, TodoContext } from '../TodoList'
import React, { useContext, useEffect } from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import deleteIcon from '../../assets/images/delete.svg'
import edit from '../../assets/images/edit.svg'
import plus from '../../assets/images/plus.svg'

function WorkElem(props) {
  // delete list elem using index
  // update new list
  const deleteElem = () => {
    const newContext = [...props.context]
    newContext.splice(props.index, 1)
    props.update(newContext)
  }

  // default: green
  // green -> yellow -> red
  const changeImportance = (e) => {
    const newContext = [...props.context]
    if (newContext[props.index].importance === 'red') {
      newContext[props.index].importance = 'green'
    } else if (newContext[props.index].importance === 'green') {
      newContext[props.index].importance = 'yellow'
    } else if (newContext[props.index].importance === 'yellow') {
      newContext[props.index].importance = 'red'
    }
    props.update(newContext)
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
        backgroundColor: '#E4C862',
      }
    } else if (props.list.importance === 'yellow') {
      style = {
        backgroundColor: '#7DCEAC',
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
      console.log(moveElem)
      moveElem.state = false
      newTodo.push(moveElem)
    } else if (props.data === 'todo') {
      const moveElem = newTodo.splice(props.index, 1)
      console.log(moveElem)
      moveElem.state = true
      newDone.push(moveElem)
    }
    // TODO push 할 때 내용은 왜 안들어가는지?
    todoContext.update(newTodo)
    doneContext.update(newDone)
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
            <span className="work-title">{list.title}</span>
            <span className="work-date">{list.date}</span>
          </div>
          <div className="work-contents">{list.contents}</div>
        </div>
        <img className="edit-icon" src={edit} alt="edit" />
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

  // create for loop for <WorkElem />
  for (let i = todo.length - 1; i >= 0; i--) {
    todoItems.push(
      <WorkElem
        key={i}
        index={i}
        list={todo[i]}
        context={todo}
        update={update}
        data="todo"
      />
    )
  }

  let textInput = null
  useEffect(() => {
    textInput.focus()
  }, [textInput])

  const addElem = (e) => {
    if (e.key === 'Enter') {
      console.log('enter')
      const newTodo = [...todo]
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
        state: true,
        importance: 'yellow',
      }
      newTodo.push(newContext)
      update(newTodo)
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

  const doneItems = []

  // create for loop for <WorkElem />
  for (let i = done.length - 1; i >= 0; i--) {
    doneItems.push(
      <WorkElem
        key={i}
        index={i}
        list={done[i]}
        context={done}
        update={update}
        data="done"
      />
    )
  }

  return (
    <div id="list" className="done">
      <div className="list-text">Done</div>
      <Scrollbars style={{ width: 486, height: 530 }}>{doneItems}</Scrollbars>
    </div>
  )
}
