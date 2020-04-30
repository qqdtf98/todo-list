import './index.scss'

import React, { useContext } from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import { TodoContext } from '../TodoList'
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
  // TODO 버튼 누르면 importance 변경하기
  const changeImportance = () => {
    const newContext = [...props.context]

    console.log(newContext[props.index].importance)
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
        <button className="work-check-btn"></button>
      </div>
    </div>
  )
}

export function Todo() {
  return (
    <div id="list" className="todo">
      <div className="list-text">Todo</div>
      <div className="add-btn-box">
        <button className="add-btn">
          <img className="add-icon" src={plus} alt="plus" />
        </button>
      </div>
      <Scrollbars style={{ width: 476, height: 450 }}>
        <WorkElem />
        <WorkElem />
        <WorkElem />
        <WorkElem />
        <WorkElem />
        <WorkElem />
      </Scrollbars>
    </div>
  )
}

export function Done() {
  const doneContext = useContext(DoneContext)
  const done = doneContext.state
  const update = doneContext.update

  const doneItems = []

  // create for loop for <WorkElem />
  for (const [index, value] of done.entries()) {
    doneItems.push(
      <WorkElem
        key={index}
        index={index}
        list={value}
        context={done}
        update={update}
      />
    )
  }

  return (
    <div id="list" className="done">
      <div className="list-text">Done</div>
      <Scrollbars style={{ width: 476, height: 530 }}>{doneItems}</Scrollbars>
    </div>
  )
}
