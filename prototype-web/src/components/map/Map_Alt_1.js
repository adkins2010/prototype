import React, {Component} from 'react';
import {loadMapAction, centerMapAction, loadScriptAction} from "../../actions/mapActionCreators";
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
        center: this.props.mapCenterCoordinate,
        zoom: 14,
        // streetViewControl: true,
        scrollwheel: true
      }
    };
    this.loadMap = this.loadMap.bind(this);
    this.loadScript = this.loadScript.bind(this);
  }

  loadScript() {
    if (this.props) {
      this.script().then((result) => {
        console.dir(result);
        // let mapRef = this.refs.mapDiv;
        // let node = ReactDOM.findDOMNode(mapRef);
        // result.addDomListener(node, 'load', this.loadMap);
        this.props.loadScriptAction(result);
      });
    }
  }

  loadMap() {
    if (this.props && this.props.mapScript && this.props.mapCenterCoordinate) {
      // this.script().then((result) => {
      //   // console.dir(result);
      //   // window.google = result;
      //   // const google = window.google;
      //   const maps = window.google.maps;
      //   if(maps) {
      //     console.dir(this.refs);
      //     let mapRef = this.refs.mapDiv;
      //     let node = ReactDOM.findDOMNode(mapRef);
      //     let map = new maps.Map(node, ...this.state.mapOptions);
      //     maps.event.addDomListener(window, 'load', this.loadMap);
      //     this.props.loadMapAction(map, maps);
      //     // addMarker(haightAshbury);
      //   }
      // });
      const maps = window.google.maps;
      if (maps) {
        let mapRef = this.refs.mapDiv;
        let node = ReactDOM.findDOMNode(mapRef);
        let map = new maps.Map(node, ...this.state.mapOptions);
        maps.event.addDomListener(window, 'load', this.loadMap);
        this.props.loadMapAction(map, maps);
        // addMarker(haightAshbury);
      }
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  componentWillMount() {
    // this.loadMap();
    if (!this.props.mapScript) {
      this.loadScript();
    }
    this.loadMap();
  }

  getDefaultProps() {
    this.loadScript();
  }

  // getInitialState() {
  //   this.loadScript();
  // }

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
      <div ref = "mapDiv">
        <span onload = {this.loadMap}>Loading <img src = "/images/loading.gif"
                                                   style = {{"width": "15px", "vertical-align": "bottom"}}/></span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    apiKey: state.mapReducerAlt.apiKey,
    libraries: state.mapReducerAlt.libraries,
    // version: state.mapReducerAlt.version,
    mapScript: state.mapReducerAlt.mapScript,
    map: state.mapReducerAlt.map,
    maps: state.mapReducerAlt.maps,
    markers: state.mapReducerAlt.markers,
    mapCenterCoordinate: state.mapReducerAlt.mapCenterCoordinate
  };
};
export default connect(mapStateToProps, {loadMapAction, centerMapAction, loadScriptAction})(Map);

// export default Map;

