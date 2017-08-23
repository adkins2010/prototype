import React, {Component} from 'react';
import {loadMapAction, centerMapAction, loadScriptAction} from "../../actions/mapActionCreators";
import {ScriptLoader} from '../../lib/ScriptLoader';
import GoogleApi from '../../lib/GoogleApi';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";

export class MapComponent extends Component {
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
        this.props.loadScriptAction(result);
      });
    }
  }

  loadMap() {
    if (this.props && this.props.mapCenterCoordinate) {
      this.script().then((result) => {
        console.dir(result);
        this.props.loadScriptAction(result);
        let maps = window.google.maps;
        if(maps) {
          console.dir(this.refs);
          let mapRef = this.refs.mapDiv;
          let node = ReactDOM.findDOMNode(mapRef);
          let map = new maps.Map(node, this.state.mapOptions);
          this.props.loadMapAction(map, maps);
        }
      });
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  componentWillMount() {
    this.loadMap();
    // if (!this.props.mapScript) {
    //   this.loadScript();
    // }
    // this.loadMap();
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
      <div id="mapDiv" ref="mapDiv">
        <span onLoad={this.loadMap}>
          Loading <img src = "/images/loading.gif" style={{"width": "15px", "verticalAlign": "bottom"}}/>
        </span>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    apiKey: state.mapReducer.apiKey,
    libraries: state.mapReducer.libraries,
    // version: state.mapReducer.version,
    mapScript: state.mapReducer.mapScript,
    map: state.mapReducer.map,
    maps: state.mapReducer.maps,
    markers: state.mapReducer.markers,
    mapCenterCoordinate: state.mapReducer.mapCenterCoordinate
  };
};
export default connect(mapStateToProps, {loadMapAction, centerMapAction, loadScriptAction})(MapComponent);

// export default MapContainer;

