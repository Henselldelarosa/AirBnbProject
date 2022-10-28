// frontend/src/App.js
//react and redux imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
//actions
import * as sessionActions from "./store/session";
import * as spotAction from './store/spots'
//components
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotBrowser from "./components/SpotComponent/SpotBrowser";
import EditSpotForm from './components/EditSpot/EditSpotForm'
import CreateSpotForm from "./components/CreatSpot/CreateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(spotAction.getAllSpots())
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

          <Route exact path='/spots'>
            <SpotBrowser/>
          </Route>

          <Route>
            <EditSpotForm/>
          </Route>

          <Route>
            <CreateSpotForm/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
