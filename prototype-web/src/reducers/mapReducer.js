import * as mapActionTypes from '../actions/mapActionTypes';

const initialState = {
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: ``,
    defaultAnimation: 2,
  }],
  apiKey: "AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY",
  map: null,
  maps: null,
  mapCenterCoordinate: {
    lat : 35.3301529,
    lng : -80.7325287
  },
  mapScript: null,
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
