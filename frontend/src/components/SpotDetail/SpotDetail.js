import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
//!!START SILENT
import { useSelector, useDispatch } from 'react-redux';
import * as spotsAction from '../../store/spots'
import BookingBrowser from '../BookingBrower';
import CreateBookingForm from '../CreateBooking/CreateBookingForm';

//!!END
//!!ADD
// import { useSelector } from 'react-redux';
//!!END_ADD
// import PokemonItems from './PokemonItems';
import EditSpotForm from '../EditSpot/EditSpotForm';
import './SpotDetail.css'
//import ItemForm from './ItemForm';

const SpotDetail = () => {
  const history = useHistory()
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();
  const [showEditSpotForm, setShowEditSpotForm] = useState(false);
  const [showBooking, setShowBooking] = useState(false)
  const [showCreateBookingForm, setShowCreateBookingForm] = useState(false)

  const user = useSelector(state=>state.session.user)

  useEffect(() => {
    dispatch(spotsAction.getSpotById(spotId));

    setShowEditSpotForm(false);

  }, [dispatch, spotId]);


const deleteASpot = (e)=>{
  e.preventDefault()
  if(spot.ownerId === user.id){
    dispatch(spotsAction.deleteSpot(spotId))
  }
  history.push('/spots')
}

  let content = null;

  if (showEditSpotForm) {
    content = (
      <EditSpotForm
        spot={spot}
        hideForm={() => setShowEditSpotForm(false)}
      />
    );
  }
  else if(showBooking){
    <CreateBookingForm
    spotId={spot.id}
    hideForm={() => setShowBooking(false)}
    />
  }
  else if (showCreateBookingForm){
    <CreateBookingForm
    />
  }
   else {
    content = (

      <div className="spot-detail-lists">
          <div className='edit_spot_content'>
         <img className='edit_spotImage' src={spot?.previewImage} alt=''/>
       </div>
       <div className='spot_addree'>{spot.address}</div>
    <div className='spot_city'>{spot.city}</div>
    <div className='spot_state'>{spot.state}</div>
    <div className='spot_country'>{spot.country}</div>
    <div className='spot_lat'>{spot.lat}</div>
    <div className='spot_lng'>{spot.lng}</div>
    <div className='spot_description'>{spot.description}</div>
    <div className='spot_price'><small>$</small>{spot.price}</div>
    <div className='spot_avgRating'>{spot.avgRating}</div>
    <CreateBookingForm spotId={spot.id}/>
    {/* <BookingBrowser/> */}
      </div>
    );
  }

  return (
    <div className="pokemon-detail">
        <div className='spot_button'>
        <div>
          <h1 className="bigger">{spot.name}</h1>
          <div className='spot_buttons'>
          {(!showEditSpotForm) && (
            <button className='edit_form_button' onClick={() => setShowEditSpotForm(true)}>Update</button>
            )}
            {(!showBooking) && (
           <button className='show_bookings' onClick ={() => setShowBooking(true)}>Create Booking</button>
              )}
              <button className='delete_button' onClick={deleteASpot}>Delete Spot</button>
          <button className='booking_button' > Create Booking</button>
          </div>
        </div>

     </div>
      <div className={`pokemon-detail-image-background`}>
      </div>
      {content}
    </div>
  );
};

export default SpotDetail;
