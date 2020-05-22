import './index.scss'

import React, { useContext, createContext } from 'react'
import TodoList from '../../componets/TodoList/index.js'

export const UserContent = React.createContext('')

function TodoPage(urlData) {
  return (
    <>
      <UserContent.Provider value={{ userId: urlData.match.params.userId }}>
        <TodoList id="todo-page" />
      </UserContent.Provider>
    </>
  )
}

export default TodoPage
