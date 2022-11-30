import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
//!!START SILENT
import { useSelector, useDispatch } from 'react-redux';
import * as spotsAction from '../../frontend/src/store/spots'
// import BookingBrowser from '../BookingBrower';
import CreateBookingForm from '../CreateBooking/CreateBookingForm';
import GetUserBookings from '../SpotBooking/GetSpotBookings';
import CurrentUserBooking from '../currentUserBooking/CurrentUserBooking';
import GetSpotsBookings from '../SpotBooking/GetSpotBookings';
import EditSpotForm from '../EditSpot/EditSpotForm';
import './SpotDetail.css'
import { deleteBooking } from '../../frontend/src/store/booking';

const SpotDetail = () => {
  const history = useHistory()
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const dispatch = useDispatch();
  const [showEditSpotForm, setShowEditSpotForm] = useState(false);
  const [showBooking, setShowBooking] = useState(false)
  const [showCreateBookingForm, setShowCreateBookingForm] = useState(false)
  const user = useSelector(state=>state.session.user)
  const bookings = useSelector(state=> Object.values(state.bookings))
  // useEffect(() => {
  //   dispatch(spotsAction.getSpotById(spotId));

  //   setShowEditSpotForm(false);

  // }, [dispatch,spotId]);

  const deleteASpot = async(e)=>{
    e.preventDefault()
    if(spot.ownerId === user.id){
        await dispatch(spotsAction.deleteSpot(spotId))
    }
    history.push('/spots')
  }

  const deleteABooking = async(e)=>{
    e.preventDefault()
    dispatch(deleteBooking())
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
   else if(spot){
    content = (
    <main>

      <div className={`spot-detail-image-background`}>
        <div className='edit_spot_content'>
          {/* <div>{spot.previewImage}</div> */}

          <h1 className="bigger">{spot.name}</h1>
       <img className='spot_image' src={spot.previewImage} alt={spot.previewImage}/>
    <div className="spot-detail-lists">
     <div className='spot_addree'>{spot.address}</div>
  <div className='spot_city'>{spot.city}</div>
  <div className='spot_state'>{spot.state}</div>
  <div className='spot_country'>{spot.country}</div>
  <div className='spot_lat'>{spot.lat}</div>
  <div className='spot_lng'>{spot.lng}</div>
  <div className='spot_description'>{spot.description}</div>
  <div className='spot_price'><small>$</small>{spot.price}</div>
  <div className='spot_avgRating'>{spot.avgRating}</div>
     </div>
       <div className='spot_button'>
        <div>

          <div className='spot_buttons'>
       
          {(!showEditSpotForm) && (
            <button className='edit_form_button' onClick={() => setShowEditSpotForm(true)}>Update</button>
            )}
            {(!showBooking) && (
           <button className='show_bookings' onClick ={() => setShowBooking(true)}>See Bookings</button>
           )}
           <button onClick={deleteABooking}>Delete Booking</button>
              <button className='delete_button' onClick={deleteASpot}>Delete Spot</button>
          {/* <button className='booking_button' > Create Booking</button> */}
          </div>
        </div>
     </div>
      </div>
  <CreateBookingForm spotId={spot.id}/>
    </div>
    </main>

    )};


  return (
    <div className="pokemon-detail">

      {content}

      <div><GetSpotsBookings/></div>
    </div>
  );
};

export default SpotDetail;
