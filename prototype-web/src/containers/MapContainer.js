import React, {PropTypes as T} from 'react';
import ReactDOM from 'react-dom';
import cache from 'utils/cache';
import GoogleApi from 'utils/GoogleApi';

export class MapContainer extends React.Component {
  render() {
    let mapDiv = "<div></div>";
    let streetDiv = "<div></div>";
    if(this.props.mapId){
      mapDiv = (
        <div id = {this.props.mapId} className = "l-grid__col l-grid__col--7">
          <div className = "l-grid" style = {this.props.style}>
            <div
              className = "l-grid__col l-grid__col--12">
            </div>
          </div>
        </div>
      );
    }
    if(this.props.streetId) {
      streetDiv = (
        <div id = {this.props.streetId} className = "l-grid__col l-grid__col--5">
          <div className = "l-grid" style = {this.props.style}>
            <div
              className = "l-grid__col l-grid__col--12">
            </div>
          </div>
        </div>
      );
    }
    return (
      <div class = "containerDiv">
        ${mapDiv}
        ${streetDiv}
      </div>
    );
  }
}
