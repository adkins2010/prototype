import MapAndMarkersContainer from "./MapAndMarkersContainer";

export const loadMap = function (mapCenterCoordinate, mapDiv) {
  // eslint-disable-next-line no-undef
  var map = new google.maps.Map(mapDiv, {
    zoom: 15,
    center: mapCenterCoordinate
  });

  // eslint-disable-next-line no-undef
  var marker = new google.maps.Marker({
    position: mapCenterCoordinate,
    map: map,
  });
  return new MapAndMarkersContainer(map).pushMarker(marker);
}
// eslint-disable-next-line no-undef
google.maps.event.addDomListener(window, 'load', loadMap);
