// import React,{useState,useEffect} from 'react'
// import {useHistory, useParams} from 'react-router-dom'
// import {useDispatch,useSelector} from 'react-redux'
// import * as spotsAction from '../../store/spots'
// import EditSpotForm from '../EditSpot/EditSpotForm'

// function SpotDetail() {
// const dispatch = useDispatch()
// const history = useHistory()
// const {spotId} = useParams()
// // const spots = useSelector(state=>state.spots)
// const user = useSelector(state => state.session.user)
// const spot = useSelector(state=> state.spots[spotId])
// console.log(spot)

// // useEffect(()=>{
// //     dispatch(spotsAction.getSpotById(spotId))
// //   },[dispatch,spotId])


// const [showEditSpotForm, setShowEditSpotForm] = useState(false)
// const deleteASpot = (e)=>{
//   e.preventDefault()
//   if(spot.ownerId === user.id){
//     dispatch(spotsAction.deleteSpot(spot.id))
//   }
//   history.push('/spots')
// }

// {/* <div className='spot_addree'>{spot.address}</div>
// <div className='spot_city'>{spot.city}</div>
// <div className='spot_state'>{spot.state}</div>
// <div className='spot_country'>{spot.country}</div>
// <div className='spot_lat'>{spot.lat}</div>
// <div className='spot_lng'>{spot.lng}</div>
// <div className='spot_description'>{spot.description}</div>
// <div className='spot_price'><small>$</small>{spot.price}</div>
// <div className='spot_avgRating'>{spot.avgRating}</div> */}
// let content;
// if(showEditSpotForm && spot.ownerId === user.id){
//   content= (
// <EditSpotForm
// spot={spot}
// hideForm={()=>setShowEditSpotForm(false)}
// />
//   )
// }
// else{


//   content = (
//   spot?
//       <div>
//       <h1 className='spot_name'>{spot.name}</h1>
//        {(user.id === spot.ownerId) &&
//        (
//          <div className='spot_button'>
//            <EditSpotForm spot={spot}/>
//            <button className='delete_button' onClick={deleteASpot}>Delete Spot</button>
//          </div>
//        )}
//   <div>
//        <div className='edit_spot_content'>
//          <img className='edit_spotImage' src={spot.previewImage}/>
//        </div>
//        <div className='spot_addree'>{spot.address}</div>
//        <div className='spot_city'>{spot.city}</div>
//        <div className='spot_state'>{spot.state}</div>
//        <div className='spot_country'>{spot.country}</div>
//        <div className='spot_lat'>{spot.lat}</div>
//        <div className='spot_lng'>{spot.lng}</div>
//        <div className='spot_description'>{spot.description}</div>
//        <div className='spot_price'><small>$</small>{spot.price}</div>
//        <div className='spot_avgRating'>{spot.avgRating}</div>
//        </div>
//      </div>
//   :
//   <></>
//   )
// }

//       return content
// }

// export default SpotDetail

// {spot &&
//   <div>
//   <h1 className='spot_name'>{spot.name}</h1>
//    {(user.id === spot.ownerId) && (
//      <div className='spot_button'>
//        <button className='delete_button' onClick={deleteASpot}>Delete Spot</button>
//      </div>
//    )}

//    <div className='edit_spot_content'>
//      <img className='edit_spotImage' src={spot.previewImage}/>
//    </div>
//    <div className='spot_addree'>{spot.address}</div>
//    <div className='spot_city'>{spot.city}</div>
//    <div className='spot_state'>{spot.state}</div>
//    <div className='spot_country'>{spot.country}</div>
//    <div className='spot_lat'>{spot.lat}</div>
//    <div className='spot_lng'>{spot.lng}</div>
//    <div className='spot_description'>{spot.description}</div>
//    <div className='spot_price'><small>$</small>{spot.price}</div>
//    <div className='spot_avgRating'>{spot.avgRating}</div>
//    </div>
//    }
//  </div
























import { csrfFetch } from "./csrf";
// import { getSpotById } from "./spots";

const GET_BOOKINGS = 'booking/GET_BOOKINGS'
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

const remove = (bookingId, spotId) => ({
  type:REMOVE_BOOKING,
  bookingId,
  spotId
})

// const getBookings = (booking) => ({
//   type:GET_BOOKINGS,
//   booking
// })

const getUserBooking = (bookings) =>({
  type:GET_USER_BOOKING,
  bookings
})

// const getSpotBooking = (bookings)
// GET_SPOT_BOOKING

const getBooking = (booking,spotId) => ({
  type:GET_BOOKING,
  booking,
  spotId
})


export const getAllBookingsForUser = () => async(dispatch)=>{
const response = await csrfFetch(`/api/bookings/current`)
if(response.ok){
  const bookings = await response.json()
  dispatch(getUserBooking(bookings.Bookings))
  // return response
}
}

export const getCurrentSpotBooking = (spotId) => async(dispatch)=>{

  // console.log(spotId)
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
  if(response.ok){
    const data = await response.json()
    dispatch(getBooking(data.Bookings))
  }
}

export const createABooking = (data,spotId) => async(dispatch)=>{
  console.log(spotId)
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
  newState = Object.assign({}, state);
    action.booking.forEach(booking =>{
      // console.log(booking)
      newState.booking.id = booking

    })
    return newState



    case GET_USER_BOOKING:
      newState = {...state}
      action.bookings.forEach(booking => {
        newState[action.bookings.id] = booking
      });
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
