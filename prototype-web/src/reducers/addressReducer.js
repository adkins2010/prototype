import * as addressActionTypes from "../actions/addressActionTypes";

const initialState = {
  subDir: "geocode/json",
  apiKey: 'AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY',
  address: "28262",
  results: [
  ],
  formattedAddress: "",
  addressInput: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA"
  }
};

const addressReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case addressActionTypes.RETRIEVE_ADDRESS_DETAILS:
      state = {
        ...state
      };
      state.results = action.results;
      break;
    case addressActionTypes.UPDATE_ADDRESS_DETAILS:
      state = {
        ...state
      };
      state.address = action.address;
      break;
    case addressActionTypes.FORMAT_ADDRESS:
      state = {
        ...state
      };
      state.formattedAddress = action.formattedAddress;
      break;
    case addressActionTypes.ADDRESS_INPUT:
      state = {
        ...state,
        addressInput: action.addressInput
      };
      break;
    default:
      break;
  }
  return state;
};
export default addressReducer;
