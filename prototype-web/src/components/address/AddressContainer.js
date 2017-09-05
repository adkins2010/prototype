import {GoogleApi} from "ars-compozed-roadio-common-ui";
const rp = require('request-promise');

/**
 * I think that the assumption that the user has the <code>addressReducer</code> object as part of her combined
 * storage.
 */
export default class AddressContainer {
  constructor() {
    this.retrieveMapData = this.retrieveMapData.bind(this);
  }

  retrieveMapData() {
    rp({
      uri: GoogleApi(this.props.apiKey, null, null, [{address: this.props.address}], this.props.subDir),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then((response) => {
      this.props.updateAddressResultsAction(response.results);
      this.props.centerMapAction(response.results[0].geometry.location);
    }).catch(error => {
      alert(error)
    });
  }
}
