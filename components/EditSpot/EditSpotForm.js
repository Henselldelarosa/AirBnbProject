import './EditSpotForm.css'
import * as spotsAction from '../../frontend/src/store/spots'
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
<form className='create_spot_form' onSubmit={handleSubmit}>
  <h1>Update Spot</h1>
  <ul>
    {errorMessages.map((error,id)=> <li key={id}>{error}</li>)}
  </ul>
  <input
  type='text'
  placeholder='Address'
  value={address}
  onChange={updateAddress}
  />

  <input
  type='text'
  placeholder='City'
  value={city}
  onChange={updateCity}
  />

<input
type='text'
placeholder='State'
value={state}
onChange={updateState}
/>

<input
type='text'
placeholder='Country'
value={country}
onChange={updateCountry}
/>

<input
type='number'
placeholder='Latitude'
value={lat}
onChange={updateLat}
/>

<input
type='number'
placeholder='Longtitude'
value={lng}
onChange={updateLng}
/>

<input
type='text'
placeholder='Name'
value={name}
onChange={updateName}
/>

<input
type='text'
placeholder='Description'
value={description}
onChange={updateDescription}
/>

<input
type='number'
placeholder='Price'
value={price}
onChange={updatePrice}
/>

  <input
  type='text'
  placeholder='Image'
  value={previewImage}
  onChange={updatePreviewImage}
  />

<button type='submit'>Update</button>
<button type='button' onClick={handleCancelClick}>Cancel</button>
</form>
)
}

export default EditSpotForm
