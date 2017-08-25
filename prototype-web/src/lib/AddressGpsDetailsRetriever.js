import GoogleApi from "./GoogleApi";
var rp = require('request-promise');

export const AddressGpsDetailsRetriever = (address, apiKey = null, subDir = "geocode/json", resultsHandlerFn) => {

  window.fetch({
    json: true
  }).then((response) => {
    console.dir(response);
    resultsHandlerFn(response.results);
  }).catch(error => {
    alert(error)
  });
};
