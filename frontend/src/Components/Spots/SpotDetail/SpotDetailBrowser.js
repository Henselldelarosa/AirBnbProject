import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useHistory, useParams } from 'react-router-dom'
import { getSpotById, deleteSpot } from '../../../store/spots'
import './SpotDetailBrowser.css'
import EditASpotForm from '../../Spots/EditSpot/EditASpotForm'
import StarIcon from '@mui/icons-material/Star';
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
  // const images = spot.Images

// const [showImage,setShowImage] = useState(true)
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

// if(!showEditSpotForm){
//   <EditSpotForm
//         spot={spot}
//         hideForm={() => setShowEditSpotForm(true)}
//       />
// }
let content =null

if (showEditSpotForm) {
  content = (
    <EditASpotForm
      spot={spot}
      hideForm={() => setShowEditSpotForm(false)}
    />
  );
}else{

  content = (
      spot?
    <div>

      <h1 className='spot_detail'>Spot Detail</h1>
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
        <div className='spot_image'>

        <div className='current_user_spot_info'>
          <img className='user_spot_image' src={spot.previewImage} alt=''/>
          {/* {spot.Images && spot.Images.map((image) => {
            return(
              <div key={image.id}>

              <img className='spot_detail_image'src={image.url} alt=''/>
              </div>
              )
            })} */}
        </div>
        <div className='current_spot_info'>
        <div className='user_spot_name'>{spot.name}</div>


        <div className='user_spot_address_city'>{spot.address}, {spot.city}</div>

        <div className='user_spot_state'>{spot.state}, {spot.country}</div>

        <div className='user_spot_lat_lng'>{spot.lat}, {spot.lng}</div>

        <div className='user_spot_description'>{spot.description}</div>

        <div className='user_spot_price'><small>$</small><big>{spot.price}</big></div>

        </div>
        <div className='user_spot_reviews'>Reviews: {spot.numReviews}</div>
        <div className='user_spot_avg_Rating'> <small><StarIcon/></small> <big> {spot.avgStarRating}</big></div>
            <CreateBookingForm spotId={spotId}/>

        </div>

        {/* <div className='owne_info'>
          <h3 >Owened by: {spot.Owner && spot.Owner.map((owner)=>{
            <div key={owner.id}>
              {owner.firstName} {owner.lastName}
            </div>
          })}  </h3> */}
        {/* </div> */}
      </div>
      :<></>
    )
  // }



}
return content
}


export default SpotDetailBrowser
