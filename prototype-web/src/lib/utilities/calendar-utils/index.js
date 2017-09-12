'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _appConstants = require('./../../appConstants');

var _appConstants2 = _interopRequireDefault(_appConstants);

var _calendarModel = require('./../../models/calendar-model');

var _calendarModel2 = _interopRequireDefault(_calendarModel);

var _calendarDayModel = require('./../../models/calendar-day-model/');

var _calendarDayModel2 = _interopRequireDefault(_calendarDayModel);

var _calendarMonthModel = require('./../../models/calendar-month-model/');

var _calendarMonthModel2 = _interopRequireDefault(_calendarMonthModel);

var _dateUtils = require('./../date-utils/');

var _dateUtils2 = _interopRequireDefault(_dateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A namespace for calendar utility functions.
 *
 * @class CalendarUtils
 * @static
 */
var CalendarUtils = function () {
  function CalendarUtils() {
    (0, _classCallCheck3['default'])(this, CalendarUtils);
  }

  (0, _createClass3['default'])(CalendarUtils, null, [{
    key: 'buildCalendar',

    /**
     * Returns a CalendarModel that
     * represents the provided year.
     *
     * @method CalendarUtils.buildCalendar
     * @param {Number} year
     * @returns {CalendarModel} a CalendarModel
     */
    value: function () {
      function buildCalendar(year) {
        var months = [];

        for (var i = 0; i < _appConstants2['default'].MONTHS_IN_A_YEAR; i++) {
          months.push(CalendarUtils.buildCalendarMonth(i, year));
        }

        return new _calendarModel2['default']().fromJSON({
          year: year,
          months: months
        }).toJSON();
      }

      return buildCalendar;
    }()

    /**
     * Returns a CalendarDayModel that
     * represents the provided date.
     *
     * @method CalendarUtils.buildDay
     * @param {Date} date
     * @returns {CalendarDayModel} a CalendarDayModel
     */

  }, {
    key: 'buildDay',
    value: function () {
      function buildDay(date) {
        var day = date.getDate();
        var dayOfWeek = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dayNames = _appConstants2['default'].DAYS[dayOfWeek];
        var monthNames = _appConstants2['default'].MONTHS[month];

        return new _calendarDayModel2['default']().fromJSON({
          date: date,
          day: day,
          dayOfWeek: dayOfWeek,
          month: month,
          year: year,
          abbreviatedName: dayNames[1],
          isToday: _dateUtils2['default'].datesMatch(date, new Date()),
          isWeekend: CalendarUtils.isWeekend(dayOfWeek),
          fullName: dayNames[0],
          monthName: monthNames[0],
          abbreviatedMonthName: monthNames[1]
        }).toJSON();
      }

      return buildDay;
    }()

    /**
     * Returns a padded CalendarMonthModel that
     * represents the provided month/year. Padded
     * calendar months contains "ghost days" which
     * even out the weeks in a display (think table).
     *
     * @method CalendarUtils.buildPaddedCalendarMonth
     * @param {Number} month - zero based
     * @param {Number} year
     * @returns {CalendarMonthModel} a CalendarMonthModel
     */

  }, {
    key: 'buildPaddedCalendarMonth',
    value: function () {
      function buildPaddedCalendarMonth(month, year) {
        var calendarMonth = CalendarUtils.buildCalendarMonth(month, year);
        var days = calendarMonth.days.slice();
        var padLeft = days[0].dayOfWeek;
        /**
         * subtract 1 from both days.length and days of the week,
         * because we're dealing with zero based numbers
         */
        var padRight = _appConstants2['default'].DAYS_IN_A_WEEK - 1 - days[days.length - 1].dayOfWeek;
        var ghostDaysLeft = CalendarUtils.getGhostDays(month - 1, year, 'end', padLeft);
        var ghostDaysRight = CalendarUtils.getGhostDays(month + 1, year, 'start', padRight);
        var totalDays = [].concat((0, _toConsumableArray3['default'])(ghostDaysLeft), (0, _toConsumableArray3['default'])(days), (0, _toConsumableArray3['default'])(ghostDaysRight));

        return (0, _extends3['default'])(calendarMonth, {
          days: totalDays,
          weeks: CalendarUtils.getWeeks(totalDays)
        });
      }

      return buildPaddedCalendarMonth;
    }()

    /**
     * Accepts a padded (ghost days included) array of days
     * and returns an array of weeks including said days.
     *
     * @method CalendarUtils.getWeeks
     * @param {CalendarDayModel[]} days - array of calendar day models
     * @returns {Array[]}
     */

  }, {
    key: 'getWeeks',
    value: function () {
      function getWeeks(days) {
        var daysCopy = days.slice();
        var numberOfWeeks = days.length / _appConstants2['default'].DAYS_IN_A_WEEK;
        var weeks = [];

        for (var i = 1; i <= numberOfWeeks; i++) {
          weeks.push(daysCopy.splice(0, _appConstants2['default'].DAYS_IN_A_WEEK));
        }

        return weeks;
      }

      return getWeeks;
    }()

    /**
     * Returns a number of "ghost days", specified by howMany,
     * in the provided month/year extending from the provided position.
     *
     * @method CalendarUtils.getGhostDays
     * @param {Number} month
     * @param {Number} year
     * @param {String} position - 'end' or 'start'
     * @param {Number} howMany
     * @returns {Array} ghostDays - array of day models
     */

  }, {
    key: 'getGhostDays',
    value: function () {
      function getGhostDays(month, year, position, howMany) {
        if (month < 0) {
          month = 11;
          year--;
        } else if (month > 11) {
          month = 0;
          year++;
        }

        var ghostCalendarMonth = CalendarUtils.buildCalendarMonth(month, year);
        var ghostDays = ghostCalendarMonth.days;

        if (position === 'start') {
          return ghostDays.slice(0, howMany);
        } else {
          /**
           * reverse the array so we get the final days,
           * then reverse again so that they're in the correct order
           */
          return ghostDays.reverse().slice(0, howMany).reverse();
        }
      }

      return getGhostDays;
    }()

    /**
     * Return a calendar month model that
     * represents the provided month/year.
     *
     * @method CalendarUtils.buildCalendarMonth
     * @param {Number} month
     * @param {Number} year
     * @returns {CalendarMonthModel} calendarMonthModel
     */

  }, {
    key: 'buildCalendarMonth',
    value: function () {
      function buildCalendarMonth(month, year) {
        var totalDays = CalendarUtils.daysInMonth(month, year);
        var days = [];
        var monthNames = _appConstants2['default'].MONTHS[month];

        for (var i = 1; i <= totalDays; i++) {
          var dayOfWeek = CalendarUtils.dayOfWeek(i, month, year);
          var dayNames = _appConstants2['default'].DAYS[dayOfWeek];

          days.push(CalendarUtils.buildDay(new Date(year, month, i)));
        }

        return new _calendarMonthModel2['default']().fromJSON({
          abbreviatedName: monthNames[1],
          days: days,
          daysOfTheWeek: _appConstants2['default'].DAYS.slice(),
          fullName: monthNames[0],
          month: month,
          year: year
        }).toJSON();
      }

      return buildCalendarMonth;
    }()

    /**
     * Return the number of days
     * in the provided month/year.
     *
     * @method CalendarUtils.daysInMonth
     * @param {Number} month
     * @param {Number} year
     * @returns {Number}
     */

  }, {
    key: 'daysInMonth',
    value: function () {
      function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
      }

      return daysInMonth;
    }()

    /**
     * Return the day of week {0-6}
     * based of of the provided day/month/year.
     *
     * @method CalendarUtils.dayOfWeek
     * @param {Number} day
     * @param {Number} month
     * @param {Number} year
     * @returns {Number}
     */

  }, {
    key: 'dayOfWeek',
    value: function () {
      function dayOfWeek(day, month, year) {
        return new Date(year, month, day).getDay();
      }

      return dayOfWeek;
    }()

    /**
     * Returns a boolean that determines
     * if the provided day is a weekend.
     *
     * @method CalendarUtils.isWeekend
     * @param {Number} day
     * @returns {Boolean}
     */

  }, {
    key: 'isWeekend',
    value: function () {
      function isWeekend(day) {
        return day === 6 || day === 0;
      }

      return isWeekend;
    }()

    /**
     * Returns a boolean that determines whether
     * the provided day is a valid day. A valid day
     * is defined as a day that falls within its
     * months range. 06-40-1990 is not a valid day, as
     * there are not 40 days in June.
     *
     * @method CalendarUtils.isValidDay
     * @param {Number} day
     * @param {Number} month
     * @param {Number} year
     * @returns {Boolean}
     */

  }, {
    key: 'isValidDay',
    value: function () {
      function isValidDay(day, month, year) {
        return day >= 1 && day <= CalendarUtils.daysInMonth(month, year);
      }

      return isValidDay;
    }()

    /**
     * Returns a boolean that determines whether
     * the provided month is a valid month number
     * (falls between 0 and 11).
     *
     * @method CalendarUtils.isValidMonth
     * @param {Number} month
     * @returns {Boolean}
     */

  }, {
    key: 'isValidMonth',
    value: function () {
      function isValidMonth(month) {
        return month >= 0 && month <= 11;
      }

      return isValidMonth;
    }()
  }]);
  return CalendarUtils;
}();

exports['default'] = CalendarUtils;