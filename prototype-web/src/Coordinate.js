//
// function Coordinate(latitude, longitude) {
//   this.latitude = latitude;
//   this.longitude = longitude;
// }
//
// Coordinate.prototype.getLatitude = () => {
//   return this.latitude;
// };
//
// Coordinate.prototype.getLongitude = () => {
//   return this.longitude;
// };
//
// Coordinate.prototype.setLatitude = (latitude) => {
//   this.latitude = latitude;
// };
//
// Coordinate.prototype.setLongitude = (longitude) => {
//   this.longitude = longitude;
// };

export default class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
