
import { csrfFetch } from "./csrf";
// import { getSpotById } from "./spots";

// const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
 const GET_BOOKING = 'booking/GET_BOOKING'
const GET_USER_BOOKING = 'booking/GET_USER_BOOKING'
const GET_SPOT_BOOKING = 'booking/GET_SPOT_BOOKING'


const addBooking = (booking,spotId) => {
  return{
    type:CREATE_BOOKING,
    booking,
    spotId
  }
}

const remove = (bookingId,userId) => ({
  type:REMOVE_BOOKING,
  bookingId,
  userId
})

const getBooking = (booking) => ({
  type:GET_BOOKING,
  booking
})

const getUserBooking = (bookings) =>({
  type:GET_USER_BOOKING,
  bookings
})



const getSpotBookings = (bookings,spotId) => {

  return {
  type:GET_SPOT_BOOKING,
  bookings,
  spotId
  }
}


export const getAllBookingsForUser = () => async(dispatch)=>{
const response = await csrfFetch(`/api/bookings/current`)
if(response.ok){
  const data = await response.json()
  dispatch(getUserBooking(data.Bookings))
  // return response
}
}

export const getCurrentSpotBooking = (spotId) => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
  const data = await response.json()
  if(response.ok){
    dispatch(getSpotBookings(data.Bookings,spotId))
  }
  return response
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

export const deleteBooking = (bookingId,userId) => async(dispatch) => {
const response = await csrfFetch(`/api/bookings/${bookingId}`,{
  method:'DELETE'
})
if(response.ok){
  const { id: deletedBookingId } = await response.json();
  dispatch(remove(deletedBookingId, userId));
  return deletedBookingId;
}
}


let initialState = {}
const bookingReducer = (state = initialState,action)=>{
let newState;
switch(action.type){
  case GET_SPOT_BOOKING:
  newState = {}
  action.bookings.forEach(booking => {
      newState[booking.id] = booking
    });
    return newState



    case GET_USER_BOOKING:
      newState = {...state}
      action.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return newState

    case CREATE_BOOKING:
      return{
        ...state,
        [action.booking.id] : action.spot
      }

      case REMOVE_BOOKING:
        newState={...state}
      delete newState[action.bookingId]
      return newState

  default:
    return state
}
}

export default bookingReducer
