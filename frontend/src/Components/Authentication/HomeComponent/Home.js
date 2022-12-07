import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllSpots } from '../../../store/spots'
import Banner from '../BannerComponent/Banner'
import './Home.css'

function Home() {
  const spots = useSelector(state => Object.values(state.spots))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(()=>{
    dispatch(getAllSpots())
  },[dispatch])
  return (
    <div>
      Home
      <Banner/>
    </div>
  )
}

export default Home
