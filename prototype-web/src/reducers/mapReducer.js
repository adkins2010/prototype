import Coordinate from '../Coordinate'
import * as mapActionTypes from '../actions/mapActionTypes';

const initialState = {
  apiKey: "AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY",
  libraries: ["places"],
  version: '3.22',
};

const mapReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case mapActionTypes.INIT_MAP:
      break;
    case mapActionTypes.DROP_MARKER:
      state = {
        ...state,
        mapCenter: new Coordinate(action.latitude, action.longitude)
      };
      break;
    default:
      break;
  }
  return state;
};

export default mapReducer;
