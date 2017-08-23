import React, {Component} from 'react';
import { GoogleMap } from 'react-pattern-library';
import { mapMarkerAction } from "../../actions/mapActionCreators";
import * as icons from 'react-pattern-library-icons';
import '../style/Map.css'

export class MapAlt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customIconsArr: [icons.RoadsideasstC, icons.RoadsideasstF, icons.RoadsideasstL, icons.TowtruktrakC, icons.TowtruktrakF, icons.TowtruktrakL, icons.TowtruktrkaltF, icons.TowtruktrkaltL],
      towTruckIconsArr: [icons.TowtruktrakC, icons.TowtruktrakF, icons.TowtruktrakL, icons.TowtruktrkaltF, icons.TowtruktrkaltL],
      carIconsArr: [icons.RoadsideasstC, icons.RoadsideasstF, icons.RoadsideasstL],
      customIconsArrIndex: 0,
      fillColorArr: ["#1666AF","#0096D6","#55C8E8","#254b6e","#104780","#0075c9","#00FFB7","#DE4C0D"],
      fillColorArrIndex: 0,
      //somehow, the coordinates need to be updated depending on the user.
      mapOptions: {
        center: {
          // lat: 35.30636737274465,
          // lng: -80.76664034949033
          lat: props.mapCenterCoordinate.lat,
          lng: props.mapCenterCoordinate.lng
        },
        zoom: 14,
        streetViewControl: true,
        scrollwheel: true
      },
      streetOptions: {
        position: {
          // lat: 35.3043098,
          // lng: -80.76405469999997
          lat: props.streetViewCoordinate.lat,
          lng: props.streetViewCoordinate.lng
        },
        pov: {
          heading: 34,
            pitch: 10
        },
        scrollwheel: true
      }
    };
    // this.dropMapMarker = this.dropMapMarker.bind(this);
    this.cycleColor = this.cycleColor.bind(this);
    this.cycleIcon = this.cycleIcon.bind(this);
    this.dropMapMarker = this.dropMapMarker.bind(this);
    this.fullWidth = this.fullWidth.bind(this);
  }

  cycleIcon() {
      this.setState({customIconsArrIndex: (this.state.customIconsArrIndex+1) % this.state.customIconsArr.length});
      return this.props.customIconsArr[this.state.customIconsArrIndex];
  };

  cycleColor() {
    this.setState({fillColorArrIndex: (this.state.fillColorArrIndex+1) % this.state.fillColorArr.length});
    return this.state.fillColorArr[this.state.fillColorArrIndex];
  };

  dropMapMarker = (map) => {
    debugger;
    let marker = {
      position:{
        lat: this.props.streetViewCoordinate.lat,
        lng: this.props.streetViewCoordinate.lng
      },
      map: map,
      title: "Marker",
      icon: {
        path: icons.FemaleC,
        fillColor: "#254B6E",
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(0,0),
        strokeWeight: 0,
        scale: .6
      }
    };
    // eslint-disable-next-line no-undef
    return new google.maps.Marker(marker);
  };

  fullWidth = (style, mapId, streetId, other) => {
    return(
      <div
        className="l-grid"
        { ...other }>
        <div className="l-grid__col l-grid__col--7">
          <div className="l-grid" style={style}>
            <div
              className="l-grid__col l-grid__col--12"
              id={mapId}>
            </div>
          </div>
        </div>
        <div className="l-grid__col l-grid__col--5">
          <div className="l-grid" style={style}>
            <div
              className="l-grid__col l-grid__col--12"
              id={streetId}>
            </div>
          </div>
        </div>
      </div>
    )
  };
  render () {
    return (
      <div id="mapDiv">
        <GoogleMap
          minHeight="400px"
          mapOptions={this.state.mapOptions}
          streetOptions={this.state.streetOptions}
          // createTemplate={ this.fullWidth }
          createMarker={ this.dropMapMarker }
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     mapOptions: state.mapOptions,
//     streetOptions: state.streetOptions,
//     fillColorArr: state.fillColorArr,
//     customIconsArr: state.customIconsArr,
//     style: state.app.style,
//     mapId: state.app.mapId
//   };
// };
// export default connect(mapStateToProps, {mapMarkerAction})(MapContainer);
export default MapAlt;
