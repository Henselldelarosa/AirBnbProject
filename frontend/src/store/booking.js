import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const GET_BOOKING = 'booking/GET_BOOKING'

const getBookings = (booking) => ({
  type:GET_BOOKINGS,
  booking,
  spotId
})

const createBooking = (booking) => ({
  type:CREATE_BOOKING,
  booking
})

const getBooking = (id) => ({
  type:GET_BOOKING,
  id
})

const remove = (bookingId) => ({
  type:REMOVE_BOOKING,
  bookingId
})

export const getAllBookings = () => async(dispatch)=>{
const response = await csrfFetch('/api/bookings')

if(response.ok){
  const data = await response.json()
  dispatch(getBookings(data.Bookings))

  return response
}
}

export const getCurrentSpotBooking = (spotId) => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

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
    return spot
  }
  return response
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
    newState = {...state}
    action.bookings.forEach(booking =>{
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
