import './CreateBookingForm.css'

import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {createABooking} from '../../../store/booking'
import { Redirect, useHistory } from 'react-router-dom'

function CreateBookingForm({spotId}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  // const spot =  useSelector(state => state.spots[spotId] )
  const [errorMessages, setErrorMessages] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const updateStartDate = (e) => setStartDate(e.target.value)
  const updateEndDate = (e) => setEndDate(e.target.value)


  // useEffect(() => {
  //   if(startDate >= endDate){
  //     setErrorMessages.push('endDate cannot be on or before startDate')
  //   }
  // },[startDate,endDate])
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
   createNewBooking = await dispatch(createABooking(newBook,spotId))
    // try{
    //   createNewBooking = await dispatch(createABooking(newBook,spotId))
    //   setErrorMessages([])

    // }catch(e){
    //    setErrorMessages(e.errors)
    //    console.log(e)
    // }
    //  if (createNewBooking){
    //  history.push('/bookings/current')
    //  }
  }
  return (
    <div className='create_booking_body'>

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
      {errorMessages && errorMessages.map((error,id)=> <li key={id}>{error}</li>)}
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
