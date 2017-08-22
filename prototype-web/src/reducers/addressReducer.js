import * as addressActionTypes from '../actions/addressActionTypes';

const initialState = {
  subDir: "geocode/json",
  apiKey: 'AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY',
  address: "28262",
  results: [
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
  ]
};

const addressReducer = (state = initialState, action) => {
  if(action === null || action === undefined) {
    return state;
  }
  switch (action.type) {
    case addressActionTypes.UPDATE_ADDRESS_DETAILS:
      state = {
        ...state,
      };
      state.results = action.results;
      break;
    default:
      break;
  }
  return state;
};
export default addressReducer;
