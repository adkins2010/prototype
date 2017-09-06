import GoogleApi from "./GoogleApi";
var rp = require('request-promise');

export const AddressGpsDetailsRetriever = (address = "", apiKey = null, subDir = "geocode/json", resultsHandlerFn, params = []) => {
  let url = GoogleApi(apiKey, null, null, [{address: address}], subDir);
  rp({
    uri: url,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }).then((response) => {
    console.dir(response);
    if(!params || params.length <= 0) {
      resultsHandlerFn(response.results);
    } else {
      resultsHandlerFn(response.results, ...params);
    }

  }).catch(error => {
    alert(error)
  });
};

export const AsyncAddressGpsDetailsRetriever = async (address = "", apiKey = null, subDir = "geocode/json") => {
  let url = GoogleApi(apiKey, null, null, [{address: address}], subDir);
  return await rp({
    uri: url,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  });
};
