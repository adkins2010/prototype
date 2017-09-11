import * as mapActionTypes from '../actions/mapActionTypes';
import * as icons from "react-pattern-library-icons";

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
    lat: 35.3301529,
    lng: -80.7325287
  },
  mapScript: null,
  streetViewControl: false,
  // viewportCoordinate: {lat: 35.3043098, lng: -80.76405469999997},
  mapOptions: {
    center: {lat: 35.3301529, lng: -80.7325287},
    zoom: 14,
    streetViewControl: false,
    scrollwheel: true
  },
  streetOptions: {
    position: {lat: 35.3043098, lng: -80.76405469999997},
    pov: {
      heading: 34,
      pitch: 10
    },
    scrollwheel: true
  },
  customIconsArr: [icons.RoadsideasstC, icons.RoadsideasstF, icons.RoadsideasstL, icons.TowtruktrakC, icons.TowtruktrakF, icons.TowtruktrakL, icons.TowtruktrkaltF, icons.TowtruktrkaltL],
  fillColorArr: ["#1666AF","#0096D6","#55C8E8","#254b6e","#104780","#0075c9","#00FFB7","#DE4C0D"],
  customIconsArrIndex: 0,
  fillColorArrIndex: 0
};


const mapReducer = (state = initialState, action) => {
  if (action === null || action === undefined) {
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
    case mapActionTypes.MAP_VIEWPORT:
      state = {
        ...state
      };
      if(action.streetViewControl) {
        let streetOptions = {
          position: action.viewportCoordinate,
          pov: {
            heading: 34,
              pitch: 10
          },
          scrollwheel: true
        }
        state.streetOptions = streetOptions;
      }
      // state.viewportCoordinate = action.viewportCoordinate;
      state.streetViewControl = action.streetViewControl;
      break;
    case mapActionTypes.CYCLE_ICON:
      state = {
        ...state
      };
      state.customIconsArrIndex = action.customIconsArrIndex;
      break;
    case mapActionTypes.CYCLE_COLOR:
      state = {
        ...state
      };
      state.fillColorArrIndex = action.fillColorArrIndex;
      break;
    default:
      break;
  }
  return state;
};
export default mapReducer;
