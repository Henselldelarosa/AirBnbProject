import './CreateBookingForm.css'

import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {createABooking} from '../../../store/booking'
import { useHistory } from 'react-router-dom'

function CreateBookingForm({spotId}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  // const bookings = useSelector(state => Object.values(state.bookings))
  // const spot =  useSelector(state => state.spots[spotId] )
  const [errors, setErrors] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())



  const updateStartDate = (e) => setStartDate(e.target.value)
  const updateEndDate = (e) => setEndDate(e.target.value)

useEffect(()=>{

const today = new Date()

let todaySecs = today.getTime()
let startSecs = new Date(startDate).getTime()
const validationError =[]

if(startDate >= endDate) validationError.push('End date can not be on or before start date ')
if(startSecs - todaySecs <= 60000) validationError.push('Your start date can not be the current date')

// for(let i = 0; i < bookings.length; i++){
//   let booking = bookings[i]
//   let bookingStart = new Date(booking.startDate).getTime()
//   let bookingEnd = new Date(booking.endDate).getTime()

//   if(startSecs >= bookingStart && startSecs <= bookingEnd) validationError.push("Sorry, this spot is already booked for the specified dates")
//   if(endsecs >= bookingStart && endsecs <= bookingEnd) validationError.push('End date conflicts with an existing booking')
//   if(bookingStart >= startSecs && bookingStart <= endsecs) validationError.push("Start date conflicts with an existing booking")
// }

setErrors(validationError)
},[endDate,startDate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])


    const newBook = {
      userId:user.id,
      spotId,
      startDate,
      endDate
    }


// try getting history to work
//go to currentuser bookings and do a if(userBooking)
      const errors = await dispatch(createABooking(newBook,spotId))
      if (errors === 'Sorry, this spot is already booked for the specified dates'){
        setErrors([errors])
      }else{
        // history.push('/bookings/current')
        alert('Booking Created')
      }
    }
    // const errors = await dispatch(createABooking(newBook,spotId))
    // if (errors){
    //   setErrors([errors])
    // }else if(!errors){
    //   history.push('/bookings/current')

    let createNewBooking
   createNewBooking = await dispatch(createABooking(newBook,spotId))
    // try{
    //   createNewBooking = await dispatch(createABooking(newBook,spotId))
    //   setErrorMessages([])


    // }


  return (
    <div className='create_booking_body'>

    <form className='create_booking_form' onSubmit={handleSubmit}>
      <h1>Create A Booking</h1>
      <ul>
      {errors.map((error,id)=><li key={id}>{error}</li>)}
      </ul>
      <div className='inner_content'>
        <div className='in_out'>

      <div className='checking'>CHECK-IN
      <input
      className='checking_in'
      type='date'
      placeholder='Start Date'
      value={startDate}
      onChange={updateStartDate}
      />
      </div>

      <div className='checkout'>CHECKOUT
      <input
      type='date'
      placeholder='End Date'
      value={endDate}
      onChange={updateEndDate}
      className=''
      />
      </div>
      </div>

      <div className='reserve_div'>
      <button className='reserve_button'type='submit'>Reserve</button>
        </div>
      </div>
      {/* <button type='button' onClick={handleCancelClick}>Cancel</button> */}
    </form>
    </div>
  )
}

export default CreateBookingForm
