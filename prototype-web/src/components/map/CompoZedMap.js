import React, {Component} from "react";
import {GoogleMap} from "react-pattern-library";
// import {GoogleMap} from "../../lib/google-map";
import {
  mapMarkerAction, cycleIconAction, cycleColorAction, viewportMapAction,
  centerMapAction, loadMapAction, loadScriptAction
} from "../../actions/mapActionCreators";
import * as icons from "react-pattern-library-icons";
import "../style/Map.css";
import {connect} from "react-redux";
import {GoogleApi} from "../../lib/GoogleApi";
import {ScriptLoader} from "../../lib/ScriptLoader";
import * as ReactDOM from "react-dom";


export class CompoZedMap extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   customIconsArr: [icons.RoadsideasstC, icons.RoadsideasstF, icons.RoadsideasstL, icons.TowtruktrakC, icons.TowtruktrakF, icons.TowtruktrakL, icons.TowtruktrkaltF, icons.TowtruktrkaltL],
    //   towTruckIconsArr: [icons.TowtruktrakC, icons.TowtruktrakF, icons.TowtruktrakL, icons.TowtruktrkaltF, icons.TowtruktrkaltL],
    //   carIconsArr: [icons.RoadsideasstC, icons.RoadsideasstF, icons.RoadsideasstL],
    //   customIconsArrIndex: 0,
    //   fillColorArr: ["#1666AF","#0096D6","#55C8E8","#254b6e","#104780","#0075c9","#00FFB7","#DE4C0D"],
    //   fillColorArrIndex: 0,
    // };
    this.dropMapMarker = this.dropMapMarker.bind(this);
    this.cycleColor = this.cycleColor.bind(this);
    this.cycleIcon = this.cycleIcon.bind(this);
    this.dropMapMarker = this.dropMapMarker.bind(this);
    this.fullWidth = this.fullWidth.bind(this);
  }

  cycleIcon() {
      cycleIconAction((this.props.customIconsArrIndex+1) % this.props.customIconsArr.length);
      return this.props.customIconsArr[this.props.customIconsArrIndex];
  };

  cycleColor() {
    // this.setState({fillColorArrIndex: (this.state.fillColorArrIndex+1) % this.state.fillColorArr.length});
    cycleColorAction((this.props.fillColorArrIndex+1) % this.props.fillColorArr.length);
    return this.props.fillColorArr[this.props.fillColorArrIndex];
  };

  dropMapMarker = (map) => {
    let marker = {
      position: this.props.mapCenterCoordinate,
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
    this.props.loadMapAction(map, window.google.maps);

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
    // let props = {
    //   mapOptions: this.props.mapOptions,
    //   streetOptions: this.props.streetOptions,
    //   createMarker: this.dropMapMarker,
    //   minHeight: "400px",
    //   createTemplate: this.fullWidth
    // }
    // let map = new GoogleMap(props)
    // map.render();
    return (
      <div id="mapDiv">
        <GoogleMap
          minHeight="400px"
          mapOptions={this.props.mapOptions}
          streetOptions={this.props.streetOptions}
          // createTemplate={ this.fullWidth }
          createMarker={ this.dropMapMarker }
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    mapCenterCoordinate: state.mapReducer.mapCenterCoordinate,
    streetViewControl: state.mapReducer.streetViewControl,
    mapOptions: state.mapReducer.mapOptions,
    streetOptions: state.mapReducer.streetOptions,
    customIconsArr: state.mapReducer.customIconsArr,
    fillColorArr: state.mapReducer.fillColorArr,
    customIconsArrIndex: state.mapReducer.customIconsArrIndex,
    fillColorArrIndex: state.mapReducer.fillColorArrIndex
  };
};
export default connect(mapStateToProps, {mapMarkerAction,viewportMapAction,centerMapAction, loadMapAction})(CompoZedMap);
