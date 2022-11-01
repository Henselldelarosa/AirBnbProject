
// import React, {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import * as bookingAction from '../../../store/booking'
// import {NavLink, Redirect, useParams} from 'react-router-dom'
// import * as spotAction from '../../../store/spots'

// const BookingBrowser = () => {
//   let {spotId} = useParams
// const dispatch = useDispatch()
// // const user = useSelector(state => state.session.user)
// const bookings = useSelector(state => Object.values(state.bookings))

// //const [showForm, setShowForm]= useState(false)

// useEffect(()=>{
//   dispatch(spotAction.getSpotById(spotId))
//   dispatch(bookingAction.getAllBookings())
// },[dispatch])

// // if(!user){
// //   <Redirect to='/'/>
// // }

//  if(!bookings) return null
//   return (
//     <div className='booking_content'>
//       <h1 className='booking_header'>Bookings</h1>
//       {bookings && bookings.map((booking)=>{
//         return(
//           <div className='booking_detail' key={booking.id}>
//             <div className='start_date'>{booking.startDate}</div>

//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default BookingBrowser


// import {useEffect, useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import * as bookingAction from '../../../store/bookings'
// import {NavLink, Redirect, useParams} from 'react-router-dom'
// import SpotDetail from '../../SpotDetail/SpotDetail'

//  const BookingBrowser = ({spot, bookingId}) => {
//   let {spotId} = useParams
//   const bookings = useSelector((state)=> {
//     if(!spot.bookings) return null
//     console.log(state.bookings)
//     return spot.bookings.map(bookingId => state.bookings[bookingId] )
//   })
// console.log(bookings)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(bookingAction.getAllBookings())

//   },[dispatch, spotId])
//   // console.log(dispatch(bookingAction.getAllBookings()))
//   // console.log(dispatch(bookingAction.getAllBookings(bookingId)))

//   if(!bookings) return null
// console.log(bookings)
//   return bookings.map((booking) => (
//     <tr key={booking.id}>
//       <td>{booking.startDate.slice(' ')[0]}</td>
//       <td>{booking.endDate.slice(' ')[0]}</td>

//       {/* <button onClick={()=> dispatch(bookingAction.deleteBooking(booking.id, spot.id))}> Delete Booking</button> */}
//     </tr>
//   ))

//  }

import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink, Redirect, useParams} from 'react-router-dom'
import SpotDetail from './SpotDetail/SpotDetail'
import * as spotsAction from '../store/spots'
import * as bookingAction from '../store/bookings'
// {bookingId}
const BookingBrowser = () => {
  const dispatch = useDispatch()
  let {spotId} = useParams()
  const user = useSelector(state => state.session.user)
  const spots = useSelector(state => Object.values(state.spots[spotId]))
  // const bookings = useSelector(state => Object.values(state.bookings[spotId]))
  const bookings = useSelector((state)=>{
    if(!spots.bookings) return null
    return spots.bookings.map(booking => state.bookings[spotId])
  })
  // console.log(bookings)
  const booking = useSelector(state => state.bookings)
  console.log(booking)
  console.log(spots)

  const[showForm, setShowForm]= useState(false)
  useEffect(()=>{
    // dispatch(spotsAction.getAllSpots())
    dispatch(bookingAction.getCurrentSpotBooking(spots.id))
  },[dispatch,spots.id])

  if(!user){
    <Redirect to='/'/>
  }
  // if (!spots) return null
  if (!booking) return null

  return booking.map((booking)=>(
    <div className='spot_image'>
       <tr
       key={booking.id}>

        <td>
          <img className='image_for_spot' src={spots.previewImage}/>
        </td>

        <td>{booking.startDate}</td>
        <td>{booking.endDate}</td>
       </tr>
    </div>
      )
    // <main>
      /* <nav>
        <h1 className='spot_booking_header'>Spot Bookings</h1>
        {bookings.spotId && bookings.spotId.map((booking)=>{
          return(
            <div className='booking_details' key={booking.id}>
            <div className='spot_image'>
              <div className='spot_image_content'>
                <img className='spot_image_show' src={spots.previwImage}/>
              </div>
              <div className='start_date'>{booking.startDate.slice(' ')[0]}</div>
              <div className='end_date'>{booking.endDate.slice(' ')[0]}</div>

            </div>
            </div>
          )
        })}

      </nav> */
      /* <div className='nav'>
        <NavLink to='/spots/:spotId'
      </div> */
    /* </main> */
  )
// const handleBooking = (e) => {
//   e.preventDefault()
  // if(bookings.spotId === spots){
  //   {bookings && bookings.map((booking) =>{
  //     return (

  //       <main>
  //         <nav>
  //         <h1 className='booking_header'> </h1>

  //       <div className='booking_detail'>
  //         <div className='spot_bookings' key={booking.id}>Bookings</div>
  //         <div className='start_date'>{booking.startDate.slice(' ')[0]}</div>
  //         <div className='end_date'>{booking.endDate.slice(' ')[0]}</div>
  //       </div>
  //         </nav>
  //       </main>
  //     )
  //   }
  //     )}
  // }
// }
}

export default BookingBrowser
// if(bookings.spotId === spots){
//   {bookings && bookings.map((booking) =>{
//     return (

//       <main>
//         <nav>
//         <h1 className='booking_header'> </h1>

//       <div className='booking_detail'>
//         <div className='spot_bookings' key={booking.id}>Bookings</div>
//         <div className='start_date'>{booking.startDate.slice(' ')[0]}</div>
//         <div className='end_date'>{booking.endDate.slice(' ')[0]}</div>
//       </div>
//         </nav>
//       </main>
//     )
//   }
//     )}
// }
