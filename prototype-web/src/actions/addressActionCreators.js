import * as addressActionTypes from "./addressActionTypes";

export function updateAddressResultsAction(results) {
  return {
    type: addressActionTypes.UPDATE_ADDRESS_DETAILS,
    results: results
  }
}
