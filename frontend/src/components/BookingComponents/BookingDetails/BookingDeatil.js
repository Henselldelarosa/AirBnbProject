import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './BookingDeatil.css'
import * as bookingAction from '../../../store/booking'

function BookingDeatil() {
const history = useHistory()
const {bookingId} = useParams()
const booking = useSelector(state=> state.bookings[bookingId])
const dispatch = useDispatch()
const user = useSelector(state=>state.session.user)


const deleteBooking = (e) =>{
  e.preventDefault()
  if(booking.userId === user.id){
    dispatch(bookingAction.deleteBooking(bookingId))
  }
  history.push('/spots')
}


  return (
<></>
  )
}

export default BookingDeatil
