'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _generateID = require('../utilities/generateID');

var _generateID2 = _interopRequireDefault(_generateID);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

export var GoogleMap = function (_React$Component) {
  (0, _inherits3['default'])(GoogleMap, _React$Component);

  function GoogleMap(props) {
    (0, _classCallCheck3['default'])(this, GoogleMap);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (GoogleMap.__proto__ || (0, _getPrototypeOf2['default'])(GoogleMap)).call(this, props));

    _this.initMap = function () {
      var _this$props = _this.props,
        mapOptions = _this$props.mapOptions,
        streetOptions = _this$props.streetOptions;


      if (mapOptions) {
        _this.renderMap();
      }

      if (streetOptions) {
        _this.renderStreet();
      }
    };

    _this.renderMap = function () {
      alert("I'm rendering the map");
      var mapOptions = _this.state.mapOptions;


      var mapElement = document.getElementById('map-' + _this.id);
      // eslint-disable-next-line no-undef
      _this.map = new google.maps.Map(mapElement, mapOptions);

      _this.createMarker('current Location', mapOptions.center.lat, mapOptions.center.lng);
    };

    _this.renderStreet = function () {
      var streetOptions = _this.state.streetOptions;


      var streetElement = document.getElementById('street-' + _this.id);
      // eslint-disable-next-line no-undef
      _this.street = new google.maps.StreetViewPanorama(streetElement, streetOptions);
    };

    _this.createMarker = function (label, lat, lng) {
      var hideMarker = _this.props.hideMarker;


      if (!hideMarker) {
        // eslint-disable-next-line no-undef
        new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: _this.map,
          title: label
        });
      }

      _this.props.createMarker(_this.map);
    };

    _this.state = {
      mapOptions: _this.props.mapOptions,
      streetOptions: _this.props.streetOptions
    };

    _this.map = null;
    _this.street = null;

    _this.id = props.id || (0, _generateID2['default'])();
    return _this;
  }

  (0, _createClass3['default'])(GoogleMap, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.initMap();
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
          minHeight = _props.minHeight,
          createTemplate = _props.createTemplate,
          mapOptions = _props.mapOptions,
          streetOptions = _props.streetOptions,
          createMarker = _props.createMarker,
          hideMarker = _props.hideMarker,
          other = (0, _objectWithoutProperties3['default'])(_props, ['minHeight', 'createTemplate', 'mapOptions', 'streetOptions', 'createMarker', 'hideMarker']);
        var id = this.id;


        var style = {
          height: minHeight
        };

        var mapId = 'map-' + id;
        var streetId = 'street-' + id;

        return _react2['default'].createElement(
          'div',
          null,
          createTemplate(style, mapId, streetId, other)
        );
      }

      return render;
    }()
  }]);
  return GoogleMap;
}(_react2['default'].Component);

GoogleMap.propTypes = {
  mapOptions: _propTypes2['default'].object
};
GoogleMap.defaultProps = {
  createTemplate: function () {
    function createTemplate(style, mapId, streetId, other) {
      return _react2['default'].createElement(
        'div',
        (0, _extends3['default'])({
          className: 'l-grid'
        }, other),
        _react2['default'].createElement(
          'div',
          {className: 'l-grid__col l-grid__col--6'},
          _react2['default'].createElement(
            'div',
            {className: 'l-grid', style: style},
            _react2['default'].createElement('div', {
              className: 'l-grid__col l-grid__col--12',
              id: mapId
            })
          )
        ),
        _react2['default'].createElement(
          'div',
          {className: 'l-grid__col l-grid__col--6'},
          _react2['default'].createElement(
            'div',
            {className: 'l-grid', style: style},
            _react2['default'].createElement('div', {
              className: 'l-grid__col l-grid__col--12',
              id: streetId
            })
          )
        )
      );
    }

    return createTemplate;
  }(),
  createMarker: function () {
    function createMarker() {
    }

    return createMarker;
  }(),

  hideMarker: false
};

// exports['default'] = GoogleMap;
