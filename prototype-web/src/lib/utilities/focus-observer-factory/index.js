'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = createFocusObserver;
/**
 * A factory that creates focus observers.
 * A focus observer is a module that informs, via callbacks,
 * when the provided element gains or loses focus.
 *
 * @function createFocusObserver
 * @param  {HTMLElement} element
 * @param  {Function} [focusOutCallback=() => {}]
 * @param  {Function} [focusInCallback=() => {}]
 * @returns {Object}
 */
function createFocusObserver(element) {
  var focusOutCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var focusInCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var isActive = false;

  function onFocusOut(event) {
    var target = event.target;

    if (element.contains(target) || element === target) {
      focusInCallback();

      return;
    }

    focusOutCallback();
  }

  return {
    activate: function () {
      function activate() {
        if (isActive) {
          return;
        }

        document.body.addEventListener('focus', onFocusOut, true);
        document.body.addEventListener('click', onFocusOut, false);
        isActive = true;
      }

      return activate;
    }(),
    deactivate: function () {
      function deactivate() {
        if (!isActive) {
          return;
        }

        document.body.removeEventListener('focus', onFocusOut, true);
        document.body.removeEventListener('click', onFocusOut, false);
        isActive = false;
      }

      return deactivate;
    }()
  };
};