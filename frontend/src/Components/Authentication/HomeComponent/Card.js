import React from 'react'
import { NavLink } from 'react-router-dom'
 import './Card.css'

function Card({src,place,rating,description,price}) {
  const ratingCheck = (rating) =>{
    if(rating === null){
      return rating = 'new'
    }else{
      return rating
    }
  }
  return (
    <div className='card_container'>
      <img className='card_image'src={src}/>
      <div className='card_info'>
        <h3>{place}</h3>
        <div className='card_rating'>
        <i className="fa-sharp fa-solid fa-star"/>
        <p>{ratingCheck(rating)}</p>
         </div>
      </div>
      <h5><small>{description}</small></h5>
         <div className='card_price'>${price} night</div>
    </div>
  )
}
export default Card
