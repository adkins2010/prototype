import * as mapActionTypes from "./mapActionTypes";

// export function mapMarkerAction (mapOptions, streetOptions) {
//
//   return {
//     type: mapActionTypes.INIT_MAP,
//     mapOptions: mapOptions,
//     streetOptions: streetOptions
//   }
// }

export function loadMapAction(google, map) {
  return {
    type: mapActionTypes.INIT_MAP,
    loaded: true,
    google: google,
    map: map
  }
}


export function dropMarkerAction (coordinate) {

  return {
    type: mapActionTypes.DROP_MARKER,
    coordinate: coordinate
  }
}
