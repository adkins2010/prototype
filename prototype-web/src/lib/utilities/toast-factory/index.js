'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

exports['default'] = createToast;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _icon = require('../../components/icon/');

var _icon2 = _interopRequireDefault(_icon);

var _appConstants = require('./../../appConstants');

var _appConstants2 = _interopRequireDefault(_appConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ACTIVE_CLASS = _appConstants2['default'].HTML_CLASS.ACTIVE + ' c-toaster__toast--animateIn';

/**
 * A higher-order component used to create Toast menus.
 *
 * @function createToast
 * @returns {React.Component} Toast
 */
function createToast() {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3['default'])(Toast, _React$Component);

    function Toast(props) {
      (0, _classCallCheck3['default'])(this, Toast);

      /**
       * The Toast's internal state.
       *
       * @property Toast.state
       * @type {Object}
       */
      var _this = (0, _possibleConstructorReturn3['default'])(this, (Toast.__proto__ || (0, _getPrototypeOf2['default'])(Toast)).call(this, props));

      _this.onClickTrigger = function (event) {
        event.preventDefault();
        _this.close();
      };

      _this.state = {
        /**
         * Determines whether the Toast is open/closed.
         *
         * @property Toast.state.isActive
         * @type {Boolean}
         * @default false
         */
        isActive: props.isActive
      };

      _this.autoRemoveTimeout = null;
      return _this;
    }

    /**
     * @property Toast.defaultProps
     * @type {Object}
     * @static
     */


    /**
     * @property Toast.propTypes
     * @type {Object}
     * @static
     */


    (0, _createClass3['default'])(Toast, [{
      key: 'componentDidMount',
      value: function () {
        function componentDidMount() {
          var _this2 = this;

          var _props = this.props,
              timeOut = _props.timeOut,
              autoRemove = _props.autoRemove;


          this.props.onOpen();

          if (autoRemove) {
            this.autoRemoveTimeout = setTimeout(function () {
              _this2.close();
            }, timeOut);
          }
        }

        return componentDidMount;
      }()

      /**
       * Closes the Toast.
       *
       * @method Toast.close
       */

    }, {
      key: 'close',
      value: function () {
        function close() {
          var _this3 = this;

          if (this.toast !== null) {
            this.setState({
              isActive: false
            });
          }

          setTimeout(function () {
            _this3.props.onClose(_this3.toast);

            clearTimeout(_this3.autoRemoveTimeout);

            if (_this3.toast !== null) {
              _this3.toast.parentNode.removeChild(_this3.toast);
            }
          }, 750);
        }

        return close;
      }()

      /**
       * Toggles the Toast as the trigger is clicked.
       *
       * @method Toast.onClickTrigger
       * @param {Event} event - click event
       */

    }, {
      key: 'render',


      /**
       * @method Toast.render
       */
      value: function () {
        function render() {
          var _this4 = this;

          var _props2 = this.props,
              children = _props2.children,
              autoRemove = _props2.autoRemove,
              timeOut = _props2.timeOut,
              className = _props2.className,
              promptType = _props2.promptType,
              icon = _props2.icon,
              iconPosition = _props2.iconPosition;


          var isActive = this.state.isActive;
          var isPrompt = promptType !== 'normal';

          var onClickTrigger = this.onClickTrigger;


          var renderIcon = icon ? icon : false;

          return _react2['default'].createElement(
            'div',
            {
              ref: function () {
                function ref(_ref2) {
                  _this4.toast = _ref2;
                }

                return ref;
              }(),
              className: (0, _classnames6['default'])('c-toaster__toast animated', (0, _defineProperty3['default'])({}, '' + promptType, isPrompt), (0, _defineProperty3['default'])({}, 'c-toaster__toast--no-icon', !icon), (0, _defineProperty3['default'])({}, className, className), (0, _defineProperty3['default'])({}, ACTIVE_CLASS, isActive), 'c-toaster__toast--' + iconPosition, { 'c-toaster__toast--animateOut': !isActive }) },
            _react2['default'].createElement(
              'div',
              { className: 'c-toaster__toast__hd' },
              _react2['default'].createElement(
                'button',
                {
                  'aria-label': 'Close Toast',
                  className: 'c-btn c-btn--icon c-btn--phony c-toaster__toast__trigger',
                  ref: function () {
                    function ref(_ref) {
                      _this4.trigger = _ref;
                    }

                    return ref;
                  }(),
                  onClick: onClickTrigger },
                _react2['default'].createElement(_icon2['default'], { icon: 'cross', color: 'white', size: 1 })
              ),
              renderIcon ? _react2['default'].createElement(_icon2['default'], { icon: renderIcon, color: 'white', size: iconPosition == 'left' ? 1.5 : 3 }) : null
            ),
            _react2['default'].createElement(
              'div',
              { className: 'c-toaster__toast__bd' },
              children
            )
          );
        }

        return render;
      }()
    }]);
    return Toast;
  }(_react2['default'].Component), _class.defaultProps = {
    /**
     * onOpen callback.
     *
     * @method Toast.defaultProps.onOpen
     */
    onOpen: function () {
      function onOpen() {}

      return onOpen;
    }(),

    /**
     * onClose callback.
     *
     * @method Toast.defaultProps.onClose
     */
    onClose: function () {
      function onClose() {}

      return onClose;
    }(),


    isActive: true,
    autoRemove: true,
    timeOut: 5000,
    promptType: 'c-toaster__toast--info',
    iconPosition: 'left' }, _class.propTypes = {
    onOpen: _propTypes2['default'].func,
    onClose: _propTypes2['default'].func,
    icon: _propTypes2['default'].string,
    iconPosition: _propTypes2['default'].string
  }, _temp;
}