import './index.scss'

import Axios from 'axios'
import GoogleLogin from 'react-google-login'
import { NavLink } from 'react-router-dom'
import React from 'react'
import api from '../../api/index.js'
import google from '../../assets/images/google.png'

function Main() {
  const responseGoogle = (result) => {
    console.log(result)
  }

  const handleClick = () => {
    // api
    //   .post('/user/get', {
    //     data: {
    //       id: 'lsm',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    Axios.post('http://localhost:80/user/get').then((res) => {
      console.log(res)
    })
  }

  return (
    <div id="main-page">
      <div className="main-title">Todo List</div>
      <button onClick={handleClick}>button</button>
      {/* <GoogleLogin
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
        onSuccess={responseGoogle}
        onFailure={(result) => console.log(result)}
        cookiePolicy={'single_host_origin'}
      /> */}
    </div>
  )
}

export default Main
