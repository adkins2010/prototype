
// function Coordinate(lat, lng) {
//   this.lat = lat;
//   this.lng = lng;
// }
//
// Coordinate.prototype.getLatitude = () => {
//   return this.lat;
// };
//
// Coordinate.prototype.getLongitude = () => {
//   return this.lng;
// };
//
// Coordinate.prototype.setLatitude = (lat) => {
//   this.lat = lat;
// };
//
// Coordinate.prototype.setLongitude = (lng) => {
//   this.lng = lng;
// };

export default class Coordinate {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
