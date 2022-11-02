
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as bookingAction from '../../store/booking'

function CurrentUserBooking ({bookings})  {
  const dispatch = useDispatch()
  const history = useHistory
  const booking = useSelector((state)=>{
    if(bookings.Spots) return null
    return bookings.Spots.map(bookingId=> state.bookings[bookingId])
  })
console.log(booking)
  const user = useSelector(state => state.session.user)
    // const booking = useSelector(state => Object.values(state.bookings))
    // let {id} = useParams()
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


     console.log(userBookings[1])

  useEffect(()=>{
    dispatch(bookingAction.getAllBookingsForUser())
  },[dispatch])

  const deleteABooking = async(e)=>{
    e.preventDefault()
    if(bookings){

    }
    history.push('/')
  }

  return (
    <main>
      <div className='user_booking_content'>
        <h1 className='user_booking_header'>Your Bookings</h1>
        {userBookings && userBookings.map((booking)=>{

             return(
               <div className='spot_booking_detail' key={booking.id}>
                 <button onClick={deleteABooking}>Delete Booking</button>
                 <div className='booking_name'>{booking.Spot.name}</div>
                 <div className='booking_previewImage'>
                  <img scr={booking.Spot.previewImage} alt=''/></div>
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
             )
        })}
      </div>
    </main>
  )
}

export default CurrentUserBooking
