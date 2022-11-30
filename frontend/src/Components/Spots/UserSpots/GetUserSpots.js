import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../../store/spots'
import './GetUserSpots.css'

function GetUserSpots() {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const spots = useSelector(state => Object.values(state.spots))
const userSpot = spots.map((spot)=>{
  if(spot.ownerId === user.id){
    return spot
  }
  return false
}
)

useEffect(() => {
  dispatch(getAllSpots())
},[dispatch])

console.log(spots)

  return (
    <nav>
      <main>

    <div>
      <h1 className='current_user_spots'>Your Spots</h1>
      {userSpot && userSpot.map((spot) => {

        return(
          <div className='current_user_spot_container' key={spot.id}>
            <div>
            <div className='current_user_spot_info'>
              <img className='user_spot_image' src={spot.previewImage} alt=''/>
            </div>
            <div className='user_spot_name'>{spot.name}</div>

            <div className='user_spot_address_city'>{spot.address}, {spot.city}</div>

            <div className='user_spot_state'>{spot.state}, {spot.country}</div>

            <div className='user_spot_lat_lng'>{spot.lat}, {spot.lng}</div>

            <div className='user_spot_description'>{spot.description}</div>

            <div className='user_spot_price'><small>$</small><big>{spot.price}</big></div>

            <div className='user_spot_avg_Rating'><big>{spot.avgRating}</big></div>
            </div>
          </div>

        )
      })}

      </div>
      </main>
    </nav>
  )
}

export default GetUserSpots
