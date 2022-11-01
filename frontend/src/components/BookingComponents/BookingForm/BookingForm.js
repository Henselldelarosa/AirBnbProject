import React, {useState} from 'react'
import  {useDispatch,useSelector} from 'react-redux'
import * as bookingAction from '../../../store/bookings'
import './BookingForm.css'

function BookingForm({bookingId,hideForm,spotId}) {
  const dispatch = useDispatch()
  let booking = useSelector(state=>state.bookings[bookingId])
  let user = useSelector(state=>state.session.user)
  let spot = useSelector(state => state.spots[spotId])

  const [startDate, setStartDate] = useState(booking.startDate)
  const [endDate, setEndDate] = useState(booking.endDate)

  const updateStartDate = (e) => setStartDate(e.target.value)
  const updateEndDate = (e) => setEndDate(e.target.value)


  const isAdd = !booking
  if(!booking){
    booking = {
      userId:user.id,
      spotId: spot.id,
      startDate: "",
      endDate:""
    }
  }
const handleSubmit = async(e) =>{
  e.preventDefault()

  const payload ={
    ...booking,
    startDate,
    endDate
  }

  const createBooking = isAdd
    await dispatch(bookingAction.createABooking(payload, spotId))

  if(createBooking){
    hideForm()
  }
}

const handleCancel = (e) =>{
  e.preventDefault()
  hideForm()
}


  return (
    <div>
      <form className='booking_form' onSubmit={handleSubmit}>
        <input
          type='date'
          placeholder='Start Date'
          value={startDate}
          onChange={updateStartDate}
          />

        <input
          type ='date'
          placeholder='End Date'
          value={endDate}
          onChange={updateEndDate}
        />
        <button type='submit'>{isAdd}Create Booking</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}

export default BookingForm
