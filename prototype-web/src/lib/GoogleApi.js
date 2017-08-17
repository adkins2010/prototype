const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api/js";
export const GoogleApi = function(apiKey, libraries, googleVersion) {
  const getUrl = () => {
    let params = {
      key: apiKey,
      libraries: libraries.join(','),
      v: googleVersion
    };
    let paramStr = Object.keys(params).filter(index => !!params[index]).map((key) => {
      return `${key}=${params[key]}`
    }).join('&');
    return `${url}?${paramStr}`;
  };
};
export default GoogleApi;
