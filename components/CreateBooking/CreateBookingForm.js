import './CreateBookingForm.css'

import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {createABooking} from '../../frontend/src/store/booking'


function CreateBookingForm({spotId}) {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const spot = useSelector(state => state.spots[spotId])


  const [errorMessages, setErrorMessages] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')



  const updateStartDate = (e) => setStartDate(e.target.value)
  const updateEndDate = (e) => setEndDate(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessages([])


    const payload = {
      userId:user.id,
      spotId,
      startDate,
      endDate
    }


    let createBooking

    try{
      createBooking = await dispatch(createABooking(payload,spotId))
      setErrorMessages([])
      //hello

    }catch(e){
      const response = await e.json()
      setErrorMessages(response.errors)
    }
    history.push(`/bookings/current`)
// hideForm()
}

// const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   //!!START SILENT
  //    setErrorMessages([]);
  //   //!!END
  //   history.push('/')
  //   //  hideForm();
  // };

  return (
    <form className='create_booking_form' onSubmit={handleSubmit}>
      <h1>Create A Booking</h1>
      <ul>
    {errorMessages.map((error,id)=> <li key={id}>{error}</li>)}
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
