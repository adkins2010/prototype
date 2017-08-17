'use strict';
import React, {Component} from 'react';
import { loadMapAction } from "../../actions/mapActionCreators";
import '../style/Map.css';
import {ScriptLoader} from '../../lib/ScriptLoader'
import GoogleApi from '../../lib/GoogleApi';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";

export class Map extends Component {
  constructor(props) {
    super(props);
    this.script = () => {
      return ScriptLoader(GoogleApi(this.props.apiKey, this.props.libraries,this.props.version))
    };
    // this.state = {
    //   loaded: false,
    //   google: null,
    //   map: null
    // };
    this.state = {
      mapOptions: {
        center: {
          lat: this.props.mapCenterCoordinate.latitude,
          lng: this.props.mapCenterCoordinate.longitude
        },
        zoom: 14,
        streetViewControl: true,
        scrollwheel: true
      }
    };
  }

  // clickListener(event) {
  //   this.props.dropMarkerAction(this.props.map, event.latLng);
  // }

  componentDidMount() {
    if(this.props) {
      window.google = this.script();
      const google = window.google;
      const maps = window.google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let map = new maps.Map(node, this.state.mapOptions);
      this.props.loadMapAction(google, map);
    }
  }

  get markers() {
    return this.props.markers.map((marker, index) => {

    });
  }

  render() {
    return (
      <div ref="map">

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    apiKey: state.mapReducer.apiKey,
    libraries: state.mapReducer.libraries,
    version: state.mapReducer.version,
    map: state.mapReducer.map,
    markers: state.mapReducer.markers
  };
};
export default connect(mapStateToProps, {loadMapAction})(Map);

// export default Map;

