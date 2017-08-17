import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import {ScriptLoader} from '../../lib/ScriptLoader'
import GoogleApi from '../../lib/GoogleApi';

const mapConfig = {};

export class GoogleApiComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.script = () => {
      return ScriptLoader(GoogleApi(this.props.apiKey, this.props.libraries,this.props.version))
    };
    this.script.google.onLoad(this.onLoad.bind(this));
  }
  componentDidMount() {
    window.handleGoogleClientLoad = function() {
      // log to console
    }

  }
}
