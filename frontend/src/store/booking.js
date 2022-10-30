import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
const GET_BOOKING = 'booking/GET_BOOKING'

const getBookings = (booking, spotId)=>({
  type:GET_BOOKINGS,
  booking,
  spotId
})

const createBooking = (booking)=>({
  type:CREATE_BOOKING,
  booking
})

const getBookingById=(id)=>({
  type:GET_BOOKING,
  id
})

const remove = (id)=>({
  type:REMOVE_BOOKING,
  id
})

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
