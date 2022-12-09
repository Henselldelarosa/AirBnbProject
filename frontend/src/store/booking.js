
import { csrfFetch } from "./csrf";
// import { getSpotById } from "./spots";

// const GET_BOOKINGS = 'booking/GET_BOOKINGS'
const REMOVE_BOOKING ='booking/REMOVE_BOOKING'
const CREATE_BOOKING = 'booking/CREATE_BOOKING'
//  const GET_BOOKING = 'booking/GET_BOOKING'
const GET_USER_BOOKING = 'booking/GET_USER_BOOKING'
const GET_SPOT_BOOKING = 'booking/GET_SPOT_BOOKING'


const addBooking = (booking,spotId) => {
  return{
    type:CREATE_BOOKING,
    booking,
    spotId
  }
}



const remove = (bookingId,) => ({
  type:REMOVE_BOOKING,
  bookingId
})

// const getBooking = (booking) => ({
//   type:GET_BOOKING,
//   booking
// })

const getUserBooking = (bookings) =>({
  type:GET_USER_BOOKING,
  bookings
})



const getSpotBookings = (bookings) => {

  return {
  type:GET_SPOT_BOOKING,
  bookings,
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
  // .then(async response =>{
  //   const data = await response.json()
  //   dispatch(addBooking(data,spotId))
  // })
  .catch(async response =>{
    const newData = await response.json()
    return newData.message
  })



  .catch(async response =>{
    const newData = await response.json()
    return newData.message
  })



  if(response === 'Sorry, this spot is already booked for the specified dates'){
    return response
  }else{
    const data = await response.json()
    const booking = data.Bookings
    console.log(booking)
    //dispatch(addBooking(booking,spotId))
  }

  // return response
}

// export const createABooking = (data,spotId) => async(dispatch)=>{
//   console.log(spotId)
//     const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
//       method:'POST',
//       header: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })

//     const booking = await response.json()
//     console.log(booking)
//     if(response.ok){
//       // dispatch(addBooking(booking,spotId))
//     }else{
//       return response.errors;
//     }
//     return booking
//     // return response
//   }



export const deleteBooking = (bookingId) => async(dispatch) => {
const response = await csrfFetch(`/api/bookings/${bookingId}`,{
  method:'DELETE',
  header:{
    'Content-Type': 'application/json'
  }
})
const data = await response.json()

dispatch(remove(bookingId));
if(response.ok){
  console.log(bookingId)
  return (data)
}
}

// export const deleteBooking = (bookingId, spotId) => async dispatch => {
//   const response = await csrfFetch(`/api/bookings/${bookingId}`,{
//       method:'DELETE',
//       header:{
//         'Content-Type': 'application/json'
//       }
//     })

//   if (response.ok) {
//     const { id: deletebookingId } = await response.json();
//     dispatch(remove(deletebookingId, spotId));
//     return deletebookingId;
//   }
// };


let initialState = {}
const bookingReducer = (state = initialState,action)=>{
// let newState;
switch(action.type){
  case GET_SPOT_BOOKING:{

    const newState = {...state}
    action.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return newState
  }



    case GET_USER_BOOKING:{

      const newState = {...state}
      action.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return newState
    }

    case CREATE_BOOKING:{
      console.log(action.booking)
      return{
        ...state,
        [action.booking.id] : action.booking
      }
    }


      case REMOVE_BOOKING:
      const newState={...state}
      delete newState[action.bookingId]
      return newState


  default:
    return state
}
}

export default bookingReducer
