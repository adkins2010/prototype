import Coordinate from '../Coordinate'
import * as mapActionTypes from '../actions/mapActionTypes';

const initialState = {
  apiKey: "AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY",
  libraries: ["places"],
  version: '3.22',
  google: null,
  map: null,
  maps: null,
  markers: []
};

const mapReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case mapActionTypes.INIT_MAP:
      state = {
        ...state,
        google: action.google,
        maps: action.maps,
        map: action.map
      };
      break;
    case mapActionTypes.DROP_MARKER:
      state = {
        ...state,
        map: action.map,
        maps: action.maps,
      };
      let marker = new state.maps.Marker(
        {
          position: action.latLng,
          map: state.map,
          icon: {
            path: icons.FemaleC,
            fillColor: "#254B6E",
            anchor: new state.maps.Point(0,0),
            strokeWeight: 0,
            scale: .6
          }
        }
      );
      state.markers.push(marker);
      break;
    default:
      break;
  }
  return state;
};

export default mapReducer;
