
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink} from 'react-router-dom'
import * as bookingAction from '../../store/booking'

function CurrentUserBooking() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => Object.values(state.bookings))
  //  const booking = useSelector((state)=>{
  //   return bookings.map(bookingId => state.bookin)
  //  })
  //  console.log(booking)
    const userBookings = bookings.map(booking =>{
      if(booking.userId === user.id){
        return booking
      }
      return booking
    })


    //  console.log(userBookings[0].id)

  useEffect(()=>{
    dispatch(bookingAction.getAllBookingsForUser())
  },[dispatch])

  // const deleteABooking = async(e)=>{
  //   e.preventDefault()
  //   if(bookings){
  //      await dispatch(bookingAction.deleteBooking(userBookings[bookingId]))
  //   }
  //   history.push('/')
  // }

  return (
    <main>
      <div className='user_booking_content'>
        <h1 className='user_booking_header'>Your Bookings</h1>
        {userBookings && userBookings.map((booking)=>{

             return(
               <div className='spot_booking_detail' key={booking.id}>

                 <div className='booking_name'>{booking.Spot.name}</div>
                  <NavLink to={`/bookings/${booking.id}`}>
                 <div className='booking_previewImage'>
                  <img scr={booking.Spot.previewImage} alt=''/>
                  </div>
                  </NavLink>
                 <div className='start_date'>Start Date: {booking.startDate}</div>
                 <div className='end_date'>End Date: {booking.endDate}</div>
                 <div className='booking_info'>
          <div className='booking_address'>{thisBooking.Spot.address}</div>
          <div className='booking_city'>{thisBooking.Spot.city}</div>
          <div className='booking_state'>{thisBooking.Spot.state}</div>
          <div className='booking_country'>{thisBooking.Spot.country}</div>
          <div className='booking_lat'>{thisBooking.Spot.lat}</div>
          <div className='booking_lng'>{thisBooking.Spot.lng}</div>
          <div className='booking_price'>${thisBooking.Spot.price}</div>
          </div>

                 </div>
             )
        })}
      </div>
    </main>
  )
}

export default CurrentUserBooking
