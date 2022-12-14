import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './ProfileMenu.css'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionAction from '../../../../store/session'


export default function BasicMenu({user}) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (e) => {
    e.preventDefault();
    handleClose()
    dispatch(sessionAction.logout());
    history.push('/')
  };

  const createSpot = (e) =>{
    e.preventDefault()
    handleClose()
    history.push('/spots/create')
  }

  const seeBookings = (e) =>{
    e.preventDefault()
    handleClose()
    history.push('/bookings/current')
  }

  return (
    <div>
      {/* <button */}
      <div
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='profile_button'
      >
        <div className='menu_bars'>
        <i className="fa-solid fa-bars"/>
        </div>
        <div className='avatar'>
        <i className="fa-solid fa-circle-user"/>
        </div>
        </div>
      {/* </button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{'.MuiPaper-root':{
          borderRadius:'1rem',
          minWidth:'200px',
          // marginTop:'1rem',
          boxShadow:'0 1px 2px rgb(0 0 0 /8%), 0 4px 12px rgb(0 0 0 / 5%)'}}}
      >
        {/* <MenuItem className='menu_item1' onClick={handleClose}>Messages</MenuItem> */}
        <MenuItem className='menu_item1' onClick={seeBookings}>See Your Bookings</MenuItem>
        {/* <MenuItem className='menu_item1' onClick={handleClose}>See Your Spots</MenuItem> */}
        {/* <MenuItem className='menu_item1' onClick={handleClose}>See Your Spots</MenuItem> */}
        <hr/>
        <MenuItem className='menu_item2' onClick={createSpot}>Create Spot</MenuItem>
        {/* <MenuItem className='menu_item2' onClick={handleClose}>Host an Experience</MenuItem> */}
        {/* <MenuItem className='menu_item2' onClick={handleClose}>Account</MenuItem> */}
        <hr/>
        {/* <MenuItem className='menu_item2' onClick={handleClose}>help</MenuItem> */}
        <MenuItem className='menu_item2' onClick={logout}>Log out</MenuItem>
      </Menu>
    </div>
  );
}
