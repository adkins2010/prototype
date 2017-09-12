'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _calendarUtils = require('./../calendar-utils/');

var _calendarUtils2 = _interopRequireDefault(_calendarUtils);

var _dateUtils = require('./../date-utils/');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

var _appConstants = require('./../../appConstants');

var _appConstants2 = _interopRequireDefault(_appConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_FORMAT = _appConstants2['default'].DEFAULT_DATE_FORMAT;

/**
 * A utility class responsible for mapping
 * dates to and from date strings (e.g., 10/20/2016)
 *
 * @class DateString
 * @static
 */

var DateString = function () {
  function DateString() {
    (0, _classCallCheck3['default'])(this, DateString);
  }

  (0, _createClass3['default'])(DateString, null, [{
    key: 'fromUserToDate',


    /**
     * Accepts unpredictable user input
     * (a date or a date string) and returns a date.
     *
     * @method DateString.fromUserToDate
     * @param {Date|String} [dateOrString='']
     * @param {...*} other
     * @returns {Date}
     */
    value: function () {
      function fromUserToDate() {
        var dateOrString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (_dateUtils2['default'].isDate(dateOrString)) {
          return dateOrString;
        }

        for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          other[_key - 1] = arguments[_key];
        }

        return DateString.toDate.apply(DateString, [dateOrString].concat(other));
      }

      return fromUserToDate;
    }()

    /**
     * Accepts unpredictable user input
     * (a date or a date string) and returns a date string.
     *
     * @method DateString.fromUserFromDate
     * @param {Date|String} dateOrString
     * @param {...*} dateOrString
     * @returns {String}
     */

    /**
     * Formatters for each of the supported
     * date string types. Each formatter accepts a date
     * and returns its numeric-string equivalent.
     *
     * @example
     * DateString.FORMATTERS.M(new Date(2016, 01)) // 1
     * DateString.FORMATTERS.MM(new Date(2016, 01)) // 01
     *
     * @property DateString.FORMATTERS
     * @type {Object}
     */

  }, {
    key: 'fromUserFromDate',
    value: function () {
      function fromUserFromDate(dateOrString) {
        if (!_dateUtils2['default'].isDate(dateOrString)) {
          return dateOrString;
        }

        for (var _len2 = arguments.length, other = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          other[_key2 - 1] = arguments[_key2];
        }

        return DateString.fromDate.apply(DateString, [dateOrString].concat(other));
      }

      return fromUserFromDate;
    }()

    /**
     * Accepts a date string, validates its parts against
     * the provided format, and returns a validated date object.
     *
     *
     * @method DateString.toDate
     * @param {String} dateString
     * @param {String} [format=DEFAULT_FORMAT] - MM/YYYY
     * @param {Date[]} [range=DateUtils.makeRange()] - date range
     * @returns {Date}
     */

  }, {
    key: 'toDate',
    value: function () {
      function toDate(dateString) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FORMAT;
        var range = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _dateUtils2['default'].makeRange();

        if (dateString.length !== format.length) {
          return;
        }

        var parts = DateString.unpack(dateString, format);

        if (!DateString.partsAreValid(parts, range)) {
          return;
        }

        var day = parts.day,
            month = parts.month,
            year = parts.year;


        return new Date(year, month, day || 1);
      }

      return toDate;
    }()

    /**
     * Accepts a date and returns a date string
     * that matches the provide format.
     *
     * @method DateString.fromDate
     * @param {Date} date
     * @param {String} [format=DEFAULT_FORMAT] - MM/YYYY
     * @returns {String}
     */

  }, {
    key: 'fromDate',
    value: function () {
      function fromDate(date) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FORMAT;

        var replacer = function () {
          function replacer(match) {
            var formatter = DateString.FORMATTERS[match];

            if (formatter === undefined) {
              throw new Error('Invalid formatter: ' + match);
            }

            return formatter(date);
          }

          return replacer;
        }();

        return ['M', 'D', 'Y'].reduce(function (str, flag) {
          return str.replace(new RegExp('(' + flag + ')+', 'g'), replacer);
        }, format);
      }

      return fromDate;
    }()

    /**
     * Accepts a date string and a format and
     * returns the parts (day, month, year) of the date string.
     *
     * @method DateString.unpack
     * @param {String} dateString
     * @param {String} [format=DEFAULT_FORMAT] - MM/YYYY
     * @returns {Object}
     */

  }, {
    key: 'unpack',
    value: function () {
      function unpack(dateString) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FORMAT;

        var parts = {};
        var re = /(D|M|Y)+/g;

        format.replace(re, function (match, letter, index) {
          var correspondingMatch = (dateString.slice(index).match(/\d+/) || [])[0];

          if (correspondingMatch === undefined) {
            throw new Error('Could not match ' + match + ' in dateString');
          }

          switch (match) {
            case 'M':
            case 'MM':
              parts.month = Number(correspondingMatch) - 1;
              break;

            case 'D':
            case 'DD':
              parts.day = Number(correspondingMatch);
              break;

            case 'YY':
            case 'YYYY':
              parts.year = Number(correspondingMatch);
              break;
          }
        });

        return parts;
      }

      return unpack;
    }()

    /**
     * Accepts a parts objects and a date range
     * and returns a boolean indicating whether
     * or not the provided parts are valid.
     *
     * @method DateString.partsAreValid
     * @param {Object} parts
     * @param {Date[]} [range=[]] - date range
     * @returns {Boolean}
     */

  }, {
    key: 'partsAreValid',
    value: function () {
      function partsAreValid(parts) {
        var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        // range must contain a start and end date
        if (!parts || range.length !== 2) {
          return false;
        }

        var day = parts.day,
            month = parts.month,
            year = parts.year;

        //sets undefined days to 1 and keeps 0 valued days for validation

        var setDay = day == undefined ? 1 : day;

        if (!_calendarUtils2['default'].isValidMonth(month) || !_calendarUtils2['default'].isValidDay(setDay, month, year) || !_dateUtils2['default'].dateIsInRange(new Date(year, month, setDay), range)) {
          return false;
        }

        return true;
      }

      return partsAreValid;
    }()
  }]);
  return DateString;
}();

DateString.FORMATTERS = {
  M: function () {
    function M(d) {
      return d.getMonth() + 1;
    }

    return M;
  }(),
  MM: function () {
    function MM(d) {
      return _dateUtils2['default'].padDateDigit(d.getMonth() + 1, 2, '0');
    }

    return MM;
  }(),
  D: function () {
    function D(d) {
      return d.getDate();
    }

    return D;
  }(),
  DD: function () {
    function DD(d) {
      return _dateUtils2['default'].padDateDigit(d.getDate(), 2, '0');
    }

    return DD;
  }(),
  YY: function () {
    function YY(d) {
      return d.getFullYear().toString().slice(-2);
    }

    return YY;
  }(),
  YYYY: function () {
    function YYYY(d) {
      return d.getFullYear();
    }

    return YYYY;
  }() };
exports['default'] = DateString;