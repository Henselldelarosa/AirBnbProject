
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as bookingAction from '../../frontend/src/store/booking'
import './CurrentUserBookings.css'
function CurrentUserBooking() {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const bookings = useSelector(state => Object.values(state.bookings))
 

  // const booking = useSelector(state => state.bookings[id])


  //   (async func = async(bookings) =>{
  //   for wait (let i = 0 ; i < bookings.length;i++){
  //     each.push(Object.values(bookings[i]))
  //   }

  // }
    // console.log(each)
  useEffect(()=>{
    dispatch(bookingAction.getAllBookingsForUser())
  },[dispatch])

  const deleteABooking = (e)=>{
    e.preventDefault()
      dispatch(bookingAction.deleteBooking(bookingId))
    }
    // }


    const userBookings = bookings.map(booking =>{
      if(booking.userId === user.id){
        return booking
      }
      return booking
    })
    // console.log(userBookings[0].id)


  // useEffect(()=>{
  //   dispatch(bookingAction.getAllBookingsForUser())
  // },[dispatch])

  return (
    <main>
      <div className='user_booking_content'>
        <h1 className='user_booking_header'>Your Bookings</h1>
        {userBookings && userBookings.map((booking)=>{

             return(
              <div>
                 <button onClick={deleteABooking}>Delete Booking</button>
               <div className='spot_booking_detail' key={booking.id}>
                 <div className='booking_name'>{booking.Spot.name}</div>
                 <div className='booking_previewImage'>
                  <img scr={booking.Spot.previewImage} alt={booking.Spot.previewImage}/></div>
                 <div className='start_date'>Start Date: {booking.startDate}</div>
                 <div className='end_date'>End Date: {booking.endDate}</div>
                 <div className='booking_address'>{booking.Spot.address}</div>
                 <div className='booking_city'>{booking.Spot.city}</div>
                 <div className='booking_state'>{booking.Spot.state}</div>
                 <div className='booking_country'>{booking.Spot.country}</div>
                 <div className='booking_lat'>{booking.Spot.lat}</div>
                 <div className='booking_lng'>{booking.Spot.lng}</div>
                 <div className='booking_price'>${booking.Spot.price}</div>
                 </div>
                 </div>
             )
        })}
      </div>
    </main>
  )
}

export default CurrentUserBooking
