
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrentUserBooking from '../currentUserBooking/CurrentUserBooking'
import {deleteBooking}  from '../../frontend/src/store/booking'

function BookingBrowser({spotId}) {
  const user = useSelector(state=> state.session)
  const dispatch = useDispatch()

  console.log(spotId,"helooo")
  const bookings = useSelector(state => Object.values(state.bookings))
  return (
    <div>

      {bookings.map((booking)=>{
         <CurrentUserBooking booking={booking} key={booking.id}/>
      })}
    </div>
    )

}

export default BookingBrowser
