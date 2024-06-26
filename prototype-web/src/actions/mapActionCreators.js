import * as mapActionTypes from "./mapActionTypes";

export function mapMarkerAction (mapOptions, streetOptions) {

  return {
    type: mapActionTypes.LOAD_MAP,
    mapOptions: mapOptions,
    streetOptions: streetOptions
  }
}

export function loadScriptAction(script) {
  return {
    type: mapActionTypes.LOAD_SCRIPT,
    mapScript: script
  }
}

export function loadMapAction(map,maps) {
  return {
    type: mapActionTypes.LOAD_MAP,
    map: map,
    maps:maps
  }
}

export function centerMapAction(mapCenterCoordinate) {

  return {
    type: mapActionTypes.MAP_CENTER,
    mapCenterCoordinate: mapCenterCoordinate
  }
}

export function viewportMapAction(streetViewControl, viewportCoordinate) {
  return {
    type: mapActionTypes.MAP_VIEWPORT,
    streetViewControl: streetViewControl,
    viewportCoordinate: viewportCoordinate
  }
}

export function cycleIconAction(customIconsArrIndex) {
  return {
    type: mapActionTypes.CYCLE_ICON,
    customIconsArrIndex: customIconsArrIndex
  }
}

export function cycleColorAction(fillColorArrIndex) {
  return {
    type: mapActionTypes.CYCLE_COLOR,
    fillColorArrIndex: fillColorArrIndex
  }
}

export function setMarkersAction(markers) {
  return {
    type: mapActionTypes.SET_MARKERS,
    markers: markers
  }
}

export function dropMarkerAction (map, latLng) {

  return {
    type: mapActionTypes.DROP_MARKER,
    map: map,
    latLng: latLng
  }
}
