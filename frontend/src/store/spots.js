import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/GET_SPOTS'
const UPDATE_SPOT = 'spot/UPDATE_SPOT'
const REMOVE_SPOT = 'spot/REMOVE_SPOT'
const ADD_SPOT = 'spot/ADD_SPOT'
const GET_SPOT = 'spot/GET_SPOT'
// const

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

const remove = (spotId) =>({
  type: REMOVE_SPOT,
  spotId
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

export const getSpotById = (spotId) => async(dispatch) =>{
  const response = await csrfFetch(`/api/spots/${spotId}`)

  if (response.ok){
    const data = await response.json()
    dispatch(getSpot(data))

    return response
  }
}

export const currentUserSpots = () => async(dispatch) => {
const response = await csrfFetch('/api/spots/current')
if(response.ok){
  const data = await response.json()
  dispatch(getSpots(data.Spots))
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
    console.log(dispatch(add(spot)))
    dispatch(add(spot))
    return spot
  }
  return response
}

export const updateSpot = data => async dispatch =>{
  const response = await csrfFetch(`/api/spots/${data.id}`,{
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
     await response.json()
    dispatch(remove(spotId))
    return response
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
        delete newState[action.spotId]
         return newState

    default:
      return state
  }
}

export default spotReducer
