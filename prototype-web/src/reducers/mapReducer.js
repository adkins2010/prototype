import * as mapActionTypes from '../actions/mapActionTypes';
import * as icons from 'react-pattern-library-icons';

const initialState = {
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: `Taiwan`,
    defaultAnimation: 2,
  }],
  apiKey: "AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY",
  map: null
};


const mapReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case mapActionTypes.LOAD_MAP:
      state = {
        ...state,
        map: action.map
      };
      break;
    case mapActionTypes.SET_MARKERS:
      state = {
        ...state,
        markers: action.markers
      };
    default:
      break;
  }
  return state;
};
export default mapReducer;
