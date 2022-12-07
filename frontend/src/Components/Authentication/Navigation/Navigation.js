import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Navigation.css';
import HomeButton from './HomeButton'
import LoginButton from './LoginButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BasicMenu from './ProfileComponent/ProfileMenu';
function Navigation({ isLoaded }){

  return(
    <div className='header'>
      <img className='header_icon' src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt='' />
      <div className='search_bar'>
        <div className='search_bar_text'>Any where</div>
        <div className='search_bar_text'>Any week</div>
        <div className='search_bar_text2'> Add guests</div>
        <div className='search_icon'>
        <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className='profile_container'>
        <div className='air_bnb_your_home'>Airbnb your home</div>
          <div className='globe'>
          <i class="fa-solid fa-globe"></i>
        </div>
        <div className='profile'>
          <BasicMenu/>
        </div>
      </div>
    </div>
  )
  // const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <div className='header'>
  //     <img className='header_icon' src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt=''/>

  //       <div className='header_center'>
  //         <input type='text'/>
  //         <i class="fa-sharp fa-solid fa-magnifying-glass"/>
  //       {/* <NavLink className='spots_button' title='Spots'to='/spots'><HomeOutlinedIcon/></NavLink> */}
  //       {/* <NavLink className='link' to='/bookings/current'>See Your Bookings</NavLink> */}
  //       {/* <ProfileButton className='profile' user={sessionUser} /> */}
  //       </div>
  //       <div className='header_right'>
  //         <p>Airbnb your home</p>
  //         <i class="fa-light fa-globe"></i>
  //         <ProfileButton className='profile' user={sessionUser}/>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   sessionLinks = (
  //     <div className='header'>
  //       <img className='header_icon' src="https://www.citypng.com/public/uploads/small/31630073629n7z56al3asxk3azkyqehu2i6cnajcybom7ku66rccl1yopzxzns9nlttdp3rt3y3fqeyo9qgceiavu3gqnrg6z9oxynaxl0rvx8m.png" alt=''/>
  //       <div className='header_center'>
  //       <input type='text'/>
  //         <i class="fa-sharp fa-solid fa-magnifying-glass"/>
  //       </div>

  //       <div className='header_right'>

  //       </div>
  //       <p>Become a host</p>
  //       <i class="fa-light fa-globe"></i>
  //       <div className='nav_link'>
  //       <button>
  //       <NavLink className='link' to='/spots'>Spots</NavLink>
  //       </button>

  //       <button>
  //       <NavLink className='link' to="/signup">Sign Up</NavLink>
  //       </button>
  //      <LoginButton className='login'/>
  //       </div>
  //     </div>
  //   );
  // }

  // return (isLoaded && sessionLinks)
}

export default Navigation;
