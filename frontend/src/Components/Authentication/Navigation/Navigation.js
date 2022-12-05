import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Navigation.css';
import HomeButton from './HomeButton'
import LoginButton from './LoginButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (!sessionUser) {
      sessionLinks=(
     <div className='header'>
        <img className='header_icon'
        src='https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png'
        alt=''
        />

        <div className='header_center'>
          <input type='text'/>
          <SearchIcon/>

        </div>
      <div className='header_right'>
        <p>Become a host</p>
        <LanguageIcon/>
        <MenuIcon/>
        <Avatar/>

      </div>
      </div>
      )
    }else{
      sessionLinks = (
      <div className='header'>
            <div className='nav_link'>
            <HomeButton/>
            <NavLink className='spots_button' title='Spots'to='/spots'><HomeOutlinedIcon/></NavLink>
            <NavLink className='link' to='/bookings/current'>See Your Bookings</NavLink>
            <ProfileButton className='profile' user={sessionUser} />
            </div>
          </div>
          )}
  //     sessionLinks = (
  //       <div className='header'>

  //         <div className='nav_link'>
  //         <HomeButton/>
  //         <NavLink className='spots_button' title='Spots'to='/spots'><HomeOutlinedIcon/></NavLink>
  //         <NavLink className='link' to='/bookings/current'>See Your Bookings</NavLink>
  //         <ProfileButton className='profile' user={sessionUser} />

  //         </div>
  //       </div>
  //     );
  //   } else {
  //     sessionLinks = (
  //       <div className='header'>
  //         <div className='nav_link'>

  //         <HomeButton/>

  //         <button>
  //         <NavLink className='link' to='/spots'>Spots</NavLink>
  //         </button>

  //         <button>
  //         <NavLink className='link' to="/signup">Sign Up</NavLink>
  //         </button>
  //        <LoginButton className='login'/>
  //         </div>
  //       </div>
  //     );
  //   }

     return (isLoaded && sessionLinks)


  //   let sessionLinks;
  //   if (sessionUser) {
  //     sessionLinks = (
  //       <div className='header'>

  //         <div className='nav_link'>
  //         <HomeButton/>
  //         <NavLink className='spots_button' title='Spots'to='/spots'><HomeOutlinedIcon/></NavLink>
  //         <NavLink className='link' to='/bookings/current'>See Your Bookings</NavLink>
  //         <ProfileButton className='profile' user={sessionUser} />

  //         </div>
  //       </div>
  //     );
  //   } else {
  //     sessionLinks = (
  //       <div className='header'>
  //         <div className='nav_link'>

  //         <HomeButton/>

  //         <button>
  //         <NavLink className='link' to='/spots'>Spots</NavLink>
  //         </button>

  //         <button>
  //         <NavLink className='link' to="/signup">Sign Up</NavLink>
  //         </button>
  //        <LoginButton className='login'/>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (isLoaded && sessionLinks)
  }

  export default Navigation;
