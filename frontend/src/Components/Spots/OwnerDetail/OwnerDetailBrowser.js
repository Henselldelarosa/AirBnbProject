import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {getSpotById} from '../../../store/spots'

function OwnerDetailBrowser() {
  const {spotId} = useParams()
  const spot = useSelector(state => state.spots[spotId]);
  const owner = spot.Owner


  let ownerContent;
if(owner){

    <div className='owner_conteiner'>

      <div className='owner_detail'>
        <div className='firstName'>{owner.firstName}</div>
        <div className='lastName'>{owner.lastName}</div>
      </div>

    </div>
}
  return (

    <div>
      {ownerContent}
    </div>
  )
}

export default OwnerDetailBrowser
