import './Spot.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spots'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const SpotBrowser=()=>{
const dispatch = useDispatch()
const {spotId} = useParams()
const spot = useSelector(state=>{
  return Object.values.map(state.spots)
})

useEffect(()=>{
  dispatch(getAllSpots())
},[dispatch])

if(!spot){
  return null
}
  return(
    <div className="SpotLayout">
        {/* <Fab hidden={showForm} onClick={() => setShowForm(true)} /> */}
        {spot.map((spot) => {
          return (
            <NavLink key={spot.name} to={`/spot/${spot.id}`}>
              <div
                className={
                  Number.parseInt(spotId) === spot.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image"
                  style={{ backgroundImage: `url('${spot.imageUrl}')` }}
                ></div>
                <div>
                  <div className="primary-text">{spot.name}</div>
                </div>
              </div>
            </NavLink>
          );
        })}
    </div>
  )
}

export default SpotBrowser
