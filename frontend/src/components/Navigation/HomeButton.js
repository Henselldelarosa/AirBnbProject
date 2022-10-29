import React from 'react'
import {NavLink} from 'react-router-dom'

function HomeButton() {
  return (
    <div>
      <NavLink exact to ='/'>
        <img title='Home' className='logo' src='https://d3ui957tjb5bqd.cloudfront.net/uploads/2015/09/airbnb-2.jpg' alt=''/>
      </NavLink>
    </div>
  )
}

export default HomeButton
