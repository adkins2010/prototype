"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Namespace for date utilities
 *
 * @class DateUtils
 * @static
 */
var DateUtils = function () {
  function DateUtils() {
    (0, _classCallCheck3["default"])(this, DateUtils);
  }

  (0, _createClass3["default"])(DateUtils, null, [{
    key: "makeRange",

    /**
     * Returns a date date range created using
     * the provided date and offset.
     *
     * @method DateUtils.makeRange
     * @param {Date} [date=new Date()]
     * @param {Number} [offset=200]
     * @returns {Array}
     */
    value: function () {
      function makeRange() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

        return [DateUtils.getOffsetDate(date, offset * -1), DateUtils.getOffsetDate(date, offset)];
      }

      return makeRange;
    }()

    /**
     * Accepts a date and a range (an array containing two dates)
     * and returns a boolean determining whether the provided
     * date is within the provided range.
     *
     * @method DateUtils.dateIsInRange
     * @param {Date} date
     * @param {Date[]} range
     * @returns {Boolean}
     */

  }, {
    key: "dateIsInRange",
    value: function () {
      function dateIsInRange(date, range) {
        var startDateTime = new Date(range[0]).setHours(0, 0, 0, 0);
        var endDateTime = new Date(range[1]).setHours(0, 0, 0, 0);
        var dateTime = date.getTime();

        return dateTime >= startDateTime && dateTime <= endDateTime;
      }

      return dateIsInRange;
    }()

    /**
     * Returns a boolean that determines whether
     * the provided date is contained within the provided
     * array of dates.
     *
     * @method DateUtils.datesContain
     * @param {Date[]} dates
     * @param {Date} date
     * @returns {Boolean}
     */

  }, {
    key: "datesContain",
    value: function () {
      function datesContain(dates, date) {
        return dates.filter(function (d) {
          return DateUtils.datesMatch(d, date);
        }).length > 0;
      }

      return datesContain;
    }()

    /**
     * Returns a boolean that determines whether
     * the two provided dates match.
     *
     * @method DateUtils.datesMatch
     * @param {Date} dateOne
     * @param {Date} dateTwo
     * @returns {Boolean}
     */

  }, {
    key: "datesMatch",
    value: function () {
      function datesMatch(dateOne, dateTwo) {
        return dateOne.toDateString() === dateTwo.toDateString();
      }

      return datesMatch;
    }()

    /**
     * Returns a padded date digit.
     * Given `1`, this method will return `01`.
     *
     * @method DateUtils.padDateDigit
     * @param {Number} dateNumber
     * @returns {String} dateString
     */

  }, {
    key: "padDateDigit",
    value: function () {
      function padDateDigit(dateNumber) {
        if (dateNumber < 10) {
          return "0" + dateNumber;
        }

        return "" + dateNumber;
      }

      return padDateDigit;
    }()

    /**
     * Returns a boolean that determines whether
     * the provided param is a date or not.
     *
     * @method DateUtils.isDate
     * @param {Date} date
     * @returns {Boolean}
     */

  }, {
    key: "isDate",
    value: function () {
      function isDate(date) {
        return date instanceof Date;
      }

      return isDate;
    }()

    /**
     * Returns a date that uses the provided offset.
     * The offest how many years (+/-) you want to
     * offset the provided date.
     *
     * @method DateUtils.getOffsetDate
     * @param {Date} date
     * @param {Number} [offset=0]
     * @returns {Date}
     */

  }, {
    key: "getOffsetDate",
    value: function () {
      function getOffsetDate(date) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var month = date.getMonth();
        var day = date.getDate();
        var year = date.getFullYear();

        return new Date(year + offset, month, day);
      }

      return getOffsetDate;
    }()
  }]);
  return DateUtils;
}();

exports["default"] = DateUtils;