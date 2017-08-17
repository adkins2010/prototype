import * as mapActionTypes from "./mapActionTypes";

// export function mapMarkerAction (mapOptions, streetOptions) {
//
//   return {
//     type: mapActionTypes.INIT_MAP,
//     mapOptions: mapOptions,
//     streetOptions: streetOptions
//   }
// }

export function loadMapAction(google, maps, map) {
  return {
    type: mapActionTypes.INIT_MAP,
    // loaded: true,
    maps: maps,
    google: google,
    map: map
  }
}


export function dropMarkerAction (map, latLng) {

  return {
    type: mapActionTypes.DROP_MARKER,
    map: map,
    latLng: latLng
  }
}
