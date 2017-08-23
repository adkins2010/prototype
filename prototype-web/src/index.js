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

let mapCenterCoordinate = new Coordinate(35.3301529, -80.7325287),
  streetViewCoordinate = new Coordinate(35.3043098, -80.76405469999997),
  address = "28262";
const store = configureStore();
render(
  <Provider store={store}>
    <AddressInputForm/>
  </Provider>,
  document.getElementById('root')
);
// const userId = 1;
//
// fetch('/v1/example/'+userId, options).then(response => response.json())
//     .then(userInfo => {
//
//         const store = createStore(reducer, {
//             app: {
//                 value: userInfo.generatedID || 0,
//                 text: userInfo.example || "Backend didn't give me anything",
//                 showLogo: true
//             }
//         });
//
//         const ConnectedApp = connect(
//             mapStateToProps,
//             mapDispatchToProps
//         )(App);
//
//         render(
//             <Provider store={store}>
//                 <ConnectedApp />
//             </Provider>,
//             document.getElementById('root')
//         );
//     });

