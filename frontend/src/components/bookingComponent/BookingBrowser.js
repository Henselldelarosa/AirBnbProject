
import React from 'react'
import { useSelector } from 'react-redux'
import CurrentUserBooking from '../currentUserBooking/CurrentUserBooking'
import {deleteBooking}  from '../../store/booking'
function BookingBrowser() {
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
