import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useHistory, useParams } from 'react-router-dom'
import { getSpotById, deleteSpot } from '../../../store/spots'
import './SpotDetailBrowser.css'
import EditASpotForm from '../../Spots/EditSpot/EditASpotForm'
import CreateBookingForm from '../../Bookings/CreateBooking/CreateBookingForm'

function SpotDetailBrowser() {
  const dispatch = useDispatch()
  let {spotId} = useParams()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const spot = useSelector(state => state.spots[spotId]);
    const ratingCheck = (rating) =>{
      if(rating === null){
        return rating = 'new'
      }else{
        return rating
      }
    }

const [showEditSpotForm, setShowEditSpotForm] = useState(false);

  useEffect(() => {
    dispatch(getSpotById(spotId))
  },[dispatch,spotId])


  const deleteASpot = (e) => {
    e.preventDefault()

    if(spot.ownerId === user.id){
      dispatch(deleteSpot(spot.id))
      history.push('/')
    }
  }

let content =null

if (showEditSpotForm) {
  content = (
    <EditASpotForm
      spot={spot}
      hideForm={() => setShowEditSpotForm(false)}
    />
  );
}else{
  if(user){
    content = (
        spot?
      <div className='spot_detail_content'>
        {(user.id === spot.ownerId) && (
          <div className='spot_button'>
            {(!showEditSpotForm) && (
              <div className='edit_div'>
              <button className='edit_form_button' onClick={() => setShowEditSpotForm(true)}>Update</button>
              </div>
              )}
              <div className='delete_div'>
            <button className='delete_spot_button' onClick={deleteASpot}>Delete Spot</button>
            </div>
          </div>
        )}
        <h1 className='spot_detail'>{spot.name}</h1>

        <div className='spot_info'>
        <div className='user_spot_avg_Rating'><i className="fa-sharp fa-solid fa-star"/>{ratingCheck(spot.avgStarRating)}</div>
        <div className='user_spot_reviews'>{spot.numReviews} reviews</div>
        <div className='user_spot_address_city'>{spot.address}, {spot.city}, {spot.state}, {spot.country}</div>
        </div>
          <div className='spot_image'>

          <div className='current_user_spot_info'>
            <img className='user_spot_image' src={spot.previewImage} alt=''/>
          </div>

          <div className='current_spot_info'>
          <div className='user_spot_lat_lng'>{spot.lat}, {spot.lng}</div>

          <div className='user_spot_description'>{spot.description}</div>

          <div className='user_spot_price'>${spot.price} night</div>

          </div>
          {(user.id !== spot.ownerId) &&(
              <CreateBookingForm spotId={spotId}/>
          )}

          </div>
        </div>
        :<></>
      )
  }else{
  content = (
    spot?
  <div className='inner_content'>
    <h1 className='spot_detail'>{spot.name}</h1>

    <div className='spot_info'>
    <div className='user_spot_avg_Rating'><i className="fa-sharp fa-solid fa-star"/>{ratingCheck(spot.avgStarRating)}</div>
    <div className='user_spot_reviews'>{spot.numReviews} reviews</div>
    <div className='user_spot_address_city'>{spot.address}, {spot.city}, {spot.state}, {spot.country}</div>
    </div>
      <div className='spot_image'>

      <div className='current_user_spot_info'>
        <img className='user_spot_image' src={spot.previewImage} alt=''/>
      </div>

      <div className='current_spot_info'>
      <div className='user_spot_lat_lng'>{spot.lat}, {spot.lng}</div>

      <div className='user_spot_description'>{spot.description}</div>

      <div className='user_spot_price'>${spot.price} night</div>

      </div>
      </div>
    </div>
    :<></>
  )
  }
 }
return content
}


export default SpotDetailBrowser
