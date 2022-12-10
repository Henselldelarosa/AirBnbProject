import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import BasicMenu from './ProfileComponent/ProfileMenu';
import BasicLoginMenu from './LoginProfileButton/LoginProfile';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;

  if(sessionUser){
    sessionLinks= (

<div className='header'>
      <NavLink className="home_image"to='/'>
      <img title='Home' className='header_icon' src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt='' />
      </NavLink>

      <div className='profile_container'>

        <div className='air_bnb_your_home'>

          Airbnb your home
          </div>

          <div className='globe'>

          <i title='See your bookings'className="fa-solid fa-globe"></i>

        </div>

        <div className='profile'>
          <BasicMenu user={sessionUser}/>
        </div>
      </div>
    </div>
    )
  }else{
    sessionLinks= (
      <div className='header'>
            <NavLink to='/'>
            <img className='header_icon' src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt='' />
            </NavLink>
            <div className='profile_container'>
              <div className='air_bnb_your_home'>
                Airbnb your home
                </div>
                <div className='signout_globe'>
                <i className="fa-solid fa-globe"></i>
              </div>
              <div className='profile'>
                <BasicLoginMenu/>
              </div>
            </div>
          </div>
          )
  }
  return (isLoaded && sessionLinks)
}

export default Navigation;
