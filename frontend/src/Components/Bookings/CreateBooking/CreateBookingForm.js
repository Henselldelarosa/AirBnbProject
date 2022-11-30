import './CreateBookingForm.css'

import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import {createABooking} from '../../../store/booking'

function CreateBookingForm({spotId}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  // const spot =  useSelector(state => state.spots[spotId] )
  const [errorMessages, setErrorMessages] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const updateStartDate = (e) => setStartDate(e.target.value)
  const updateEndDate = (e) => setEndDate(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessages([])

    // if (errorMessages.length > 0) return setErrorMessages(errorMessages)
    const newBook = {
      userId:user.id,
      spotId,
      startDate,
      endDate
    }

    let createNewBooking

    try{
      createNewBooking = await dispatch(createABooking(newBook,spotId))
      setErrorMessages([])

    }catch(e){
      // const response = await e.json()
      // setErrorMessages(response.errors)
    }
  }
  return (
    <form className='create_booking_form' onSubmit={handleSubmit}>
      {/* {spot && ((currentSpot)=>{
        return(
          <div className='spot_price_reviews'key={currentSpot.id}>
            <div>{currentSpot.price} night</div>
            <div>{currentSpot.avgStarRating}  {spot.numReviews}</div>
          </div>
        )
      })} */}

      <h1>Create A Booking</h1>
      <ul>
      {/* {errorMessages.map((error,id)=> <li key={id}>{error}</li>)} */}
      </ul>
      <input
      type='date'
      placeholder='Start Date'
      value={startDate}
      onChange={updateStartDate}
      />

      <input
      type='date'
      placeholder='End Date'
      value={endDate}
      onChange={updateEndDate}
      />
      <button type='submit'>Create Booking</button>
      {/* <button type='button' onClick={handleCancelClick}>Cancel</button> */}
    </form>
  )
}

export default CreateBookingForm
