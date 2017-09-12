'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

'use strict';

var FormValidators = function () {
  function FormValidators() {
    (0, _classCallCheck3['default'])(this, FormValidators);
  }

  (0, _createClass3['default'])(FormValidators, null, [{
    key: 'required',
    value: function () {
      function required() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var trimmedValue = value.trim();

        return trimmedValue.trim() !== '';
      }

      return required;
    }()
  }, {
    key: 'minLength',
    value: function () {
      function minLength(minlength) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var trimmedValue = value.trim();

        return trimmedValue.length >= minlength;
      }

      return minLength;
    }()
  }, {
    key: 'maxLength',
    value: function () {
      function maxLength(maxlength) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var trimmedValue = value.trim();

        return trimmedValue.length <= maxlength;
      }

      return maxLength;
    }()
  }, {
    key: 'getValidators',
    value: function () {
      function getValidators() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var validators = [];
        var maxLength = settings.maxLength,
            minLength = settings.minLength;


        if (settings.required) {
          validators.push(FormValidators.required);
        }

        if (settings.minLength) {
          validators.push(FormValidators.minLength.bind(null, minLength));
        }

        if (settings.maxLength) {
          validators.push(FormValidators.maxLength.bind(null, maxLength));
        }

        return validators;
      }

      return getValidators;
    }()
  }]);
  return FormValidators;
}();

exports['default'] = FormValidators;