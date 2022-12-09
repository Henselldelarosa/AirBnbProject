// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../../store/session';
// import {useHistory} from 'react-router-dom'
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import CreateSpotForm from "../../Spots/CreateSpot/CreateSpotForm";

// function ProfileButton({ user }) {
//   const history= useHistory()
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     history.push('/')
//   };

//   const createSpot = (e) =>{
//     e.preventDefault()
//     history.push('/spots/create')
//   }

//   return (
//     <>
//     <i class="fa-regular fa-circle-user" onClick={openMenu}/>
//       {showMenu && (
//         <div className="profile-dropdown">
//           <div>{user.username}</div>
//           <div>{user.email}</div>
//           <div>
//             <button onClick={createSpot}>Create Spot</button>
//             <button onClick={logout}>Log Out</button>
//          </div>

//         </div>
//       )}
//     </>
//   );
// }

// export default ProfileButton;
