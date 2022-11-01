import { csrfFetch } from "./csrf";
// import { getSpotById } from "./spots";

const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const GET_BOOKING = 'booking/GET_BOOKING'

const addBooking = (booking) => {
  return{
    type:CREATE_BOOKING,
    booking
  }
}

const remove = (bookingId, spotId) => ({
  type:REMOVE_BOOKING,
  bookingId,
  spotId
})

const getBookings = (booking) => ({
  type:GET_BOOKINGS,
  booking
})


const getBooking = (booking,spotId) => ({
  type:GET_BOOKING,
  booking,
  spotId
})


export const getAllBookingsForUser = (userId) => async(dispatch)=>{

const response = await csrfFetch(`/api/spots/${userId}/bookings`)

if(response.ok){
  const data = await response.json()
  dispatch(getBookings(data.Bookings))
  // return response
}
}

export const getCurrentSpotBooking = (spotId) => async(dispatch)=>{

  console.log(spotId)
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
  if(response.ok){
    const data = await response.json()
    dispatch(getBooking(data.Bookings))
  }
}

export const createABooking = (data,spotId) => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
    method:'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const booking = await response.json()
  if(response.ok){
    dispatch(addBooking(booking))
  }
  return booking
  // return response
}

export const deleteBooking = (bookingId) => async(dispatch) => {

const response = await csrfFetch(`/api/${bookingId}`,{
  method:'DELETE'
})
if(response.ok){
  const {id:deleteId} = await response.json()
  dispatch(remove(deleteId))
  return deleteId
}
}


let initialState = {}
const bookingReducer = (state = initialState,action)=>{
let newState = {...state}
switch(action.type){

  case GET_BOOKING:
  newState = {...state}
    action.booking.forEach(booking =>{
      // console.log(booking)
      newState[booking.id] = booking

    })
    return newState


    case GET_BOOKINGS:
      action.bookings.forEach((booking)=> (newState[booking.id] = booking))
      console.log(action.bookings)
        return newState

    case CREATE_BOOKING:
     newState[action.booking.id] = action.booking
     return newState

      case REMOVE_BOOKING:
      delete newState[action.id]
      return newState

  default:
    return state
}
}

export default bookingReducer
