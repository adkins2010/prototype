import React, {Component} from "react";
import {connect} from "react-redux";
import {updateAddressResultsAction} from "../../actions/addressActionCreators";
import {centerMapAction} from "../../actions/mapActionCreators";
import {AddressGpsDetailsRetriever} from "../../lib/AddressGpsDetailsRetriever";


class AddressGpsRetriever extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   displayAddressResuts: false
    // };
    // this.displayAddressDetails = this.displayAddressDetails.bind(this);
    this.retrieveAddressData = this.retrieveAddressData.bind(this);
    this.displayAddressDetails = this.displayAddressDetails.bind(this);
    this.resultsHandler = (results) => {
      this.props.updateAddressResultsAction(results);
      this.props.centerMapAction(results[0].geometry.location);
      this.displayAddressDetails();
    }
  }

  displayAddressDetails() {
    let resultsDiv = document.createElement('div');
    this.props.results.forEach(function (result, i) {
      let divResult = document.createElement('div');
      divResult.id = "resultDiv" + i;
      let formatted_address = result.formatted_address;
      let formatterAddressHeader = document.createElement("h5");
      formatterAddressHeader.innerHTML = "<strong>Formatted Address</strong>:&nbsp;" + formatted_address;
      divResult.appendChild(formatterAddressHeader);
      let addressComponents = result.address_components;
      divResult.innerHTML += "<h5>Address Details:</h5>";
      addressComponents.forEach(function (ac, j) {
        let addressSpan = document.createElement('span');
        addressSpan.id = i + "addressSpan" + j;
        let types = ac.types;
        let label = document.createElement('label');
        if (types.length) {
          if (types.length > 1) {
            label.innerHTML = `${types[0].replace(/_/g, ' ')} (${types[1]}):&nbsp;`
          } else {
            label.innerHTML = `${types[0].replace(/_/g, ' ')}:&nbsp;`
          }
        }
        addressSpan.appendChild(label);
        let input = document.createElement('input');
        input.setAttribute('disabled', "disabled");
        input.value = ac.long_name;
        addressSpan.appendChild(input);
        addressSpan.appendChild(document.createElement('br'));
        divResult.appendChild(addressSpan);
      });
      let geometryDetailsHeader = document.createElement('h5');
      geometryDetailsHeader.innerHTML = "Geometry Details:";
      divResult.appendChild(geometryDetailsHeader);
      let geometry = result.geometry;
      let geometryDiv = document.createElement('div');
      let boundsSpan = document.createElement('span');
      boundsSpan.innerHTML += `<label>NorthEast Boundary (lat, long):</label>&nbsp;<input disabled value=${geometry.bounds.northeast.lat} />,<input disabled value=${geometry.bounds.northeast.lng} /><br/>`;
      boundsSpan.innerHTML += `<label>SouthWest Boundary (lat, long):</label>&nbsp;<input disabled value=${geometry.bounds.southwest.lat} />,<input disabled value=${geometry.bounds.southwest.lng} /><br/>`;
      boundsSpan.innerHTML += `<label>Location (lat, long):</label>&nbsp;<input disabled value=${geometry.location.lat} />,<input disabled value=${geometry.location.lng} /><br/>`;
      geometryDiv.appendChild(boundsSpan);
      divResult.appendChild(geometryDiv);
      resultsDiv.appendChild(divResult);
    });
    this.refs.addressDiv.appendChild(resultsDiv);
  }


  retrieveAddressData() {
    // rp({
    //   uri: GoogleApi(this.props.apiKey, null, null, [{address: this.props.address}], this.props.subDir),
    //   headers: {
    //     'User-Agent': 'Request-Promise'
    //   },
    //   json: true
    // }).then((response) => {
    //   // this.setState({results: response.results});
    //   console.log("Response\r\n", response);
    //   this.props.updateAddressResultsAction(response.results);
    //   this.props.centerMapAction(response.results[0].geometry.location);
    //   this.displayAddressDetails();
    // }).catch(error => {
    //   alert(error)
    // });
    AddressGpsDetailsRetriever(this.props.address, this.props.apiKey, this.props.subDir, this.resultsHandler);
  }

  componentDidMount() {
    this.retrieveAddressData();
    // this.displayAddressDetails();
  }

  componentWillMount() {
    // console.dir(this.refs);
    this.retrieveAddressData();
    // this.displayAddressDetails();
  }

  render() {

    // this.displayAddressDetails();
    return (
      <div id = "addressDiv" ref = "addressDiv">

      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    apiKey: state.addressReducer.apiKey,
    subDir: state.addressReducer.subDir,
    address: state.addressReducer.address,
    results: state.addressReducer.results,
    mapCenterCoordinate: state.mapReducer.mapCenterCoordinate
  };
};
export default connect(mapStateToProps, {updateAddressResultsAction, centerMapAction})(AddressGpsRetriever);
