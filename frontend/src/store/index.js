import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';


/* Create a rootReducer that calls
combineReducers and pass in an empty object for now.
*/
const rootReducer = combineReducers({
  session:sessionReducer
});



let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//Next, create a configureStore function that takes in an
//optional preloadedState. Return createStore invoked
//with the rootReducer, the preloadedState, and the enhancer.
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
