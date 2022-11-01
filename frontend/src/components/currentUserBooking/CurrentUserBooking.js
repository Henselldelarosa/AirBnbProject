
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as bookingAction from '../../store/booking'

function CurrentUserBooking() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const bookings = useSelector(state => Object.values(state.bookings))
  console.log(user)
  console.log(bookings)

  useEffect(()=>{
    dispatch(bookingAction.getAllBookingsForUser())
  },[dispatch])

  // if(!user){

  // }

  return (
    <div></div>
  )
}

export default CurrentUserBooking
