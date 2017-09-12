'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports['default'] = stickify;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _appConstants = require('./../../appConstants');

var _appConstants2 = _interopRequireDefault(_appConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ACTIVE_CLASS = _appConstants2['default'].HTML_CLASS.ACTIVE;

function getOffsetBottom(windowHeight, parentOffset, offset, height) {
  var stickyHeight = offset + height;
  var offsetBottom = windowHeight - parentOffset - stickyHeight;

  return offsetBottom;
}

/**
 * A higher-order component used to create Toast menus.
 *
 * @function createToast
 * @returns {React.Component} Toast
 */
function stickify() {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3['default'])(Stickify, _React$Component);

    function Stickify(props) {
      (0, _classCallCheck3['default'])(this, Stickify);

      var _this = (0, _possibleConstructorReturn3['default'])(this, (Stickify.__proto__ || (0, _getPrototypeOf2['default'])(Stickify)).call(this, props));

      _this.stickify = function () {
        var _this$state = _this.state,
            active = _this$state.active,
            offset = _this$state.offset,
            ending = _this$state.ending,
            parentScrollHeight = _this$state.parentScrollHeight,
            offsetBottom = _this$state.offsetBottom;


        var parent = _this.parent;
        var parentDetails = parent.getBoundingClientRect();
        var sticky = _this.sticky.getBoundingClientRect();

        _this.setState({
          parentScrollHeight: _this.parent.scrollHeight
        });

        if (!active && parent.scrollTop > offset) {
          _this.setState({
            active: true,
            offsetBottom: getOffsetBottom(window.innerHeight, parentDetails.top, _this.sticky.offsetTop, sticky.height)
          });
        }

        if (active && parent.scrollTop < offset || parent.scrollTop == 0) {
          _this.setState({
            active: false,
            offsetBottom: getOffsetBottom(window.innerHeight, parentDetails.top, _this.sticky.offsetTop, sticky.height)
          });
        }

        if (offsetBottom < 0) {
          var remainingScroll = parentScrollHeight - (parent.scrollTop + parentDetails.height);
          var belowViewPort = Math.abs(offsetBottom) + 32;

          if (remainingScroll <= belowViewPort) {
            _this.setState({
              ending: true
            });
          } else {
            _this.setState({
              ending: false
            });
          }
        } else {
          if (ending) {
            _this.setState({
              ending: false
            });
          }
        }
      };

      _this.resetWindow = function () {
        var parentDetails = _this.parent.getBoundingClientRect();
        var sticky = _this.sticky.getBoundingClientRect();

        var offset = _this.sticky.offsetTop - _this.props.marginTop;

        _this.setState({
          height: sticky.height,
          offset: offset,
          parentOffset: parentDetails.top,
          parentScrollHeight: _this.parent.scrollHeight,
          currentWidth: sticky.width,
          offsetBottom: getOffsetBottom(window.innerHeight, parentDetails.top, _this.sticky.offsetTop, sticky.height)
        });
      };

      _this.state = {
        active: false,
        ending: false,
        height: 0,
        parentOffset: 0,
        parentScrollHeight: 0,
        offset: 0,
        offsetBottom: 0
      };

      _this.parent = props.parentId;
      return _this;
    }

    (0, _createClass3['default'])(Stickify, [{
      key: 'componentDidMount',
      value: function () {
        function componentDidMount() {
          var parentId = this.props.parentId;


          if (typeof parentId == "string") {
            this.parent = document.getElementById(parentId);
          } else {
            this.parent = parentId;
          }

          this.initSticky();
        }

        return componentDidMount;
      }()
    }, {
      key: 'initSticky',
      value: function () {
        function initSticky() {
          this.resetWindow();
          this.stickify();

          this.parent.addEventListener('scroll', this.stickify);
          window.addEventListener('resize', this.resetWindow);
        }

        return initSticky;
      }()
    }, {
      key: 'destroySticky',
      value: function () {
        function destroySticky() {
          var parent = this.parent;

          parent.removeEventListener('scroll', this.stickify);
          window.removeEventListener('resize', this.resetWindow);
        }

        return destroySticky;
      }()
    }, {
      key: 'componentWillUnmount',
      value: function () {
        function componentWillUnmount() {
          this.destroySticky();
        }

        return componentWillUnmount;
      }()
    }, {
      key: 'render',
      value: function () {
        function render() {
          var _this2 = this;

          var _props = this.props,
              children = _props.children,
              marginTop = _props.marginTop,
              className = _props.className;
          var _state = this.state,
              active = _state.active,
              ending = _state.ending,
              height = _state.height,
              parentOffset = _state.parentOffset,
              currentWidth = _state.currentWidth;


          var parentStyles = {
            height: active ? height + 'px' : 'auto'
          };

          var childStyles = {
            top: ending ? 'auto' : parentOffset + marginTop + 'px',
            width: active || ending ? currentWidth + 'px' : 'auto'
          };

          return _react2['default'].createElement(
            'div',
            {
              ref: function () {
                function ref(_ref) {
                  _this2.sticky = _ref;
                }

                return ref;
              }(),
              className: 'l-sticky ' + className,
              style: parentStyles },
            _react2['default'].createElement(
              'div',
              {
                style: childStyles,
                className: 'l-sticky__element ' + (active ? ACTIVE_CLASS : '') + ' ' + (ending ? 'is-ending' : '') },
              children
            )
          );
        }

        return render;
      }()
    }]);
    return Stickify;
  }(_react2['default'].Component), _class.defaultProps = {
    marginTop: 32,
    className: ''
  }, _class.propTypes = {
    marginTop: _propTypes2['default'].number,
    className: _propTypes2['default'].string
  }, _temp;
}