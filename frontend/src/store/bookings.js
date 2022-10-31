import { csrfFetch } from "./csrf";
import { getSpotById } from "./spots";

const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const GET_BOOKING = 'booking/GET_BOOKING'

const createBooking = (booking) => {
  return{
    type:CREATE_BOOKING,
    booking
  }
}

const remove = (id) => ({
  type:REMOVE_BOOKING,
  id
})

const getBookings = (booking) => ({
  type:GET_BOOKINGS,
  booking
})


const getBooking = (id) => ({
  type:GET_BOOKING,
  id
})


export const getAllBookings = () => async(dispatch)=>{
const response = await csrfFetch(`/api/bookings`)

if(response.ok){
  const data = await response.json()
  dispatch(getBookings(data.booking))
  // return response
}
}

export const getCurrentSpotBooking = (id) => async(dispatch)=>{
  const response = await csrfFetch(`/api/bookings/${id}`)

  if(response.ok){
    const data = await response.json()
    dispatch(getBooking(data))
  }
  return response
}

export const createABooking = (data) => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots/:spotId/bookings`,{
    method:'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok){
    const booking = await response.json()
    dispatch(createBooking(booking))
    return booking
  }
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
let newState;
switch(action.type){

  case GET_BOOKINGS:
  newState = {}
    action.bookings.forEach(booking =>{
      console.log(booking)
      newState[booking.id] = booking

    })
    return newState


    case GET_BOOKING:
      return{
        ...state,
        [action.booking.id]: action.booking
      }

    case CREATE_BOOKING:
      return{
        ...state,
        [action.spot.id]: action.booking
      }

      case REMOVE_BOOKING:
      newState={...state}
      delete newState[action.id]
      return newState

  default:
    return state
}
}

export default bookingReducer
