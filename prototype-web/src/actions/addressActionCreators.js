import * as addressActionTypes from "./addressActionTypes";

export function updateAddressResultsAction(results) {
  return {
    type: addressActionTypes.RETRIEVE_ADDRESS_DETAILS,
    results: results
  }
}

export function updateAddressAction(address) {
  // console.log("updating address ", address);
  return {
    type: addressActionTypes.UPDATE_ADDRESS_DETAILS,
    address: address
  }
}

export function formatAddressAction(formattedAddress) {
  return {
    type: addressActionTypes.FORMAT_ADDRESS,
    formattedAddress: formattedAddress
  }
}

export function addressInputAction (addressInput) {

  return {
    type: addressActionTypes.ADDRESS_INPUT,
    addressInput: addressInput
  }
}
