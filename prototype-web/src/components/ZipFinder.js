import React, {Component} from 'react';
import * as ReactDOM from "react-dom";

export default class ZipFinder extends Component {
  constructor(props) {
    super(props);
    this.handleResults = this.handleResults.bind(this);
  }
  handleResults(results =
    [
      {
        address_components : [
          {
            long_name : "28262",
            short_name : "28262",
            types : [ "postal_code" ]
          },
          {
            long_name : "Charlotte",
            short_name : "Charlotte",
            types : [ "locality", "political" ]
          },
          {
            long_name : "Mecklenburg County",
            short_name : "Mecklenburg County",
            types : [ "administrative_area_level_2", "political" ]
          },
          {
            long_name : "North Carolina",
            short_name : "NC",
            types : [ "administrative_area_level_1", "political" ]
          },
          {
            long_name : "United States",
            short_name : "US",
            types : [ "country", "political" ]
          }
        ],
        formatted_address : "Charlotte, NC 28262, USA",
        geometry : {
          bounds : {
            northeast : {
              lat : 35.377745,
              lng : -80.6889039
            },
            southwest : {
              lat : 35.278478,
              lng : -80.80545499999999
            }
          },
          location : {
            lat : 35.3301529,
            lng : -80.7325287
          },
          location_type : "APPROXIMATE",
          viewport : {
            northeast : {
              lat : 35.377745,
              lng : -80.6889039
            },
            southwest : {
              lat : 35.278478,
              lng : -80.80545499999999
            }
          }
        },
        place_id : "ChIJ8_mKTmkcVIgRNQiqsn6NanU",
        types : [ "postal_code" ]
      }
    ]) {

    let resultsDiv = document.createElement('div');

    results.forEach(function(result, i) {
      var divResult = document.createElement('div');
      divResult.id = "resultDiv" + i;
      let formatted_address = result.formatted_address;
      let formatterAddressHeader = document.createElement("h5");
      formatterAddressHeader.innerHTML= "<strong>Formatted Address</strong>:&nbsp;" + formatted_address;
      divResult.appendChild(formatterAddressHeader);
      let addressComponents = result.address_components;
      divResult.innerHTML += "<h5>Address Details:</h5>";
      addressComponents.forEach(function(ac, j) {
        let addressSpan = document.createElement('span');
        addressSpan.id = i + "addressSpan" + j;
        let types = ac.types;
        // for (let k = 0; k < types.length; k++) {
        //   let type = types[k];
        //   let label = document.createElement('label');
        //   label.innerHTML=type + "&nbsp;";
        //   row.appendChild(label);
        // }
        let label = document.createElement('label');
        if(types.length) {
          if(types.length > 1) {
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
    document.getElementsByTagName("body")[0].appendChild(resultsDiv);
    // return div;
  }
  render() {
    // console.log("City State: ", cityName, stateName);
    this.handleResults();
    return(<div ref="zipResults">

    </div>);
  }
}
