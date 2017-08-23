import * as addressActionTypes from '../actions/addressActionTypes';

const initialState = {
  subDir: "geocode/json",
  apiKey: 'AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY',
  address: "",
  results: [
  ],
  formattedAddress: "",
  addressInput: {
    addressLine1: "8505 IBM Drive",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: ""/*,
    addressLine1Error: false,
    postalError: false,
    stateError: false,
    cityError: false*/
  }
};

const addressReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case addressActionTypes.RETRIEVE_ADDRESS_DETAILS:
      state = {
        ...state,
      };
      state.results = action.results;
      break;
    case addressActionTypes.UPDATE_ADDRESS_DETAILS:
      state = {
        ...state,
      };
      state.address = action.address;
      break;
    case addressActionTypes.FORMAT_ADDRESS:
      state = {
        ...state,
      };
      state.formattedAddress = action.formattedAddress;
      break;
    case addressActionTypes.ADDRESS_INPUT:
      state = {
        ...state,
        addressInput: action.addressInput
      };

      // if(action.addressInput.postalError) {
      //   state.addressInput.addressLine1Error = action.addressInput.postalError;
      // } else if(action.addressInput.addressLine1Error) {
      //   state.addressInput.addressLine1Error = action.addressInput.addressLine1Error;
      // } else if(action.addressInput.cityError) {
      //   state.addressInput.cityError = action.addressInput.cityError;
      // }
      break;
    default:
      break;
  }
  return state;
};
export default addressReducer;
