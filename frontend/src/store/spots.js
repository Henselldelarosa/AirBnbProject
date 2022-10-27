import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/GET_SPOTS'
const UPDATE_SPOT = 'spot/UPDATE_SPOT'
const REMOVE_SPOT = 'spot/REMOVE_SPOT'
const ADD_SPOT = 'spot/ADD_SPOT'
const GET_SPOT = 'spot/GET_SPOT'

const getSpots = (spots)=>({
  type:GET_SPOT,
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
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const spot = await response.json()
  dispatch(add(spot))
  return spot
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
    const {id:deleteId} = await response.json()
    dispatch(remove(deleteId))
    return deleteId
  }
}

let initialState = {}
const spotReducer = (state = initialState,action) =>{

  switch(action.type){

    case GET_SPOTS:
      initialState = {}
      action.spots.forEach(spot => {
        initialState[spot.id] = spot
      });
      return initialState

      case GET_SPOT:
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
        initialState = {...state}
        delete initialState[action.id]
        return initialState

    default:
      return state
  }
}

export default spotReducer
