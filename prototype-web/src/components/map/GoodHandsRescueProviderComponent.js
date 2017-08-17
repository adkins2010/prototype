import React, {Component} from 'react';
import {connect} from "react-redux";
import {connect} from "react-redux";
import { dropMarkerAction } from "../../actions/mapActionCreators";



export class GoodHandsRescueProviderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.partners = new Array();
  }
}

dropMapMarker = (map, coordinate, title, customIcon) => {
  let fillColor = this.cycleColor();
  let marker = {
    position:coordinate,
    map: map,
    title: title,
    icon: {
      path: customIcon,
      fillColor: fillColor,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: .6
    }
  };
  return new google.maps.Marker(marker);
};

const mapStateToProps = (state) => {
  return {
    coordinate: state.app.coordinate
  };
};
export default connect(mapStateToProps, {dropMarkerAction})(GoodHandsRescueProviderComponent);
