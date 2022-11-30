import React from 'react'

import {useSelector} from 'react-redux'
// import OwnerDetailBrowser from '../OwnerDetail/OwnerDetailBrowser';

function SpotImageBrowser({spotId}) {

  const spot = useSelector(state => state.spots[spotId]);
  const images = spot.Images

  let imageContent;
  if(images){

    imageContent = (
      <div className='image_container'>
        <div className='image_detail'>

          {images && images.map((image)=>{
            return(
              <div className='all_images' key={image.id}>
                <div className='image_ur;'>{image.firstName}</div>
              </div>
            )

          })}

      </div>
      </div>
    )
  }
  return (


      imageContent

  )
}

export default SpotImageBrowser
