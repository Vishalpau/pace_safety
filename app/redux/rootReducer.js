/**
 * Combine all reducers in this file and export the combined reducers.
 */

 
 import { combineReducers } from 'redux-immutable';;
 

 
 import InitialDetailsReducer from './modules/initialDetails'
 import AuthReducer from './modules/authentication'
 import IncidentReducer from './modules/incident' 
 /**
  * Branching reducers to use one reducer for many components
  */

 
 /**
  * Merges the main reducer with the router state and dynamically injected reducers
  */
 
   const rootReducer = combineReducers({
     InitialDetailsReducer,
     AuthReducer,
     IncidentReducer
   });
   
   export default rootReducer;
 