const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/";
/**
 *
 * @param apiKey
 * @param libraries
 * @param googleVersion
 * @param otherParams
 * @param subDir You have to make sure that you don't start off the directory with a '/'
 * @constructor
 */
export const GoogleApi = function(apiKey, libraries, googleVersion, otherParams = [], subDir = "js") {
  const getUrl = () => {
    let params = {
      key: apiKey/*,
      libraries: libraries.join(','),*/
      /*v: googleVersion*/
      // callback: callback
    };
    if(libraries) {
      params.libraries = libraries.join(',');
    }
    if(googleVersion) {
      params.v = googleVersion;
    }
    if(otherParams && otherParams.length) {
      otherParams.forEach((param, index) => {
        Object.keys(param).map((key) => {
          params[key] = param[key];
        })
      });
    }

    let paramStr = "";
    Object.keys(params).forEach((key) => {
      paramStr += "&" + key +"=" + params[key];
    });
    let callback = "callback";
    return `${GOOGLE_API_URL}${subDir}?${paramStr}`;
  };
  return getUrl();
};
export default GoogleApi;
