
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { deleteBooking,getAllBookingsForUser } from '../../store/booking'
function CurrentUserBookingDetail() {
  const history = useHistory()
  let {bookingId} = useParams()
  const dispatch = useDispatch()
  const bookings = useSelector(state => Object.values(state.bookings))
  const user = useSelector(state => state.session.user)
console.log(bookings)
  useEffect(()=>{
    dispatch(getAllBookingsForUser())
  },[dispatch])

  const deleteABooking = async(e)=>{
    if (bookings.userId === user.id){
      await dispatch(deleteBooking(bookingId))
    }
    history.push('bookings/current')
  }

  return (
    <div>
      {bookings && bookings.map((thisBooking)=>{
        return(
          <div className='booking_info'>
          <div className='booking_address'>{thisBooking.Spot.address}</div>
          <div className='booking_city'>{thisBooking.Spot.city}</div>
          <div className='booking_state'>{thisBooking.Spot.state}</div>
          <div className='booking_country'>{thisBooking.Spot.country}</div>
          <div className='booking_lat'>{thisBooking.Spot.lat}</div>
          <div className='booking_lng'>{thisBooking.Spot.lng}</div>
          <div className='booking_price'>${thisBooking.Spot.price}</div>
          </div>
        )
      })}

    </div>
  )
}

export default CurrentUserBookingDetail
