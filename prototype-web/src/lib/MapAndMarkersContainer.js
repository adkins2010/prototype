export default class MapAndMarkersContainer {
  markers;
  constructor(map){
    this.map = map;
    this.markers = [];
  }

  pushMarker(marker) {
    this.markers.push(marker);
  }

  get markers() {
    return this.markers;
  }

  set map(map) {
    this.map = map;
  }
  get map() {
    return this.map;
  }
}
