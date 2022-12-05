import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../../store/spots'
import { NavLink } from 'react-router-dom'
import './Home.css'
import Card from './Card'



function Home() {
  const spots = useSelector(state => Object.values(state.spots))
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])

  return (
      <div className='spot_content'>
        {spots && spots.map((spot) => {
          return(
            <div key={spot.id}>
              <div>
                <NavLink to='/spots/spotId'>
              <Card src={spot.previewImage}
              title={spot.name}
              description={spot.description}
              price={`$${spot.price}/night`}
              />
                </NavLink>
              </div>

              <div></div>
            </div>
          )
        })}

      </div>
  )
}

export default Home
