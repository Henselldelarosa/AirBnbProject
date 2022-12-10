import './EditASpotForm.css'
import * as spotsAction from '../../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'

const EditSpotForm = ({hideForm}) =>{
  let {spotId} = useParams()
const dispatch = useDispatch()
const history = useHistory()
// const user = useSelector(state => state.session.user)
const spot = useSelector(state=>state.spots[spotId])

const [errorMessages, setErrorMessages] = useState([])
const [address, setAddress] = useState(spot.address)
const [city, setCity] = useState(spot.city)
const [state, setState] = useState(spot.state)
const [country, setCountry] = useState(spot.country)
const [lat, setLat] = useState(spot.lat)
const [lng, setLng] = useState(spot.lng)
const [name, setName] = useState(spot.name)
const [description, setDescription] = useState(spot.description)
const [price, setPrice] = useState(spot.price)
const [previewImage, setPreviewImage] = useState(spot.previewImage)


const updateAddress = (e)=> setAddress(e.target.value)
const updateCity = (e)=> setCity(e.target.value)
const updateState = (e)=> setState(e.target.value)
const updateCountry = (e)=> setCountry(e.target.value)
const updateLat = (e)=> setLat(e.target.value)
const updateLng = (e)=> setLng(e.target.value)
const updateName = (e)=> setName(e.target.value)
const updateDescription = (e)=> setDescription(e.target.value)
const updatePrice = (e)=> setPrice(e.target.value)
const updatePreviewImage = (e)=> setPreviewImage(e.target.value)

const handleSubmit= async(e)=>{
  e.preventDefault()

  const payload ={
    ...spot,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage
  }



  // let createSpot;

  try{
  await dispatch(spotsAction.updateSpot(payload))
    setErrorMessages([])
    history.push(`/spots/${spot.id}`)
  }catch(e){
    const response = await e.json()
    setErrorMessages(response.errors)
  }
  hideForm()
}

const handleCancelClick = (e) => {
  e.preventDefault();
  hideForm();
};
  return (
    <div className='update_spot_input_info'>
<form className='edit_spot_form' onSubmit={handleSubmit}>
  <ul>
    {errorMessages.map((error,id)=> <li key={id}>{error}</li>)}
  </ul>

  <div className='spot_for_update_info'>
    <h1 className='update_spot_h1'>Update {spot.name}</h1>
  <img className='update_spot_image'src={spot.previewImage} alt=''/>
  </div>

  <div className='update_address'>Address</div>
  <input
  type='text'
  size='30'
  placeholder='Address'
  value={address}
  onChange={updateAddress}
  />

<div className='update_city'>City</div>
  <input
  type='text'
  size='30'
  placeholder='City'
  value={city}
  onChange={updateCity}
  />

<div className='update_state'>State</div>
<input
type='text'
size='30'
placeholder='State'
value={state}
onChange={updateState}
/>

<div className='update_country'>Country</div>
<input
type='text'
size='30'
placeholder='Country'
value={country}
onChange={updateCountry}
/>

<div className='update_lat'>Latitude</div>
<input
type='number'
style={{width:'251px'}}
placeholder='Latitude'
value={lat}
onChange={updateLat}
/>

<div className='update_lng'>Longtitude</div>
<input
type='number'
style={{width:'251px'}}
placeholder='Longtitude'
value={lng}
onChange={updateLng}
/>

<div className='update_name'>Name</div>
<input
type='text'
size='30'
placeholder='Name'
value={name}
onChange={updateName}
/>

<div className='update_description'>Description</div>
<input
type='text'
placeholder='Description'
size='30'
value={description}
onChange={updateDescription}
/>

<div className='update_price'>Price</div>
<input
type='number'
style={{width:'251px'}}
placeholder='Price'
value={price}
onChange={updatePrice}
/>

<div className='update_previewImage'>Image</div>
<input
type='text'
size='30'
placeholder='Image'
value={previewImage}
onChange={updatePreviewImage}
/>

<div className='update_div'>
<button className='update_spot_button'type='submit'>Update</button>
</div>

<div className='cancel_div'>
<button className='cancel_update_button'type='button' onClick={handleCancelClick}>Cancel</button>
</div>
</form>
    </div>
)
}

export default EditSpotForm
