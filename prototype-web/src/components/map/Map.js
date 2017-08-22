import _ from "lodash";
import React, {Component} from 'react';
import {loadMapAction, centerMapAction, setMarkersAction} from "../../actions/mapActionCreators";
import '../style/Map.css';
import {connect} from "react-redux";
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";


const GoogleMapWrapper = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={this.props.mapCenterCoordinate}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      onRightClick={() => this.props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.dropMarker = this.dropMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }

  loadMap(map) {
    this.props.loadMapAction(map);
  }

  dropMarker(event) {
    const nextMarkers = [
      ...this.state.markers, {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now()
      }
    ];
    setMarkersAction(nextMarkers);
  }

  removeMarker(targetMarker) {
    const nextMarkers = this.props.markers.filter(marker => marker!==targetMarker);
    setMarkersAction(nextMarkers);
  }

  render() {
    return (
      <div ref = "mapDiv">
        <span onload = {this.loadMap}>Loading <img src = "/images/loading.gif" style = {{"width": "15px", "vertical-align": "bottom"}}/></span>
        <GoogleMapWrapper
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.loadMap}
          onMapClick={this.dropMarker}
          markers={this.props.markers}
          onMarkerRightClick={this.removeMarker}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    apiKey: state.mapReducer.apiKey,
    map: state.mapReducer.map,
    markers: state.mapReducer.markers,
    mapCenterCoordinate: state.mapReducer.mapCenterCoordinate
  };
};
export default connect(mapStateToProps, {loadMapAction, centerMapAction, setMarkersAction})(Map);
