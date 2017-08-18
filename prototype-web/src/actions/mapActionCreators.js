import * as mapActionTypes from "./mapActionTypes";

// export function mapMarkerAction (mapOptions, streetOptions) {
//
//   return {
//     type: mapActionTypes.INIT_MAP,
//     mapOptions: mapOptions,
//     streetOptions: streetOptions
//   }
// }

export function loadMapAction(map,maps) {
  return {
    type: mapActionTypes.INIT_MAP,
    map: map,
    maps:maps
  }
}


export function dropMarkerAction (map, latLng) {

  return {
    type: mapActionTypes.DROP_MARKER,
    map: map,
    latLng: latLng
  }
}
