import React from 'react'
import './UserBookingCard.css'

function UserBookingCard({name,startDate, endDate,address,city,state,country,lat,lng,price}) {
  return (
    <div className='booking_card_container'>

      <div className='booking_card_info'>
        <h1>{name}</h1>
        <hr/>
        <div className='start_end'>
        <p>{startDate.split(' ')[0]} - {endDate.split(' ')[0]}</p>
        </div>

        <div className='booking_card_location'>
          <h5>{address}, {city}</h5>
          <h5>{state}, {country}</h5>
        </div>

        <div className='booking_card_lat_lng'>
          <h4><small>{lat}, {lng}</small></h4>
        </div>

        <div className='booking_card_price'>${price}</div>

      </div>

    </div>
  )
}

export default UserBookingCard
