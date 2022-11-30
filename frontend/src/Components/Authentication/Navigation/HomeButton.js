import React from 'react'
import {NavLink} from 'react-router-dom'

function HomeButton() {
  return (
    <div>
      <NavLink exact to ='/'>
        <img title='Home' className='home_button_image' src= "http://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
      alt=''/>
      </NavLink>
    </div>
  )
}

export default HomeButton
