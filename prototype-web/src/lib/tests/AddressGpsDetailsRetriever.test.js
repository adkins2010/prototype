import React from 'react';
import {shallow} from 'enzyme';
import {AddressGpsDetailsRetriever} from "../AddressGpsDetailsRetriever";
// import * from 'mocha';


describe('GPS Address Manager tests', () => {

  const expectedResults = [
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
  ];

  const resultsHandler = (results) => {
    console.log(results);
  };

  it("Test retrieves GPS details for a given zip code", () => {
    let results = new Array();
    let subDir = "geocode/json";
    let apiKey = 'AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY';
    results = AddressGpsDetailsRetriever("28262", apiKey, subDir, resultsHandler());
    expect(results).equals(expectedResults);
  });
});
