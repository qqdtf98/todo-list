import './index.scss'

import React, { useContext } from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import { TodoContext } from '../TodoList'
import deleteIcon from '../../assets/images/delete.svg'
import edit from '../../assets/images/edit.svg'
import plus from '../../assets/images/plus.svg'

function WorkElem() {
  const todoContext = useContext(TodoContext)

  console.log(todoContext)

  return (
    <div id="work-box">
      <div className="work-elem">
        <button className="work-importance"></button>
        <div className="work-data">
          <div className="work-top-box">
            <span className="work-title">title</span>
            <span className="work-date">2020/04/28</span>
          </div>
          <div className="work-contents">{todoContext[0].contents}</div>
        </div>
        <img className="edit-icon" src={edit} alt="edit" />
        <img className="delete-icon" src={deleteIcon} alt="delete" />
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
  return (
    <div id="list" className="done">
      <div className="list-text">Done</div>
      <Scrollbars style={{ width: 476, height: 530 }}>
        <WorkElem />
      </Scrollbars>
    </div>
  )
}
