import * as mapActionTypes from '../actions/mapActionTypes';
import * as icons from 'react-pattern-library-icons';

const initialState = {
  apiKey: "AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY",
  libraries: ["places"],
  // version: '3.22',
  mapScript: null,
  mapCenterCoordinate: {
    lat : 35.3301529,
    lng : -80.7325287
  },
  map: null,
  maps: null,
  markers: []
};

const mapReducerAlt = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case mapActionTypes.LOAD_SCRIPT:
      state = {
        ...state
      };
      state.mapScript = action.mapScript;
      break;
    case mapActionTypes.MAP_CENTER:
      state = {
        ...state
      };
      state.mapCenterCoordinate = action.mapCenterCoordinate;
      break;
    case mapActionTypes.LOAD_MAP:
      state = {
        ...state,
        map: action.map,
        maps: action.maps
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
            fillColor: "#c682be",
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

export default mapReducerAlt;
