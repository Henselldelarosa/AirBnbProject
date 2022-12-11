import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom'
import './DemoUser.css'
import * as sessionActions from '../../../store/session'


function DemoUser() {
  const dispatch = useDispatch()

  const[credential] = useState('CaptainDeadPool')
  const[password] = useState('crispyhigh5')

  const demoUserLogin =(e)=>{
    e.preventDefault()
    return dispatch(sessionActions.login({credential, password}))
  }

  return (
      <button className='demo_button' type='submit' onClick={demoUserLogin}>Demo Login</button>
  )
}

export default DemoUser
