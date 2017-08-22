import * as Redux from 'redux'
// import mapReducerAlt from './mapReducerAlt';
import mapReducer from './mapReducer';
import addressReducer from "./addressReducer";

const rootReducer = Redux.combineReducers({
  // mapReducerAlt,
  addressReducer,
  mapReducer
});

export default rootReducer;
