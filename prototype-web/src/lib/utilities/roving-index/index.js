'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULTS_OPTIONS = {
  cyclic: true,
  index: -1,
  pausable: false,
  total: 0
};

var RovingIndex = function () {
  function RovingIndex() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3['default'])(this, RovingIndex);

    var options = (0, _extends3['default'])({}, DEFAULTS_OPTIONS, config);

    this.cyclic = options.cyclic;
    this.index = options.index;
    this.pausable = options.pausable;
    this.total = options.total;
  }

  (0, _createClass3['default'])(RovingIndex, [{
    key: 'resetIndex',
    value: function () {
      function resetIndex() {
        this.index = -1;
      }

      return resetIndex;
    }()
  }, {
    key: 'getIndex',
    value: function () {
      function getIndex() {
        return this.index;
      }

      return getIndex;
    }()
  }, {
    key: 'getTotal',
    value: function () {
      function getTotal() {
        return this.total;
      }

      return getTotal;
    }()
  }, {
    key: 'prev',
    value: function () {
      function prev() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        var oldIndex = this.index;
        this.setIndex(this.index - 1);
        callback(oldIndex, this.index);
      }

      return prev;
    }()
  }, {
    key: 'next',
    value: function () {
      function next() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        var oldIndex = this.index;
        this.setIndex(this.index + 1);
        callback(oldIndex, this.index);
      }

      return next;
    }()
  }, {
    key: 'setIndex',
    value: function () {
      function setIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.total;

        this.index = RovingIndex.validateIndex(index, total, {
          cyclic: this.cyclic,
          pausable: this.pausable
        });
      }

      return setIndex;
    }()
  }, {
    key: 'setTotal',
    value: function () {
      function setTotal() {
        var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.total = total;
      }

      return setTotal;
    }()
  }], [{
    key: 'validateIndex',
    value: function () {
      function validateIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (options.pausable) {
          return RovingIndex.validatePausableIndex(index, total);
        }

        if (options.cyclic) {
          return RovingIndex.validateCyclicIndex(index, total);
        }

        return RovingIndex.validateFiniteIndex(index, total);
      }

      return validateIndex;
    }()
  }, {
    key: 'validateFiniteIndex',
    value: function () {
      function validateFiniteIndex(index, total) {
        if (index < 0) {
          return 0;
        } else if (index >= total) {
          return total - 1;
        }

        return index;
      }

      return validateFiniteIndex;
    }()
  }, {
    key: 'validateCyclicIndex',
    value: function () {
      function validateCyclicIndex(index, total) {
        if (index < 0) {
          return total - 1;
        } else if (index >= total) {
          return 0;
        }

        return index;
      }

      return validateCyclicIndex;
    }()
  }, {
    key: 'validatePausableIndex',
    value: function () {
      function validatePausableIndex(index, total) {
        if (index === -1 || index >= total) {
          return -1;
        } else if (index < -1) {
          return total - 1;
        }

        return index;
      }

      return validatePausableIndex;
    }()
  }]);
  return RovingIndex;
}();

exports['default'] = RovingIndex;