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
