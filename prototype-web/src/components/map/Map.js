import React, {Component} from 'react';
import { loadMapAction } from "../../actions/mapActionCreators";
import '../style/Map.css';
import {ScriptLoader} from '../../lib/ScriptLoader';
import GoogleApi from '../../lib/GoogleApi';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";

export class Map extends Component {
  constructor(props) {
    super(props);
    this.script = () => {
      return ScriptLoader(GoogleApi(this.props.apiKey, this.props.libraries));
    };
    this.state = {
      mapOptions: {
        center: {
          lat: this.props.mapCenterCoordinate.latitude,
          lng: this.props.mapCenterCoordinate.longitude
        },
        zoom: 14,
        // streetViewControl: true,
        scrollwheel: true
      }
    };
    this.loadMap = this.loadMap.bind(this);
  }

  loadMap() {
    if(this.props) {
      this.script().then((result) => {
        // console.dir(result);
        // window.google = result;
        // const google = window.google;
        const maps = window.google.maps;
        if(maps) {
          // console.log(maps);
          const mapRef = this.refs.map;
          const node = ReactDOM.findDOMNode(mapRef);
          let map = new maps.Map(node, ...this.state.mapOptions);
          this.props.loadMapAction(map, maps);
          // addMarker(haightAshbury);
        }
      });
    }
  }

  // getDefaultProps() {
  //   this.loadMap();
  // }

  // getInitialState() {
  //   this.loadMap();
  // }

  // componentDidMount() {
  //   this.loadMap();
  // }

  componentWillMount() {
    this.loadMap();
  }
  //
  // componentDidUpdate() {
  //   this.loadMap();
  // }
  //
  // componentWillUnmount() {
  //   this.loadMap();
  // }

  // get markers() {
  //   return this.props.markers.map((marker, index) => {
  //
  //   });
  // }

  render() {
    return (
      <div id="map" ref="map">

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
    maps: state.mapReducer.maps,
    markers: state.mapReducer.markers
  };
};
export default connect(mapStateToProps, {loadMapAction})(Map);

// export default Map;

