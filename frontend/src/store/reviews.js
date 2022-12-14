import { csrfFetch } from "./csrf";


const SET_REVIEW = 'review/SET_REVIEWS'
const REMOVE_REVIEW = 'review/REMOVE_REVIEW'
const GET_REVIEW = 'review/GET_REVIEW'
const GET_SPOT_REVIEWS = 'review/GET_SPOT_REVIEWS'
const GET_USER_REVIEWS = 'review/GET_USER_REVIEWS'

const setReview = review =>{
  return{
    type:SET_REVIEW,
    review
  }
}

const removeReview = (reviewId) =>{
  return{
    type:REMOVE_REVIEW,
    reviewId
  }
}

const getUserReview = reviews =>{
  return{
    type:GET_USER_REVIEWS,
    reviews
  }
}

const getSpotReview = review =>{
  return{
    type:GET_REVIEW,
    review
  }
}

export const getAllReviews = () => async(dispatch) =>{
  const response = await csrfFetch('/api/reviews')

  if (response.ok){
    const data = await response.json()
    dispatch(getReviews(data.Reviews))
    return response
  }
}

export const getReviewById = (id) => async (dispatch) => {
const response = await csrfFetch(`/api/reviews/${id}`)

if(response.ok){
  const data = await response.json();
  dispatch(getReview(data));
  return response;
}
}


export const addReview = review => async (dispatch) => {

}
