import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import HomeButton from './HomeButton'
import LoginButton from './LoginButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='header'>

        <div className='nav_link'>
        <HomeButton/>
        <NavLink className='link' to='/spots'><HomeOutlinedIcon/></NavLink>
        <NavLink className='link' to='/spots/create'> Create Spot</NavLink>
        <NavLink className='link' to='/bookings/current'>See Your Bookings</NavLink>
        <ProfileButton className='profile' user={sessionUser} />

        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='header'>
        <div className='nav_link'>

        <HomeButton/>

        <button>
        <NavLink className='link' to='/spots'>Spots</NavLink>
        </button>

        <button>
        <NavLink className='link' to="/signup">Sign Up</NavLink>
        </button>
       <LoginButton className='login'/>
        </div>
      </div>
    );
  }

  return (isLoaded && sessionLinks)
}

export default Navigation;
