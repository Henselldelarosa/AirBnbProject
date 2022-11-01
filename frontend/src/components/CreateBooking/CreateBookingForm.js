import './CreateBookingForm.css'

import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {createABooking} from '../../store/bookings'


function CreateBookingForm({spotId}) {
const history = useHistory()
const dispatch = useDispatch()
// const {spotId} = useParams()
const user = useSelector(state => state.session.user)
const spot = useSelector(state => state.spots[spotId])
// console.log(spot)
// console.log(user)

const [errorMessages, setErrorMessages] = useState([])
const [startDate, setStartDate] = useState('')
const [endDate, setEndDate] = useState('')
// const [user, setUser]= useState()


const updateStartDate = (e) => setStartDate(e.target.value)
const updateEndDate = (e) => setEndDate(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessages([])


    const payload = {
      spotId:spot.id,
      userId:user.id,
      startDate,
      endDate
    }

    console.log(payload)
    let createBooking

    try{
      createBooking = await dispatch(createABooking(payload))
      setErrorMessages([])
      history.push(`/spots/${spotId}/bookings`)
//hello

    }catch(e){
      const response = await e.json()
      setErrorMessages(response.errors)
    }
    console.log(createABooking)
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
      <button type='submit'>Create new Spot</button>
      {/* <button type='button' onClick={handleCancelClick}>Cancel</button> */}

    </form>

  )
}

export default CreateBookingForm
