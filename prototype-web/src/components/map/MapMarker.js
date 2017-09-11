import React, {Component} from 'react';
import {connect} from "react-redux";
import { dropMarkerAction } from "../../actions/mapActionCreators";

export class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.clickListener = this.clickListener.bind(this);
  }
  clickListener(event) {
    this.props.dropMarkerAction(this.props.map, event.latLng);
  }

  componentDidMount() {
    if(this.props && this.props.map) {
      let {map} = this.props;
      map.addListener('click', this.clickListener);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.mapReducerAlt.map,
    markers: state.mapReducerAlt.markers
  };
};
export default connect(mapStateToProps, {dropMarkerAction})(MapMarker);
