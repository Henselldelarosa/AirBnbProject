
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect} from 'react-router-dom'
import * as spotsAction from '../../frontend/src/store/spots'
import Fab from '../Fab'
import { getCurrentSpotBooking, deleteBooking } from '../../frontend/src/store/booking'
import { useParams } from 'react-router-dom'
import BookingBrowser from '../bookingComponent/BookingBrowser'

const GetSpotsBookings=()=>{
const dispatch = useDispatch()
const {spotId} = useParams()
const user = useSelector(state => state.session.user)
 const bookings = useSelector(state => Object.values(state.bookings))
 const spots = useSelector(state => Object.values(state.spots))
 const spotBookings = bookings.map(booking =>{
  if(booking.spotId === spots[spotId]){
    return booking
  }
  return booking
})



const deleteABooking = async(spotId)=>{

  dispatch(deleteBooking(bookings.id))
}

// const spotBookings = bookings.map((booking)=> {
//   if (booking.spotId === spotId) return booking
// })
const [showForm, setShowForm] = useState(false)
useEffect(()=>{
  dispatch(getCurrentSpotBooking(spotId))
},[dispatch])

if(!user){
  <Redirect to='/'/>
}

  return (
    <div>
      <h1>Spot Bookings</h1>
      {spotBookings && spotBookings.map((bookings)=>{
        return(
          <div key={bookings.id}>
            <button onClick={deleteABooking}>DeleteBurron</button>
        <div>{bookings.startDate}</div>
        <div>{bookings.endDate}</div>
        </div>
        )
      })}

    </div>
  )
}

export default GetSpotsBookings
