import './UserBookings.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as bookingAction from '../../../store/booking'
import { useParams } from 'react-router-dom'

function UserBookings() {
  const dispatch = useDispatch()
  let {bookingId} = useParams()
  const user = useSelector(state => state.session.user)
  const bookings = useSelector(state => Object.values(state.bookings))
  const userBookings = bookings.map((booking)=>{
    if(booking.userId === user.id){
    }
    return booking
  })
  useEffect(() => {
    dispatch(bookingAction.getAllBookingsForUser())
  },[dispatch])

const deleteABooking = (e,id) =>{
  e.preventDefault()
  dispatch(bookingAction.deleteBooking(id))
}
  return (
    <main>
      <div className ='user_booking_content'>
        <h1></h1>
        {userBookings && userBookings && userBookings.map((booking) =>{
          return (
            <div className='booking_content' key={booking.id}>
              <button onClick={(e) => {deleteABooking(e, booking.id)}}> Delete this booking</button>
              <h1>{booking.Spot.name}</h1>
              <h3 className='start_end'>{booking.startDate.split(' ')[0]} - {booking.endDate.split(' ')[0]}</h3>
              <h4 className='location'>{booking.Spot.address}, {booking.Spot.city}</h4>
              <h4>{booking.Spot.state}, {booking.Spot.country}</h4>
              <h5>{booking.Spot.lat}, {booking.Spot.lng}</h5>
              <h2>${booking.Spot.price} night</h2>
            </div>
          )
        })}

      </div>
    </main>
  )
}

export default UserBookings
