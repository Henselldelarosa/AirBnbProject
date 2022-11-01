import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/GET_SPOTS'
const UPDATE_SPOT = 'spot/UPDATE_SPOT'
const REMOVE_SPOT = 'spot/REMOVE_SPOT'
const ADD_SPOT = 'spot/ADD_SPOT'
const GET_SPOT = 'spot/GET_SPOT'

const getSpots = (spots)=>({
  type:GET_SPOTS,
  spots
})

const getSpot = (spot)=>({
  type:GET_SPOT,
  spot
})

const update = (spot) =>({
  type:UPDATE_SPOT,
  spot
})

const remove = (id) =>({
  type: REMOVE_SPOT,
  id
})

const add = (spot)=>({
  type:ADD_SPOT,
  spot
})

export const getAllSpots = () => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpots(data.Spots))

    return response
  }
}

export const getSpotById = (id) => async(dispatch) =>{
  const response = await csrfFetch(`/api/spots/${id}`)

  if (response.ok){
    const data = await response.json()
    dispatch(getSpot(data))

    return response
  }
}




export const addSpot = (data) => async(dispatch)=>{
  const response = await csrfFetch(`/api/spots`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok){
    const spot = await response.json()
    dispatch(add(spot))
    return spot
  }
  return response
}

export const updateSpot = data => async dispatch =>{
  const response = await csrfFetch(`/api/spots/:${data.spotId}`,{
    method:'put',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.ok){
    const spot = await response.json()
    dispatch(update(spot))
    return spot
  }

}

export const deleteSpot = (spotId) => async dispatch=>{
  const response = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'delete'
  })
  if(response.ok){
    const {id:deleteId} = await response.json()
    dispatch(remove(deleteId))
    return deleteId
  }
}

let initialState = {}
const spotReducer = (state = initialState,action) =>{
let newState;
  switch(action.type){
    case GET_SPOTS:
      // console.log(action.spots)
      newState = {...state}
      action.spots.forEach(spot => {
        newState[spot.id] = spot
      });
      return newState

      case GET_SPOT:
        // console.log(action.spot)
        return {
          ...state,
          [action.spot.id] : action.spot
        }

      case ADD_SPOT:
      case UPDATE_SPOT:
        return{
          ...state,
          [action.spot.id] : action.spot
        }

      case REMOVE_SPOT:
        newState = {...state}
        delete newState[action.id]
        return newState

    default:
      return state
  }
}

export default spotReducer
