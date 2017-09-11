export default class AddressDetailsRenderer {
  constructor() {
    this.displayAddressDetails = this.displayAddressDetails.bind(this);
  }
  displayAddressDetails(addressDetailsDiv, results = []) {
    addressDetailsDiv.innerHTML = "";
    let resultsDiv = document.createElement('div');
    results.forEach(function (result, i) {
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
      if(geometry.bounds) {
        let boundsSpan = document.createElement('span');
        boundsSpan.innerHTML += `<label>NorthEast Boundary (lat, long):</label>&nbsp;<input disabled value=${geometry.bounds.northeast.lat} />,<input disabled value=${geometry.bounds.northeast.lng} /><br/>`;
        boundsSpan.innerHTML += `<label>SouthWest Boundary (lat, long):</label>&nbsp;<input disabled value=${geometry.bounds.southwest.lat} />,<input disabled value=${geometry.bounds.southwest.lng} /><br/>`;
        boundsSpan.innerHTML += `<label>Location (lat, long):</label>&nbsp;<input disabled value=${geometry.location.lat} />,<input disabled value=${geometry.location.lng} /><br/>`;
        geometryDiv.appendChild(boundsSpan);
      }
      if(geometry.viewport) {
        let viewportSpan = document.createElement('span');
        viewportSpan.innerHTML += `<label>NorthEast Viewport (lat, long):</label>&nbsp;<input disabled value=${geometry.viewport.northeast.lat} />,<input disabled value=${geometry.viewport.northeast.lng} /><br/>`;
        viewportSpan.innerHTML += `<label>SouthWest Viewport (lat, long):</label>&nbsp;<input disabled value=${geometry.viewport.southwest.lat} />,<input disabled value=${geometry.viewport.southwest.lng} /><br/>`;
        viewportSpan.innerHTML += `<label>Location (lat, long):</label>&nbsp;<input disabled value=${geometry.location.lat} />,<input disabled value=${geometry.location.lng} /><br/>`;
        geometryDiv.appendChild(viewportSpan);
      }

      divResult.appendChild(geometryDiv);
      resultsDiv.appendChild(divResult);
    });
    addressDetailsDiv.appendChild(resultsDiv);
  }
}
