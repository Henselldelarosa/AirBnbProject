import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {getAllSpots} from '../../../store/spots'
import './GetAllSpots.css'

function GetNonUserSpots() {
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots))


useEffect(() => {
  dispatch(getAllSpots())
},[dispatch])

  return (
      <div className='spot_content'>
        <h1 className='spot_header'>Spots</h1>
        {spots && spots.map((spot) => {
          return(
            <div className='spot_detail' key={spot.id}>
              <div className='spot_image_content'>

                <NavLink className='spot_image' to={`/spots/${spot.id}`}>
                  <img className='spot_image_show' src={spot.previewImage} alt={spot.name}/>
                </NavLink>
              </div>

              <div className='spot_name_content'>
                <NavLink className='spot_name' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
              </div>
            </div>
          )
        })}

      </div>
  )
}

export default GetNonUserSpots
