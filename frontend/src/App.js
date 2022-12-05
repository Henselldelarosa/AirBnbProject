// frontend/src/App.js
//react and redux imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
//actions
import * as sessionActions from "./store/session";
import * as spotAction from './store/spots'

//components
// import Navigation from "../../components/Navigation";
// import LoginFormPage from "../../components/LoginFormPage";
// import SignupFormPage from "../../components/SignupFormPage";
// import Home from "../../components/HomeComponent/Home";
// import SpotBrowser from "./components/SpotComponent/SpotBrowser";
// import CreateSpotForm from "./components/CreatSpot/CreateSpotForm";
// import SpotDetail from "./components/SpotDetail/SpotDetail";
// import CurrentUserBooking from "./components/currentUserBooking/CurrentUserBooking";
import Navigation from "./Components/Authentication/Navigation/Navigation";
import LoginForm from './Components/Authentication/LoginFormPage/LoginForm'
import SignupForm from './Components/Authentication/SignupFormPage/SignupForm'
import GetAllSpots from "./Components/Spots/GetSpots/GetAllSpots";
// import GetUserSpots from './Components/Spots/UserSpots/GetUserSpots'
import SpotDetailBrowser from "./Components/Spots/SpotDetail/SpotDetailBrowser";
import CreateSpotForm from "./Components/Spots/CreateSpot/CreateSpotForm";
import UserBookings from "./Components/Bookings/GetUserBookings/UserBookings";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotAction.getAllSpots())

  }, [dispatch]);
let h = 'h'
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path='/Login'>
            <LoginForm/>
          </Route>

          <Route path='/signup'>
            <SignupForm/>
          </Route>
          {/* <Route  exact path ='/spots/current'>
            <GetUserSpots/>
          </Route> */}
          <Route exact path='/bookings/current'>
            <UserBookings/>
          </Route>


          <Route exact path='/spots/create'>
            <CreateSpotForm/>
          </Route>

          <Route exact path='/spots/:spotId'>
            <SpotDetailBrowser/>
          </Route>

          <Route exact path='/spots'>
            <GetAllSpots/>
          </Route>



          {/* <Route exact path ='/'>
            <Home/>
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>



          <Route path="/signup">
            <SignupFormPage />
          </Route>

          //  <Route exact path='/spots/create'>
          //   <CreateSpotForm/>
          // </Route>

          {/* <Route  path='/spots/:spotId'>
            <SpotDetail/>
          </Route> */}

          {/* <Route exact path='/spots'>
            <SpotBrowser/>
          </Route> */}

          {/* <Route exact path='/bookings/current'>
            <CurrentUserBooking/>
          </Route> */}

          {/* <Route exact path='/spots/:spotId'>
            <SpotDetail/>
          </Route> */}

          {/* <Route exact path='spots/:spotId/edit'>
            <EditSpotForm/>
          </Route> */}
          {/* <Route exact path='/spots/:spotId/bookings'>
            <BookingBrowser/>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
