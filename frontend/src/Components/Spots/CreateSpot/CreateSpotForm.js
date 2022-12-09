import './CreateSpotForm.css'
import React, {useState} from "react"
import { useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addSpot } from '../../../store/spots'

function CreateSpotForm() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const history = useHistory()

  //!State
  const [errorMessages, setErrorMessages] = useState([])
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
  }

   }

  const handleCancelClick = (e) => {
    e.preventDefault();
    //!!START SILENT
     setErrorMessages([]);
    //!!END
    history.push('/')
    //  hideForm();
  };

  return(
    <div className='create_spot_body'>
  <form className='create_spot_form' onSubmit={handleSubmit}>
  <img className='login_logo'src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt=''/>
    <h1>Create Spot</h1>
    <ul>
      {errorMessages.map((error,id)=> <li key={id}>{error}</li>)}
    </ul>
    <div className='address'>Address</div>
    <input
    type='text'
    placeholder='Address'
    value={address}
    onChange={updateAddress}
    />
    <div className='city'>City</div>
    <input
    type='text'
    placeholder='City'

    value={city}
    onChange={updateCity}
    />
<div className='state'>State</div>
  <input
  type='text'
  placeholder='State'

  value={state}
  onChange={updateState}
  />
<div className='country'>Country</div>
  <input
  type='text'
  placeholder='Country'

  value={country}
  onChange={updateCountry}
  />
<div className='lat'>Latitude</div>
  <input
  type='number'
  placeholder='Latitude'

  value={lat}
  onChange={updateLat}
  />
<div className='lng'>Longtitude</div>
  <input
  type='number'
  placeholder='Longtitude'

  value={lng}
  onChange={updateLng}
  />
<div className='name'>Name</div>
  <input
  type='text'
  placeholder='Name'

  value={name}
  onChange={updateName}
  />
<div className='description'>Description</div>
  <input
  type='text'
  placeholder='Description'

  value={description}
  onChange={updateDescription}
  />
<div className='price'>Price</div>
  <input
  type='number'
  placeholder='Price'

  value={price}
  onChange={updatePrice}
  />
<div className='previewImage'>Preview image</div>
    <input
    type='text'
    placeholder='Image'

    value={previewImage}
    onChange={updatePreviewImage}
    />

  <button className='create_spot_button'type='submit'>Create new Spot</button>
  <button className='cancel_button' type='button' onClick={handleCancelClick}>Cancel</button>
  </form>
    </div>
  )

  }

export default CreateSpotForm
