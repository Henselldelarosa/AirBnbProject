// frontend/src/App.js
//react and redux imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch,useParams } from "react-router-dom";
//actions
import * as sessionActions from "./store/session";
import * as spotAction from './store/spots'
import * as bookingAction from './store/bookings'
//components
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotBrowser from "./components/SpotComponent/SpotBrowser";
import CreateSpotForm from "./components/CreatSpot/CreateSpotForm";
import SpotDetail from "./components/SpotDetail/SpotDetail";
import BookingBrowser from "./components/BookingBrower";
import CreateBookingForm from "./components/CreateBooking/CreateBookingForm";
// import EditSpotForm from "./components/EditSpot/EditSpotForm";
//rfce
function App() {
  // const {spotId} = useParams()
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotAction.getAllSpots())
  //  dispatch(bookingAction.getCurrentSpotBooking(spotId))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/spots/create'>
            <CreateSpotForm/>
          </Route>

          <Route exact path='/spots/:spotId'>
            <SpotDetail/>
          </Route>

          <Route exact path='/spots'>
            <SpotBrowser/>
          </Route>

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
