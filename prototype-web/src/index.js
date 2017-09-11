import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import Coordinate from "./Coordinate";
import configureStore from "./store/configureStore";
import AddressGpsRetriever from "./components/address/AddressGpsRetriever";
import AddressInputForm from "./components/address/AddressInputForm";


// const options = {
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//     }
// };

let mapCenterCoordinate = new Coordinate({parameters: {lat: 35.3301529, lng: -80.7325287}}),
  streetViewCoordinate = new Coordinate({parameters: {lat: 35.3043098, lng: -80.76405469999997}}),
  address = "28262";
const store = configureStore();
render(
  <Provider store={store}>
    <AddressInputForm/>
  </Provider>,
  document.getElementById('root')
);
