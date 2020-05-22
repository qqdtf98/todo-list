import './index.scss'

import Axios from 'axios'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import api from '../../api/index.js'
import google from '../../assets/images/google.png'
import { SearchContent } from '../../componets/TodoList'

function Main() {
  const history = useHistory()

  const confirmUserData = async (result) => {
    let userData
    await api
      .get('/user/get', {
        params: {
          userData: result.profileObj,
        },
      })
      .then((res) => {
        userData = res.data[0]

        history.push(`/todo/${userData.userId}`)
        // console.log(userData)
      })
  }

  return (
    <div id="main-page">
      <div className="main-title">Todo List</div>
      <GoogleLogin
        clientId="283233647825-oicrhle8givdtrv9ku1mt4ju9paeka56.apps.googleusercontent.com"
        render={(props) => (
          <img
            onClick={props.onClick}
            className="main-login"
            src={google}
            alt="login"
          />
          // <button onClick={props.onClick}>Login</button>
        )}
        buttonText="Sign in with Google"
        onSuccess={confirmUserData}
        onFailure={(result) => console.log(result)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Main
