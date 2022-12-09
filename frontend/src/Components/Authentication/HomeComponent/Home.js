import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getAllSpots } from '../../../store/spots'
// import Banner from '../BannerComponent/Banner'
import Card from './Card'
// import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots))


useEffect(() => {
  dispatch(getAllSpots())
},[dispatch])

  return (
      <div className='card'>
        {spots && spots.map((spot) => {
          return(
            <div className='spot_detail' key={spot.id}>
              <div className='spot_image_content'>
                <NavLink className='card_link' to={`spots/${spot.id}`}>
                  <Card src={spot.previewImage}
                  place={spot.name}
                  rating={spot.avgRating}
                  description={spot.description}
                  price={spot.price}
                  />
                </NavLink>
              </div>

            </div>
          )
        })}

      </div>
  )
}

export default Home
