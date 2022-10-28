import './Spot.css'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect, Route,useParams } from 'react-router-dom'
import * as spotsAction from '../../store/spots'
import CreateSpotForm from '../CreatSpot/CreateSpotForm'
import Fab from '../Fab'
import SpotDetail from '../SpotDetail/SpotDetail'



const SpotBrowser=()=>{
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const spots = useSelector(state => Object.values(state.spots))
const {spotId} = useParams()
const [showForm, setShowForm] = useState(false)
useEffect(()=>{
  dispatch(spotsAction.getAllSpots())
},[dispatch])

if(!user){
  <Redirect to='/'/>
}

if(!spots) return null

  return (
    <main>
      <nav>

    <div className='spot_content'>
      <h1 className='spots_header'>Spots</h1>
      {spots && spots.map((spot)=>{
        return (
          <div className='spots_detail' key ={spot.id}>

            <div className='spot_image'>

              <div className='spots_image_content'>
                <img className='spot_image_show' src={spot.previewImage} alt={spot.name}/>
              </div>
            </div>

            <div className='spot_detail'>

              <div className='spot_name'>
                <NavLink className='spot_name_link' to={`/spots/${spot.id}`}>{spot.name}</NavLink>
              </div>
              <div className='spot_addree'>{spot.address}</div>
              <div className='spot_city'>{spot.city}</div>
              <div className='spot_state'>{spot.state}</div>
              <div className='spot_country'>{spot.country}</div>
              <div className='spot_lat'>{spot.lat}</div>
              <div className='spot_lng'>{spot.lng}</div>
              <div className='spot_description'>{spot.description}</div>
              <div className='spot_price'><small>$</small>{spot.price}</div>
              <div className='spot_avgRating'>{spot.avgRating}</div>
            </div>

           </div>
        )
      })}
    </div>
      </nav>
      {/* {showForm ?(
        <CreateSpotForm hideForm={() => setShowForm(false)}/>
      ) : (
        <Route path='/spots/:spotId'>
          <SpotDetail/>
        </Route>
      )} */}

      <NavLink to='/spots/create'>
      <Fab hidden={showForm} onClick={()=>setShowForm(true)}/>
      </NavLink>

     </main>

  )
}

export default SpotBrowser
