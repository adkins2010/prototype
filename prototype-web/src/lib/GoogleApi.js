const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/js";
export const GoogleApi = function(apiKey, libraries, callback, googleVersion) {
  const getUrl = () => {
    let params = {
      key: apiKey,
      libraries: libraries.join(','),
      /*v: googleVersion*/
      callback: callback
    };
    if(googleVersion) {
      params.v = googleVersion;
    }
    let paramStr = Object.keys(params).filter(index => !!params[index]).map((key) => {
      return `${key}=${params[key]}`
    }).join('&');
    let callback = "callback";
    return `${GOOGLE_API_URL}?${paramStr}&callback=${callback}`;
  };
  return getUrl();
};
export default GoogleApi;
