import './CreateSpotForm.css'
import React, {useState, useEffect} from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addSpot } from '../../store/spots'

const CreateSpotForm = ({spot}) => {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)

//!State
const [errorMessages, setErrorMessages] = useState([])
const history = useHistory()
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')
const [country, setCountry] = useState('')
const [lat, setLat] = useState('')
const [lng, setLng] = useState('')
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [previewImage, setPreviewImage] = useState('')

//!updates
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


const handleSubmit = async (e)=>{
  e.preventDefault()
  setErrorMessages([])

  const payload = {
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  }



  let createSpot;
try{

  createSpot = await dispatch(addSpot(payload))
  setErrorMessages([])
  history.push(`/spots/${createSpot.id}`)
}catch(e){
  const response = await e.json()
  setErrorMessages(response.errors)
  console.log(response)
}


  // if(createSpot){
  //   setErrorMessages([])
  //   history.push(`/spots/${createSpot.id}`)

  // }
 }

const handleCancelClick = (e) => {
  e.preventDefault();
  //!!START SILENT
  setErrorMessages([]);
  //!!END
  // spot();
};

return(
<form className='create_spot_form' onSubmit={handleSubmit}>
  <h1>Create Spot</h1>
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

<button type='submit'>Create new Spot</button>
<button type='button' onClick={handleCancelClick}>Cancel</button>
</form>
)

}



export default CreateSpotForm
