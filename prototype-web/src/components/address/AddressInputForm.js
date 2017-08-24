import React, {Component} from "react";
import {connect} from "react-redux";
import {
  addressInputAction,
  formatAddressAction,
  updateAddressAction,
  updateAddressResultsAction
} from "../../actions/addressActionCreators";
import {centerMapAction} from "../../actions/mapActionCreators";
import "../style/Address.css";
import "../style/Errors.css";
import GoogleApi from "../../lib/GoogleApi";
var rp = require('request-promise');

class AddressInputForm extends Component {
  constructor(props) {
    super(props);

    this.updateAddressLine1 = this.updateAddressLine1.bind(this);
    this.updateAddressLine2 = this.updateAddressLine2.bind(this);
    this.updatePostalCode = this.updatePostalCode.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.retrieveAddressData = this.retrieveAddressData.bind(this);
  }

  validate(evt) {
    console.dir("validate", evt);
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }

  }

  retrieveAddressData(event, address) {
    let id = event.target.id.toString();
    console.dir(id);
    if (address === undefined || address === null || address === "") {
      address = this.props.address;
    }
    console.log("Searching for address ", address);
    rp({
      uri: GoogleApi(this.props.apiKey, null, null, [{address: address}], this.props.subDir),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then((response) => {
      console.log("Response\r\n", response);
      this.props.updateAddressResultsAction(response.results);


      let me = this;
      let addressInput = {
        addressLine1: me.props.addressInput.addressLine1,
        addressLine2: me.props.addressInput.addressLine2,
        city: me.props.addressInput.city,
        state: me.props.addressInput.state,
        postalCode: me.props.addressInput.postalCode
      };
      this.props.results.forEach(function (result, i) {
        console.log("Result %d: ", i, result);

        let streetNo = 123;
        let route = "Drury Lane";

        me.props.centerMapAction(result.geometry.location);
        let formattedAddress = result.formatted_address;
        me.props.formatAddressAction(formattedAddress);
        // console.dir(formattedAddress);

        let addressComponents = result.address_components;
        addressComponents.forEach((ac) => {
          if (ac.types[0] === "postal_code" && id.indexOf("postal") < 0) {
            addressInput.postalCode = ac.long_name;
          }
          if (ac.types[0] === "locality" && id.indexOf("city") < 0) {
            addressInput.city = ac.long_name;
          }
          if (ac.types[0] === "administrative_area_level_1" && id.indexOf("state") < 0) {
            addressInput.state = ac.short_name;
          }
          if (ac.types[0] === "subpremise" && id.indexOf("line-2") < 0) {
            addressInput.addressLine2 = ac.long_name;
          }
          if (ac.types[0] === "street_number" && id.indexOf("line-1") < 0) {
            streetNo = ac.long_name;
          }
          if (ac.types[0] === "route" && id.indexOf("line-1") < 0) {
            route = ac.long_name;
          }
        });
        addressInput.addressLine1 = (id.indexOf("line-1") < 0 ? addressInput.addressLine1 : streetNo + " " + route);
        me.props.addressInputAction(addressInput);


      });
      // this.props.addressInputAction(addressInput);
      // this.props.formatAddressAction({formattedAddress: formattedAddress});
    }).catch(error => {
      alert(error)
    });
  }

  updateAddressLine1(event) {
    console.log("updateAddressLine1", event.target.value);
    this.props.addressInputAction({
      addressLine1: event.target.value,
      addressLine2: this.props.addressInput.addressLine2,
      city: this.props.addressInput.city,
      state: this.props.addressInput.state,
      postalCode: this.props.addressInput.postalCode/*,
       addressLine1Error: false,
       postalError: this.props.addressInput.postalError,
       stateError: this.props.addressInput.stateError,
       cityError: this.props.addressInput.cityError*/
    });
    let address = "";
    Object.keys(this.props.addressInput).forEach((key) => {
      address += " " + this.props.addressInput[key];
    });
    // event.target.value + this.props.addressInput.addressLine2 + this.props.addressInput.city + this.props.addressInput.state + this.props.addressInput.postalCode;
    this.props.updateAddressAction(address);
    this.retrieveAddressData(event, address);
  }

  updateAddressLine2(event) {
    console.log("updateAddressLine2", event.target.value);
    this.props.addressInputAction({
      addressLine1: this.props.addressInput.addressLine1,
      addressLine2: event.target.value,
      city: this.props.addressInput.city,
      state: this.props.addressInput.state,
      postalCode: this.props.addressInput.postalCode/*,
       addressLine1Error: this.props.addressInput.addressLine1Error,
       postalError: this.props.addressInput.postalError,
       stateError: this.props.addressInput.stateError,
       cityError: this.props.addressInput.cityError*/
    });
    let address = "";
    Object.keys(this.props.addressInput).forEach((key) => {
      address += " " + this.props.addressInput[key];
    });
    this.props.updateAddressAction(address);
    this.retrieveAddressData(event, address);
  }

  updateCity(event) {
    console.log("updateCity", event.target.value);
    this.props.addressInputAction({
      addressLine1: this.props.addressInput.addressLine1,
      addressLine2: this.props.addressInput.addressLine2,
      city: event.target.value,
      state: this.props.addressInput.state,
      postalCode: this.props.addressInput.postalCode/*,
       addressLine1Error: this.props.addressInput.addressLine1Error,
       postalError: this.props.addressInput.postalError,
       stateError: this.props.addressInput.stateError,
       cityError: false*/
    });

    if (event.target.value.length >= 3) {
      let address = event.target.value + " " + this.props.addressInput.state + " " + this.props.addressInput.state;
      this.props.updateAddressAction(address);
      this.retrieveAddressData(event, address);
    }
  }

  updateState(event) {
    console.log("updateState", event.target.value);
    this.props.addressInputAction({
      addressLine1: this.props.addressInput.addressLine1,
      addressLine2: this.props.addressInput.addressLine2,
      city: this.props.addressInput.city,
      state: event.target.value,
      postalCode: this.props.addressInput.postalCode/*,
       addressLine1Error: this.props.addressInput.addressLine1Error,
       postalError: this.props.addressInput.postalError,
       stateError: false,
       cityError: this.props.addressInput.cityError*/
    });
    let address = this.props.addressInput.city + " " + event.target.value + " " + this.props.addressInput.state;
    if (event.target.value.length >= 2) {
      this.retrieveAddressData(event, address);
    }
  }

  updatePostalCode(event) {
    console.log("updatePostalCode", event.target.value);
    this.props.addressInputAction({
      addressLine1: this.props.addressInput.addressLine1,
      addressLine2: this.props.addressInput.addressLine2,
      city: this.props.addressInput.city,
      state: this.props.addressInput.state,
      postalCode: event.target.value/*,
       addressLine1Error: this.props.addressInput.addressLine1Error,
       postalError: false,
       stateError: this.props.addressInput.stateError,
       cityError: this.props.addressInput.cityError*/
    });

    if (event.target.value.length >= 5) {
      this.retrieveAddressData(event, event.target.value);
      let address = "";
      Object.keys(this.props.addressInput).forEach((key) => {
        address += " " + this.props.addressInput[key];
      });
      this.props.updateAddressAction(address);
    }
  }

  render() {
    return (
      <div className = "container-fluid">

        <div id = "addressLine1Row" className = "row">
          <div className = "col-sm-4">
            <label className = "address-form-label" id = "address-line-label">Address Line 1</label>
          </div>
          <div className = "col-sm-8">
            <input
              type = "text"
              className = "address-form-input"
              id = "address-line-1-input"
              onChange = {this.updateAddressLine1}
              // onKeyUp = {this.retrieveAddressData}
              value = {this.props.addressInput.addressLine1}
            />
            <label
              className = {"error-description-label"}
              id = "address-line-error-label"
              style = {{display: (this.props.addressInput.addressLine1Error ? " block" : "none")}}>Street Address cannot
                                                                                                   be empty.</label>
          </div>
        </div>

        <div id = "addressLine2Row" className = "row">
          <div className = "col-sm-4">
            <label className = "address-form-label" id = "address-line-label">Address Line 2</label>
          </div>
          <div className = "col-sm-8">
            <input
              type = "text"
              className = "address-form-input"
              id = "address-line-2-input"
              onChange = {this.updateAddressLine2}
              value = {this.props.addressInput.addressLine2}
            />
          </div>
        </div>
        <div id = "cityRow" className = "row">
          <div className = "col-sm-4">
            <label className = "address-form-label" id = "city-label">City</label>
          </div>
          <div className = "col-sm-8">
            <input
              type = "text"
              className = "address-form-input"
              id = "city-input"
              onChange = {this.updateCity}
              // onBlur = {this.retrieveAddressData}
              value = {this.props.addressInput.city}/>
            <label
              className = {"error-description-label" + (this.props.addressInput.cityError ? " error-display" : "")}
              id = "city-error-label"
              style = {{display: (this.props.addressInput.cityError ? " block" : "none")}}>City cannot be
                                                                                           empty.</label>
          </div>
        </div>

        <div id = "stateRow" className = "row">
          <div className = "col-sm-4">
            <label className = "address-form-label" id = "state-label">State</label>
          </div>
          <div className = "col-sm-8">
            <input
              type = "text"
              className = "address-form-input"
              onChange = {this.updateState}
              // onKeyUp = {this.retrieveAddressData}
              value = {this.props.addressInput.state}/>
            <label
              className = {"error-description-label" + (this.props.addressInput.stateError ? " error-display" : "")}
              id = "state-error-label"
              style = {{display: (this.props.addressInput.stateError ? " block" : "none")}}>State cannot be
                                                                                            empty.</label>
          </div>
        </div>

        <div id = "zipRow" className = "row">
          <div className = "col-xs-4">
            <label className = "postal-code-label" id = "postal-code-label">Zip (Postal) Code:</label>
          </div>
          <div className = "col-xs-8">
            <input
              name = "postal-code-input"
              type = "text"
              maxLength = '6'
              // onKeyPress = {this.validate}
              onChange = {this.updatePostalCode}
              className = "postal-code-input"
              id = "postal-code-input"
              value = {this.props.addressInput.postalCode}
            />
            <label
              className = {"error-description-label" + (this.props.addressInput.postalError ? " error-display" : "")}
              id = "postal-code-error-label"
              style = {{display: (this.props.addressInput.postalError ? " block" : "none")}}>Zip Code cannot be
                                                                                             empty.</label>
          </div>
        </div>
        <strong>Formatted Address</strong>:&nbsp;{this.props.formattedAddress}
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
    mapCenterCoordinate: state.mapReducer.mapCenterCoordinate,
    addressInput: state.addressReducer.addressInput,
    formattedAddress: state.addressReducer.formattedAddress
  };
};
export default connect(mapStateToProps, {
  addressInputAction,
  updateAddressAction,
  updateAddressResultsAction,
  formatAddressAction,
  centerMapAction
})(AddressInputForm);
