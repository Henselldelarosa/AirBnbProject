import React,{ useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {getAllSpots} from '../../../store/spots'
import Home from '../../Authentication/HomeComponent/Home'
import './GetAllSpots.css'

function GetNonUserSpots() {
  const dispatch = useDispatch()
  // const spots = useSelector(state => Object.values(state.spots))


useEffect(() => {
  dispatch(getAllSpots())
},[dispatch])

  return (
      <div className='spot_content'>
        <Home/>
      </div>
  )
}

export default GetNonUserSpots
