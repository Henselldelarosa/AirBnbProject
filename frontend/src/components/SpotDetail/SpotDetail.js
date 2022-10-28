import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import * as spotsAction from "../../store/spots"

const SpotDetail = () =>{
  let {spotId} = useParams
  const user = useSelector(state => state.session.user)
  const spots = useSelector(state => Object.values(state.spots))
  const spot = spots[spotId]
  const dispatch = useDispatch()

  const history = useHistory();
  // const [showEditSpotForm, setShowEditSpotForm] = useState(false)
  // const [showAddForm, setShowAddForm] = useState(false)


  useEffect(()=>{
    dispatch(spotsAction.getSpotById(spotId))
  },[dispatch,spotId])


  const deleteSpot = (e)=>{
    e.preventDefault()

    if(spot.ownerId === user.id){
      dispatch(spotsAction.deleteSpot(spot.id))
      history.push('/spots')
    }
  }

  let spotForm = (
    <div className='spot_detail'>
      <h1 className = 'spot_header'>{spot.name}</h1>
      {(spot.ownerId === user.id) &&
      (
        <div className="spot_button">
          <button className="delete_spot_button" onClick={deleteSpot}> Delete Spot</button>
        </div>
      )}
    </div>
  )
}

export default SpotDetail
