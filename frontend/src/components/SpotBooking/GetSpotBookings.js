
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect} from 'react-router-dom'
import * as spotsAction from '../../store/spots'
import Fab from '../Fab'
import { getCurrentSpotBooking,getAllBookingsForUser } from '../../store/booking'



const GetSpotsBookings=({spotId,booking})=>{
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
 const bookings = useSelector(state => Object.values(state.bookings))
// const booking = useSelector((state) => {
//   if(bookings.userId === user.id) return booking.map(bookingId => state.bookings[bookingId])
// })


const spotBookings = bookings.map((booking)=> {
  if (booking.spotId === spotId) return booking
})
const [showForm, setShowForm] = useState(false)
useEffect(()=>{
  dispatch(getAllBookingsForUser(spotId))
},[dispatch])

if(!user){
  <Redirect to='/'/>
}

// if(!spots) return null

  return (
    <h1>This works</h1>
  )
}

export default GetSpotsBookings
